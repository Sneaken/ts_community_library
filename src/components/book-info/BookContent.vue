<template>
  <div class="book-content">
    <ul>
      <li class="summary">
        <div>
          <h2>内容简介 · · · · ·</h2>
          <template v-if="!showSummary && summary[0] !== ''">
            <p v-for="item in summaryPart.data">
              {{ item }}
            </p>
            <a
              href="javascript:"
              @click="showSummary = true"
              v-if="summaryPart.showAll"
            >
              (展开全部)</a
            >
          </template>
          <template v-else-if="showSummary && summary[0] !== ''">
            <p v-for="item in summary">{{ item }}</p>
          </template>
          <template v-else-if="summary[0] === ''">
            <p>暂无简介</p>
          </template>
        </div>
      </li>
      <li>
        <div class="">
          <el-divider>馆藏</el-divider>
          <el-table :data="location" style="width: 100%">
            <el-table-column align="center" label="复本／藏书记录">
              <el-table-column
                prop="label"
                label="条码号"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="{ row }">
                  {{ status[row.status] }}
                </template>
              </el-table-column>
              <el-table-column prop="location" label="典藏地" align="center">
              </el-table-column>
              <el-table-column prop="reservation" label="预约" align="center">
                <template slot-scope="{ row }">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleReserve(row)"
                    v-if="row.status !== '0'"
                    >预约</el-button
                  >
                  <div v-else align="center">库本,无法预约</div>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </li>
      <li class="authorIntro">
        <div>
          <h2>作者简介 · · · · ·</h2>
          <template v-if="!showAuthorIntro && authorIntro[0] !== ''">
            <p v-for="item in authorIntroPart.data">
              {{ item }}
            </p>
            <a
              href="javascript:"
              @click="showAuthorIntro = true"
              v-if="authorIntroPart.showAll"
            >
              (展开全部)
            </a>
          </template>
          <template v-else-if="showAuthorIntro && authorIntro[0] !== ''">
            <p v-for="item in authorIntro">{{ item }}</p>
          </template>
          <template v-else-if="authorIntro[0] === ''">
            <p>暂无简介</p>
          </template>
        </div>
      </li>
      <li class="catalog">
        <div>
          <h2>目录 · · · · ·</h2>
          <template v-if="!showCatalog && catalog[0] !== ''">
            <p v-for="item in catalogPart.data">
              {{ item }}
            </p>
            <a
              href="javascript:"
              @click="showCatalog = true"
              v-if="catalogPart.showAll"
            >
              (展开全部)
            </a>
          </template>
          <template v-else-if="showCatalog && catalog[0] !== ''">
            <p v-for="item in catalog">{{ item }}</p>
          </template>
          <template v-else-if="catalog[0] === ''">
            <p>暂无数据</p>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { bookReservation, getLocation } from '@/api/book';

@Component
export default class bookContent extends Vue {
  @Prop({
    type: Array,
    default: []
  })
  private summary!: [];
  @Prop({
    type: Array,
    default: []
  })
  private authorIntro!: [];
  @Prop({
    type: Array,
    default: []
  })
  private catalog!: [];
  showSummary = false;
  showAuthorIntro = false;
  showCatalog = false;
  summaryPart = {};
  authorIntroPart = {};
  catalogPart = {};
  location = [];
  status = ['库本', '在库', '借出'];

  get user(): string {
    return this.$store.getters.user.phone;
  }
  async mounted() {
    this.summaryPart = this.getArrayPart(this.summary);
    this.authorIntroPart = this.getArrayPart(this.authorIntro);
    this.catalogPart = this.getArrayPart(this.catalog);
    await this.getLocation();
  }

  getArrayPart(arr: string[], len = 378) {
    const result: { data: string[]; showAll: boolean } = {
      data: [],
      showAll: false
    };
    let sum = 0;
    arr.some(item => {
      sum += item.length;
      if (sum > len) {
        sum -= item.length;
        const difference = len - sum;
        result['data'].push(`${item.substring(0, difference)}...`);
        result['showAll'] = true;
        return true;
      }
      result['data'].push(item);
    });
    return result;
  }

  async getLocation() {
    try {
      this.location = await getLocation(this.$route.params._id);
    } catch (e) {
      console.log(e);
    }
  }

  async handleReserve(row: ILocation) {
    if (this.user) {
      try {
        await bookReservation(row.label);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.book-content {
  width: 950px;
  margin: 0 auto;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin: 0 0 25px 0;
      font-size: 14px;
      h2 {
        font: 15px Arial, Helvetica, sans-serif;
        color: #072;
        margin: 0 0 5px 0;
        line-height: 1.5;
      }
      p {
        text-indent: 2em;
        margin: 5px 0;
        line-height: 1.62;
      }
      a {
        display: inline-block;
        text-indent: 2em;
      }
    }
    .catalog {
      margin-bottom: 0;
    }
  }
}
</style>
