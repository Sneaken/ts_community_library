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
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    summary: {
      type: Array,
      default: []
    },
    authorIntro: {
      type: Array,
      default: []
    },
    catalog: {
      type: Array,
      default: []
    }
  }
})
export default class bookContent extends Vue {
  showSummary = false;
  showAuthorIntro = false;
  showCatalog = false;

  summaryPart = {};
  authorIntroPart = {};
  catalogPart = {};
  mounted() {
    this.summaryPart = this.getArrayPart(this.summary);
    this.authorIntroPart = this.getArrayPart(this.authorIntro);
    this.catalogPart = this.getArrayPart(this.catalog);
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
