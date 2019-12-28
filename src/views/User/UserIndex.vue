<template>
  <el-container>
    <el-header class="header-container">
      <head-nav />
    </el-header>
    <el-container>
      <el-aside class="aside-container" width="201px">
        <left-menu />
      </el-aside>
      <el-main class="main-container">
        <router-view />
      </el-main>
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
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  border-bottom: 10px solid #f1f4fb;
  width: 100%;
  height: 70px !important;
  font-size: 18px;
  background-color: white;
}
.aside-container {
  overflow-y: hidden;
  position: fixed;
  top: 70px;
  left: 0;
  z-index: 12;
  border-right: 10px solid #f1f4fb;
  height: 100%;
  background-color: white;
  box-shadow: 0 2px 15px 0 rgba(73, 73, 73, 0.1);
  /deep/ .el-menu {
    border: 0;
  }
}
.main-container {
  position: absolute;
  top: 70px;
  left: 200px;
  margin: 10px;
  width: calc(100% - 210px);
  min-width: 900px;
  background-color: white;
}
</style>
