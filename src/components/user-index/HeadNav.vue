<template>
  <header class="head-nav">
    <span class="title">后台管理系统</span>
    <div class="userInfo">
      <div class="welcome" v-if="user.username">
        <span>欢迎</span>
        <el-dropdown @command="setDialogInfo">
          <span>
            <span class="username">{{ user.username }}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info" v-if="user.username"
              >个人信息</el-dropdown-item
            >
            <el-dropdown-item command="logout">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class headNav extends Vue {
  get user() {
    return this.$store.getters.user;
  }
  setDialogInfo(cmdItem: any) {
    switch (cmdItem) {
      case 'info':
        this.showInfoList();
        break;
      case 'logout':
        this.logout();
        break;
    }
  }
  showInfoList() {
    if (this.$store.getters.user.identity) {
      this.$router.push('/staff/infoShow2');
    } else {
      this.$router.push('/user/account-setting');
    }
  }
  logout() {
    if (this.$store.getters.user.identity) {
      //清除token
      localStorage.removeItem('eleToken');
      //设置vuex store
      this.$store.dispatch('clearCurrentState');
      //跳转
      this.$router.push('/staff/login');
    } else {
      //清除token
      localStorage.removeItem('eleToken');
      //设置vuex store
      this.$store.dispatch('clearCurrentState');
      //跳转
      this.$router.push('/user/login');
    }
  }
}
</script>

<style lang="scss" scoped>
.head-nav {
  width: 100%;
  background-color: #fff;
  height: 60px;
  .title {
    position: relative;
    top: 15px;
    left: 20px;
    font-size: 24px;
    line-height: 24px;
  }
  .userInfo {
    display: flex;
    position: absolute;
    top: 15px;
    right: 10px;
    height: 50px;
    .welcome {
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        padding: 0 5px;
      }
    }
  }
}
</style>
