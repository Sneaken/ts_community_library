<template>
  <div class="book-content">
    <ul>
      <li class="summary">
        <div>
          <h2>内容简介 · · · · ·</h2>
          <template v-if="!showSummary">
            <p v-for="(item, index) in summary" v-if="index < 2">
              {{ item }}
            </p>
            <p @click="showSummary = true" v-if="summary.length > 2">
              (展开全部)
            </p>
          </template>
          <template v-else>
            <p v-for="item in summary">{{ item }}</p>
          </template>
        </div>
      </li>
      <li class="authorIntro">
        <div>
          <h2>作者简介 · · · · ·</h2>
          <template v-if="!showAuthorIntro">
            <p v-for="(item, index) in authorIntro" v-if="index < 2">
              {{ item }}
            </p>
            <p @click="showAuthorIntro = true" v-if="authorIntro.length > 2">
              (展开全部)
            </p>
          </template>
          <template v-else>
            <p v-for="item in authorIntro">{{ item }}</p>
          </template>
        </div>
      </li>
      <li class="catalog">
        <div>
          <h2>目录 · · · · ·</h2>
          <template v-if="!showCatalog">
            <p v-for="(item, index) in catalog" v-if="index < 2">
              {{ item }}
            </p>
            <p @click="showCatalog = true" v-if="catalog.length > 2">
              (展开全部)
            </p>
          </template>
          <template v-else>
            <p v-for="item in catalog">{{ item }}</p>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    summary: {
      type: Array,
      default: []
    },
    authorIntro: {
      type: Array,
      default: []
    },
    catalog: {
      type: Array,
      default: []
    }
  }
})
export default class bookContent extends Vue {
  showSummary = false;
  showAuthorIntro = false;
  showCatalog = false;
}
</script>

<style lang="scss" scoped>
.book-content {
  width: 950px;
  margin: 0 auto;
  ul {
    list-style: none;
    padding-inline-start: 0;
    li {
      margin: 0 0 5px 0;
      font-size: 14px;
      h2 {
        font: 15px Arial, Helvetica, sans-serif;
        color: #072;
        margin: 25px 0 5px 0;
        line-height: 1.5;
      }
      p {
        text-indent: 2em;
        margin: 5px 0;
        line-height: 1.62;
      }
    }
  }
}
</style>
