<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import jwt_decode from 'jwt-decode';
import { Component, Vue } from 'vue-property-decorator';
import { UserInterface } from './store/state.interface';
import { isEmpty } from './utils/common';

@Component
export default class App extends Vue {
  // lifecycle hook

  created() {
    if (localStorage.eleToken) {
      const userInfo: UserInterface = jwt_decode(localStorage.eleToken);
      if (new Date() < new Date(userInfo.exp * 1000)) {
        //token存储到vue
        this.$store.dispatch('setAuthenticated', !isEmpty(userInfo));
        this.$store.dispatch('setUser', userInfo);
      } else {
        this.$message({
          type: 'warning',
          message: '登录信息失效，请重新登录'
        });
        localStorage.removeItem('eleToken');
        this.$router.push('/login');
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}
</style>
