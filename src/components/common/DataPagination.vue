<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :layout="layout"
    :total="total"
  >
  </el-pagination>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
@Component({
  props: {
    pageSizes: { type: Array, default: [10, 20, 30, 50, 100] }, // 每页可以多少条 如[15,20,30,50,100]-->
    pageSize: { type: Number, default: 10 }, // 每页多少条
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    data: { type: Array, default: [] } // 总数据
  }
})
export default class dataPagination extends Vue {
  currentPage: number = 1;
  total: number = 0;
  tableData = [];
  pageSizeCopy: number = this.pageSize;
  hide: boolean = false;

  setPagination() {
    // 数据总量
    this.total = this.data.length;
    this.hide = this.total < this.pageSize;
    // 设置默认分页数据
    this.tableData = this.data.filter((item, index) => {
      return index < this.pageSizeCopy;
    });
    this.$emit('getTableData', { type: 1, data: this.tableData });
  }

  handleCurrentChange(page: number) {
    // 当前页
    let sortNum = this.pageSizeCopy * (page - 1);
    let table = this.data.filter((item: any, index: number) => {
      return index >= sortNum;
    });
    // 设置默认分页数据
    this.tableData = table.filter((item: any, index: number) => {
      return index < this.pageSizeCopy;
    });
    this.$emit('getTableData', { type: 1, data: this.tableData });
    this.$nextTick(() => {
      window.scrollTo(0, 0);
    });
  }

  handleSizeChange(page_size: number) {
    // 切换size
    this.currentPage = 1;
    let type; //el-table 数据渲染问题
    this.pageSizeCopy < page_size ? (type = 1) : (type = 2);
    this.pageSizeCopy = page_size;
    this.tableData = this.data.filter((item: any, index: number) => {
      return index < page_size;
    });
    this.$emit('getTableData', { type, data: this.tableData });
  }

  @Watch('data')
  dataOnChange() {
    console.log(1);
    this.setPagination();
  }
  @Watch('pageSize')
  pageSizeOnChange(newVal: number) {
    this.pageSizeCopy = newVal;
  }
  mounted() {
    console.log(2);
    this.setPagination();
  }
}
</script>
<style lang="scss" scoped>
.el-pagination {
  text-align: center;
}
</style>
