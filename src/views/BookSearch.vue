<template>
  <div>
    <!--  顶部-->
    <self-header></self-header>
    <!-- 主内容 -->
    <book-list class="book-list"></book-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelfHeader from '@/components/Common/SelfHeader.vue';
import BookList from '@/components/BookSearch/BookList.vue';

@Component({
  components: { SelfHeader, BookList }
})
export default class bookSearch extends Vue {}
</script>

<style lang="scss" scoped>
.book-list {
  position: relative;
  top: 10px;
}
</style>
