<template>
  <div class="home-container">
    <article-list />
    <pagination />
  </div>
</template>

<script>
import ArticleList from './article-list'
import Pagination from '@/components/Pagination'

export default {
  name: 'Home',
  components: {
    ArticleList,
    Pagination
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  padding: 30px 30px 80px;
}
</style>
