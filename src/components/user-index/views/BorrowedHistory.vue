<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="70">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class borrowedHistory extends Vue {
  private tableData = [];
}
</script>

<style lang="scss" scoped></style>
