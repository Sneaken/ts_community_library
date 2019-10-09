<template>
  <div>
    <self-header></self-header>
    <recommended-books></recommended-books>
    <leader-board></leader-board>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelfHeader from '@/components/Common/SelfHeader.vue';
import recommendedBooks from '@/components/Index/RecommendedBooks.vue';
import LeaderBoard from '@/components/Index/LeaderBoard.vue';

@Component({
  components: { SelfHeader, recommendedBooks, LeaderBoard }
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped></style>
