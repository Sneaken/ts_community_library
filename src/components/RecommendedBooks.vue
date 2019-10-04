<template>
  <div class="recommend-book">
    <h3>推荐图书</h3>
    <el-divider></el-divider>
    <div class="book-list">
      <el-carousel indicator-position="outside" height="480px">
        <el-carousel-item v-for="itemList in bookList">
          <div>
            <ul>
              <li v-for="item in itemList">
                <el-tooltip effect="light" placement="right" :open-delay="500">
                  <div slot="content">
                    <p>{{ item.title }}</p>
                    <p>{{ item.author.join(',') }}</p>
                    <p>{{ item.summary.substring(0, 250) }}</p>
                  </div>
                  <div>
                    <el-image
                      :src="imageChange(item.images.small)"
                      :alt="item.title"
                    ></el-image>
                    <p>{{ item.title }}</p>
                    <p>{{ item.author.join(',') }}</p>
                  </div>
                </el-tooltip>
              </li>
            </ul>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BScroll from 'better-scroll';
import { getHomeBook } from '@/config';
import { ResultInterface } from '@/config/common.interface';
@Component
export default class recommendedBooks extends Vue {
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
    const result: ResultInterface = await this.$axios.get(getHomeBook);
    let temp = [];
    if (result.status === 200) {
      for (let i = 0; i < (result.data as string[]).length; i++) {
        temp.push(result.data[i]);

        if (i % 10 === 9) {
          this.bookList.push(temp);
          temp = [];
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-book {
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
      margin: 0 25px 15px 0;
      width: 115px;
      height: 219px;
      .el-tooltip {
        p {
          margin: 5px 0;
          width: 115px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .el-image {
          width: 115px;
          height: 172px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.el-tooltip__popper {
  padding: 10px 20px 0;
  width: 300px;
  line-height: 1.5;
  color: #666;
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    word-break: break-all;
  }
}
.el-tooltip__popper.is-light {
  background: #e9e9e2;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: none;
}
</style>
