<template>
  <div class="select">
    <el-select v-model="category" placeholder="请选择" clearable>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input
      v-model="keywords"
      clearable
      placeholder="请输入关键字"
      @keyup.enter.native="handleSelect"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="handleSelect"
      ></el-button>
    </el-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class selfSelect extends Vue {
  options = [
    {
      value: 'title',
      label: '书名'
    },
    {
      value: 'author',
      label: '作者名'
    },
    {
      value: 'publisher',
      label: '出版社'
    }
  ];
  category: any = 'title';
  keywords: any = '';

  mounted() {
    this.category = this.$route.query.category;
    this.keywords = this.$route.query.keywords;
  }
  handleSelect() {
    if (this.$route.query.keywords !== this.keywords) {
      if (this.category === '' || typeof this.category === 'undefined') {
        this.category = 'title';
      }
      this.$router.push({
        path: '/bookSearch',
        query: { category: this.category, keywords: this.keywords }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.el-select {
  margin-right: 10px;
}
</style>
