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
      maxCount: 5,
      totalCount: BLOGENTRIES.length
    }
  },
  // watch: {
  //   '$route': {
  //     handler: 'setCurrentPage',
  //     immediate: true
  //   }
  // },
  computed: {
    pageCount () {
      let pageCount = 0
      if (this.totalCount % this.maxCount === 0) {
        pageCount = this.totalCount / this.maxCount
      } else {
        pageCount = (this.totalCount - this.totalCount % this.maxCount) / this.maxCount + 1
      }
      return pageCount
    }
  },
  methods: {
    updatePage (page) {
      this.currentPage = page
      // this.$router.push({ path: `/home/page/${page}` })
    }
    // setCurrentPage () {
    //   console.log(this.$route)
    //   const index = this.$route.params.index
    //   if (index <= this.totalCount && index >= 1) {
    //     this.currentPage = parseInt(this.$route.params.index)
    //   } else {
    //     if (this.$route.name !== 'Home') {
    //       this.$router.push({ path: `/home` })
    //     }
    //   }
    // }
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
