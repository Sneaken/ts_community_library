<template>
  <div class="book-info">
    <self-header></self-header>
    <book-item @sendMessage="getMessage"></book-item>
    <book-content
      :summary="summary"
      :author-intro="authorIntro"
      :catalog="catalog"
    ></book-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import selfHeader from '@/components/Common/SelfHeader.vue';
import bookItem from '@/components/BookInfo/BookItem.vue';
import bookContent from '@/components/BookInfo/BookContent.vue';
@Component({
  components: {
    selfHeader,
    bookItem,
    bookContent
  }
})
export default class bookInfo extends Vue {
  summary: any = [];
  authorIntro: any = [];
  catalog: any = [];
  getMessage(val: { [x: string]: string; summary: string; catalog: string }) {
    this.summary = val['summary'].split('\n');
    this.authorIntro = val['authorIntro'].split('\n');
    this.catalog = val['catalog'].split('\n');
  }
}
</script>

<style lang="scss" scoped>
.book-info {
  margin-left: calc(100vw - 100%);
}
</style>
