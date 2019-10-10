<template>
  <div class="user-index">
    <head-nav></head-nav>
    <div class="left-menu">
      <left-menu></left-menu>
    </div>
    <div class="main">
      <div>2</div>
    </div>
  </div>
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
.user-index {
  position: relative;
  height: 100%;
  background-color: #f1f4fb;
  .left-menu {
    overflow-x: hidden;
    width: 200px;
    position: fixed;
    height: 100%;
    background: #324057;
    box-shadow: 0 2px 15px 0 rgba(73, 73, 73, 0.1);
    z-index: 10;
    /deep/ .el-menu {
      border: 0;
    }
  }
  .main {
    margin: 10px 0 0 210px;
    height: calc(100% - 70px);
    background-color: #fff;
  }
}
</style>
