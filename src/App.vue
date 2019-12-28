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
import { GET_TOKEN } from '@/config';
import { ResultInterface } from '@/config/common.interface';

@Component
export default class App extends Vue {
  // lifecycle hook

  async created() {
    if (typeof localStorage.update === 'undefined') {
      if (typeof localStorage.eleToken === 'undefined') return;
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
    } else if (localStorage.update === 'true') {
      try {
        const decodedOld: UserInterface = jwt_decode(localStorage.eleToken);
        const params: any = {
          params: {
            username: decodedOld.username
          }
        };
        const result: ResultInterface = await this.$axios.get(
          GET_TOKEN,
          params
        );
        localStorage.setItem('eleToken', result.data as string);
        //解析token
        const decoded = jwt_decode(result.data as string);

        //token存储到vuex
        await this.$store.dispatch('setAuthenticated', !isEmpty(decoded));
        await this.$store.dispatch('setUser', decoded);
        localStorage.removeItem('update');
      } catch (e) {
        console.log(e);
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
