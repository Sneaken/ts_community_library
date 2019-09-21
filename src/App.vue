<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import jwt_decode from 'jwt-decode';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  // lifecycle hook

  created() {
    if (localStorage.eleToken) {
      const decoded = jwt_decode(localStorage.eleToken);
      //token存储到vue
      this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded));
      this.$store.dispatch('setUser', decoded);
    }
  }

  // method
  isEmpty(value: any) {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    );
  }
}
</script>

<style lang="scss"></style>
