<template> </template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  // initial data
  msg = 123

  // use prop values for initial data
  helloMsg = 'Hello, ' + this.propMessage

  // lifecycle hook
  mounted() {
    this.greet()
  }

  // computed
  get computedMsg() {
    return 'computed ' + this.msg
  }

  // method
  greet() {
    alert('greeting: ' + this.msg)
  }
}
</script>

<style lang="scss" scoped></style>
