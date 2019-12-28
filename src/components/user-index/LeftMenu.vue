<template>
  <div>
    <el-menu
      mode="vertical"
      background-color="#324057"
      text-color="#fff"
      active-text-color="#409eff"
      router
    >
      <template v-for="item in items">
        <el-menu-item v-if="!item.children" :index="item.path" :key="item.path">
          <i :class="item.icon" />
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>

        <el-submenu v-if="item.children" :index="item.path" :key="item.path">
          <template slot="title">
            <i :class="item.icon" />
            <span slot="title">{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="cItem in item.children"
            :index="cItem.path"
            :key="cItem.path"
          >
            <span slot="title">{{ cItem.name }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class leftMenu extends Vue {
  items = [
    {
      icon: 'el-icon-view',
      name: '借阅管理',
      path: 'borrowingManagement',
      children: [
        { path: 'currentBorrowingRenewing', name: '当前借阅/续借' },
        { path: 'borrowedHistory', name: '借阅历史' }
      ]
    },
    {
      icon: 'el-icon-star-on',
      name: '预约管理',
      path: 'user/bookReservationManagement'
    },
    {
      icon: 'el-icon-menu',
      name: '赔偿/逾期查询',
      path: 'compensationOverdueInquiry',
      children: [
        { path: 'compensationInquiry', name: '赔偿查询' },
        { path: 'overdueInquiry', name: '逾期查询' }
      ]
    }
  ];
  // mounted() {
  //   /**
  //    * 判定用户是否越权
  //    * if true 判定越权
  //    */
  //   if (
  //     this.$store.getters.user.identity ||
  //     this.$store.getters.user.username
  //   ) {
  //     //清除token
  //     localStorage.removeItem('eleToken');
  //     //设置vuex store
  //     this.$store.dispatch('clearCurrentState');
  //     //跳转
  //     this.$router.push('/user/login');
  //     this.$message.error('权限不足,请重新登录');
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.el-menu {
  width: 200px;
}
</style>
