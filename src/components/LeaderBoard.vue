<template>
  <div class="leader-board">
    <h3>最受关注图书排行榜</h3>
    <el-divider></el-divider>
    <div class="book-list">
      <ul>
        <li v-for="item in bookList">
          <div>
            <el-image
              :src="imageChange(item.images.small)"
              :alt="item.title"
            ></el-image>
            <div class="info">
              <p>{{ item.title }}</p>
              <el-rate
                v-model="item.rating.average"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}分"
              >
              </el-rate>
              <p>作者:{{ item.author.join(',') }}</p>
              <p>标签:{{ item.tags }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ResultInterface } from '@/config/common.interface';
import { getLeaderBoard } from '@/config';

@Component
export default class leaderBoard extends Vue {
  bookList = [];

  mounted() {
    this.getBookList();
  }
  get imageChange() {
    return function(val: { replace: (arg0: string, arg1: string) => string }) {
      return val.replace('https://', 'https://images.weserv.nl/?url=');
    };
  }

  async getBookList() {
    const result: ResultInterface = await this.$axios.get(getLeaderBoard);
    if (result.status === 200) {
      result.data.forEach(item => {
        item.rating.average = Number.parseFloat(item.rating.average) / 2;
        item.tags = JSON.parse(item.tags)
          .map(item => item.title)
          .join('、');
      });
      console.log(result.data);
      this.bookList = result.data;
    }
  }
}
</script>

<style lang="scss" scoped>
.leader-board {
  width: 50%;
  margin: 0 auto;
}
.book-list {
  margin: 0 auto;
  width: 800px;
  ul {
    list-style-type: none;
    padding: 0 0 0 50px;
    li {
      display: inline-block;
      vertical-align: top;
      margin: 0 25px 15px 0;
      width: 317px;
      height: 156px;
      .info {
        display: inline-block;
        position: relative;
        top: 0;
        left: 5px;
        margin-left: 10px;
        p {
          margin: 5px 0;
          width: 200px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          word-break: break-all;
        }
      }
      .el-image {
        float: left; /* 关键属性 */
        width: 80px;
        height: 120px;
      }
    }
  }
}
</style>
