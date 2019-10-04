<template>
  <!--  <el-container>-->
  <!--    <el-header><self-header></self-header></el-header>-->
  <!--    <el-main><recommended-books></recommended-books></el-main>-->
  <!--    <el-footer>Footer</el-footer>-->
  <!--  </el-container>-->
  <div>
    <self-header></self-header>
    <recommended-books></recommended-books>
    <leader-board></leader-board>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelfHeader from '@/components/SelfHeader.vue';
import recommendedBooks from '@/components/RecommendedBooks.vue';
import LeaderBoard from '@/components/LeaderBoard.vue';

@Component({
  components: { SelfHeader, recommendedBooks, LeaderBoard }
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped></style>
