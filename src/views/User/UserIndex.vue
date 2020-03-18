<template>
  <el-container class="main-page">
    <el-header class="header" height="70px"><head-nav /></el-header>
    <el-container class="content">
      <el-aside class="left-menu" width="200px"><left-menu /></el-aside>
      <el-main class="router-view"><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import headNav from '@/components/user-index/HeadNav.vue';
import LeftMenu from '@/components/user-index/LeftMenu.vue';
@Component({
  components: { LeftMenu, headNav }
})
export default class userIndex extends Vue {}
</script>

<style lang="scss" scoped>
.main-page {
  height: 100%;
  min-height: 1000px;
  background-color: #f1f4fb;
}

.header {
  padding: 0 !important;
  background-color: #ffffff;
}

.content {
  overflow: hidden;
}

.left-menu {
  height: 100%;
  background-color: #40435b;
  overflow-y: auto;
  overflow-x: hidden;
}

.router-view {
  margin-top: 10px;
  margin-left: 10px;
  background-color: #ffffff;
}
</style>
