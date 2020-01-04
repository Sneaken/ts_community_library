<template>
  <div class="book-item clear-fix" v-if="info">
    <h3>
      {{ info.title }} <span v-if="info.subtitle">: {{ info.subtitle }}</span>
    </h3>
    <div class="book-info">
      <el-image :src="info['images']['small']" :alt="info.title" />
      <div class="rate">
        <p>评分</p>
        <el-rate
          v-model="info.rating.average"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        >
        </el-rate>
      </div>
      <div class="info">
        <ul>
          <li v-if="info.author[0] !== ''">
            作者: {{ info.author.join(',') }}
          </li>
          <li v-if="info.publisher">出版社: {{ info.publisher }}</li>
          <li v-if="info.subtitle">副标题: {{ info.subtitle }}</li>
          <li v-if="info.altTitle">原作名: {{ info.altTitle }}</li>
          <li v-if="info.translator">译者: {{ info.translator }}</li>
          <li v-if="info.pubDate">出版年: {{ info.pubDate }}</li>
          <li v-if="info.pages">页数: {{ info.pages }}</li>
          <li v-if="info.price">定价: ￥{{ info.price.toFixed(2) }}</li>
          <li v-if="info.binding">装帧: {{ info.binding }}</li>
          <li v-if="info.isbn13">ISBN: {{ info.isbn13 }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    info: {
      type: Object,
      default: {}
    }
  }
})
export default class bookItem extends Vue {
  get imageChange() {
    return function(val: { replace: (arg0: string, arg1: string) => string }) {
      return val.replace('https://', 'https://images.weserv.nl/?url=');
    };
  }
}
</script>

<style lang="scss" scoped>
.book-item {
  width: 950px;
  margin: 0 auto;
  .el-image {
    float: left;
    width: 135px;
    height: 186px;
    margin-right: 10px;
  }
  .info {
    ul {
      list-style: none;
      li {
        margin: 0 0 5px 0;
        padding-left: 105px;
        font-size: 14px;
      }
    }
  }
  .rate {
    float: right;
  }
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
