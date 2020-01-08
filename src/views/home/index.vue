<template>
  <div class="home-container">
    <article-list :currentPage="currentPage" :maxCount="maxCount" />
    <pager :hide-if-one-page="false" :total-page="pageCount" :current-page.sync="currentPage" @update:currentPage="updatePage" />
  </div>
</template>

<script>
import ArticleList from './article-list'
import Pager from '@/components/Pager'
import BLOGENTRIES from '@/data/blogs.json'

export default {
  name: 'Home',
  components: {
    ArticleList,
    Pager
  },
  data () {
    return {
      currentPage: 1,
      maxCount: 5
    }
  },
  computed: {
    pageCount () {
      let pageCount = 0
      const articleCount = BLOGENTRIES.length
      if (articleCount % this.maxCount === 0) {
        pageCount = articleCount / this.maxCount
      } else {
        pageCount = (articleCount - articleCount % this.maxCount) / this.maxCount + 1
      }
      return pageCount
    }
  },
  methods: {
    updatePage (page) {
      this.currentPage = page
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  padding: 30px 30px 80px;
}
@media screen and (max-width: 800px) {
  .home-container {
    padding: 10px 0 80px;
  }
}
</style>
