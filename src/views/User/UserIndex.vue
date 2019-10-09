<template>
  <div>
    <el-container>
      <el-header> <HeadNav></HeadNav> </el-header>
      <el-container>
        <el-aside width="220px"> <LeftMenu></LeftMenu> </el-aside>
        <el-main class="rightContainer"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class userIndex extends Vue {}
</script>

<style lang="scss" scoped></style>
