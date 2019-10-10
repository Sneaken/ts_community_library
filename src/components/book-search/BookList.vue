<template>
  <div class="book-list">
    <div class="search-length">
      共检索到<span class="search-count">{{ searchCount }}</span
      >条关于 {{ this.$route.query.keywords }} 的结果
    </div>
    <!-- 搜索结果列表 -->
    <ul>
      <li class="book-list-item" v-for="item in bookList" :key="item._id">
        <router-link
          :to="{ name: 'bookInfo', params: { _id: item._id } }"
          class="link"
        >
          <div class="clear-fix">
            <el-image
              :src="imageChange(item['images']['small'])"
              :alt="item.title"
            ></el-image>
            <div class="book-about">
              <h3>
                {{ item.title }}
                <span v-if="item.subtitle">: {{ item.subtitle }}</span>
              </h3>
              <el-rate
                :value="rate(item)"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
              <p>{{ item.author.join(' / ') }}</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>

    <!-- 分页 -->
    <data-pagination
      class="page-pagination"
      :page-sizes="[5, 20, 30, 40, 50]"
      :page-size="5"
      :data="bookResult"
      @getTableData="getTableDate"
      v-if="bookResult.length > 0"
    ></data-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import dataPagination from '@/components/common/DataPagination.vue';
import { FIND_SIMPLE } from '@/config';
import { AxiosRequestConfig } from 'axios';
@Component({
  components: { dataPagination }
})
export default class bookList extends Vue {
  bookResult = [];
  bookList = [];
  searchCount = 0;

  mounted() {
    this.getData();
  }

  get imageChange() {
    return function(val: { replace: (arg0: string, arg1: string) => string }) {
      return val.replace('https://', 'https://images.weserv.nl/?url=');
    };
  }

  get rate() {
    return function(item: any) {
      if (item.rating.max === 10) {
        item.rating.max = item.rating.max / 2;
        item.rating.average = Number.parseFloat(item.rating.average) / 2;
        return item.rating.average;
      } else {
        return Number.parseFloat(item.rating.average);
      }
    };
  }
  // rate(val: string) {
  //   console.log(Number.parseFloat(val) / 2);
  //   return Number.parseFloat(val) / 2;
  // }

  getTableDate(val: { type: number; data: any }) {
    if (val.type === 1) {
      this.bookList = val.data;
    } else {
      setTimeout(_ => {
        this.bookList = val.data;
      }, 275);
    }
  }

  async getData() {
    const param: AxiosRequestConfig = {
      params: {
        category: this.$route.query.category,
        keywords: this.$route.query.keywords
      }
    };
    const result = await this.$axios.get(FIND_SIMPLE, param);
    if (result.status === 200) {
      this.bookResult = result.data;
      this.searchCount = this.bookResult.length;
    } else {
      this.bookResult = [];
      this.$message({
        type: 'error',
        message: '暂无数据'
      });
    }
  }

  @Watch('$route')
  routeChange(to: any, from: any) {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: black;
}
.book-list {
  width: 950px;
  margin: 0 auto;
  ul {
    list-style: none;
    li {
      margin-bottom: 20px;
      .el-image {
        float: left;
        width: 115px;
        height: 172px;
      }
      .book-about {
        position: relative;
        top: 50px;
        left: 5px;
        h3 {
          margin: 0 0 5px 0;
          width: 800px;
          font: 15px Arial, Helvetica, sans-serif;
          line-height: 1.5;
        }
        p {
          margin: 5px 0;
          width: 800px;
        }
      }
    }
  }
}
.page-pagination {
}
.clear-fix:after {
  display: block;
  clear: both;
  content: '';
  visibility: hidden;
  height: 0;
}
.clear-fix {
  zoom: 1;
}
</style>
