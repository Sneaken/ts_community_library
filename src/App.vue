<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  // lifecycle hook
  created() {
    this.greet()
  }

  // method
  greet() {
    alert('greeting: ' + this.msg)
  }
}
</script>

<style lang="scss"></style>
