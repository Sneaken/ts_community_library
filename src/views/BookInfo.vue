<template>
  <div class="book-info">
    <self-header></self-header>
    <book-item v-if="info" :info="info"></book-item>
    <book-content
      class="book-content"
      v-if="info"
      :summary="info.summary.split('\n')"
      :author-intro="info.authorIntro.split('\n')"
      :catalog="info.catalog.split('\n')"
    ></book-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import selfHeader from '@/components/Common/SelfHeader.vue';
import bookItem from '@/components/BookInfo/BookItem.vue';
import bookContent from '@/components/BookInfo/BookContent.vue';
import { GET_INFO } from '@/config';
import { AxiosRequestConfig } from 'axios';
@Component({
  components: {
    selfHeader,
    bookItem,
    bookContent
  }
})
export default class bookInfo extends Vue {
  info: any = null;

  summary: any = [];
  authorIntro: any = [];
  catalog: any = [];

  mounted() {
    this.getBookInfo();
  }

  async getBookInfo() {
    const param: AxiosRequestConfig = {
      params: {
        _id: this.$route.params._id
      }
    };
    const result = await this.$axios.get(GET_INFO, param);
    if (result.status === 200) {
      this.info = result.data[0];
      this.info.rating.average =
        Number.parseFloat(this.info.rating.average) / 2;
      // console.log(this.info);
    }
  }
}
</script>

<style lang="scss" scoped>
.book-info {
  margin-left: calc(100vw - 100%);
}
.book-content {
  position: relative;
  top: 5px;
}
</style>
