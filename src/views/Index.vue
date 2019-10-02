<template>
  <self-header></self-header>
  <!--  <self-select></self-select>-->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelfHeader from '@/components/SelfHeader.vue';

@Component({
  components: { SelfHeader }
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped></style>
