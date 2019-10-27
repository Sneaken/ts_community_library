<template>
  <div class="user-index">
    <head-nav class="header-nav"></head-nav>
    <div class="left-menu">
      <left-menu></left-menu>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
  <!--  <div class="container is-vertical">-->
  <!--    <head-nav></head-nav>-->
  <!--    <div class="container">-->
  <!--      <div class="left-menu">-->
  <!--        <left-menu></left-menu>-->
  <!--      </div>-->
  <!--      <div class="main">-->
  <!--        <router-view></router-view>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
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
  height: 100%;
  background-color: #f1f4fb;

  .head-nav {
    position: fixed;
    top: 0;
    z-index: 10;
  }
  .left-menu {
    overflow-x: hidden;
    width: 200px;
    position: fixed;
    top: 60px;
    height: 100%;
    background: #324057;
    box-shadow: 0 2px 15px 0 rgba(73, 73, 73, 0.1);
    z-index: 10;
    /deep/ .el-menu {
      border: 0;
    }
  }
  .main {
    position: fixed;
    width: calc(100% - 210px);
    height: calc(100% - 60px);
    top: 70px;
    left: 210px;
    bottom: 5px;
  }
}
/*.container {*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  flex: 1;*/
/*  flex-basis: auto;*/
/*  box-sizing: border-box;*/
/*  height: 100%;*/
/*  &.is-vertical {*/
/*    flex-direction: column;*/
/*  }*/
/*  .left-menu {*/
/*    box-sizing: border-box;*/
/*    flex-shrink: 0;*/
/*    height: 100%;*/
/*    background: #324057;*/
/*    overflow-x: hidden;*/
/*    /deep/ .el-menu {*/
/*      border: 0;*/
/*    }*/
/*  }*/
/*  .main {*/
/*    display: block;*/
/*    flex: 1;*/
/*    flex-basis: auto;*/
/*    padding: 20px;*/
/*  }*/
/*}*/
</style>
