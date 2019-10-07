<template>
  <div class="header">
    <el-row :gutter="20">
      <el-col :span="4"
        ><span class="title" @click="$router.push('/index')"
          >星星读书</span
        ></el-col
      >
      <el-col :span="19">
        <el-menu
          :default-active="'1'"
          mode="horizontal"
          @select="handleSelect"
          background-color="#3498db"
          text-color="#fff"
          active-text-color="#fdcb6e"
        >
          <el-menu-item index="1">书目检索</el-menu-item>
          <el-menu-item index="2">我的图书馆</el-menu-item>
        </el-menu></el-col
      >
    </el-row>
    <self-select v-show="showSelect"></self-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelfSelect from '@/components/Common/SelfSelect.vue';
@Component({
  components: {
    SelfSelect
  }
})
export default class selfHeader extends Vue {
  showSelect: boolean = true;

  handleSelect(key: string, keyPath: string[]) {
    if (key === '1') {
      this.showSelect = !this.showSelect;
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 950px;
  margin: 0 auto;
}
.title {
  display: inline-block;
  font-size: 20px;
  line-height: 20px;
  padding: 20px 20px;
}
.el-menu-item {
  font-size: 18px;
}
</style>
