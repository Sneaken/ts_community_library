<template>
  <div>
    预约管理
    <div align="center">
      <el-table :data="tableData" style="width: 90%" border>
        <el-table-column prop="title" label="书名" />
        <el-table-column prop="label" label="书标号" />
        <el-table-column prop="start_time" label="预约时间" />
        <el-table-column prop="end_time" label="解约时间" />
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="handleClick(row.label)"
              >取消预约</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { cancelBooking, getBookingHistory } from '@/api/user';

@Component
export default class AppointManage extends Vue {
  private tableData = [];
  private get user(): string {
    return this.$store.getters.user.phone;
  }

  async mounted() {
    try {
      this.tableData = await getBookingHistory(this.user);
    } catch (e) {
      console.log(e);
    }
  }
  private async handleClick(label: string) {
    try {
      await this.$confirm('是否取消预约?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
      await cancelBooking(label, this.user);
      this.$message.success('取消预约成功！');
      this.tableData = await getBookingHistory(this.user);
    } catch (e) {
      if (typeof e === 'string') {
        this.$message.info('取消操作！');
      } else {
        if (e.message.includes('status')) {
          this.$message.error(JSON.parse(e.message).message);
        } else {
          console.log(e);
          this.$message.error(e.message);
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped></style>
