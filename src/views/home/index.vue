<template>
  <div class="home-container">
    <article-list />
    <pager :hide-if-one-page="false" :total-page="20" :current-page.sync="currentPage" @update:currentPage="update" />
  </div>
</template>

<script>
import ArticleList from './article-list'
import Pager from '@/components/Pager'

export default {
  name: 'Home',
  components: {
    ArticleList,
    Pager
  },
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    update (n) {
      console.log(n)
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  padding: 30px 30px 80px;
}
</style>
