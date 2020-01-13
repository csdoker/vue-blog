<template>
  <div class="archive-container">
    <archive-list :articles="articles" :maxCount="maxCount" />
    <pager :hide-if-one-page="false" :total-page="pageCount" :current-page.sync="currentPage" @update:currentPage="updatePage" />
  </div>
</template>

<script>
import ArchiveList from './archive-list'
import Pager from '@/components/Pager'
import BLOGENTRIES from '@/data/blogs.json'
import _ from 'lodash'

export default {
  name: 'Archive',
  components: {
    ArchiveList,
    Pager
  },
  data () {
    return {
      currentPage: 1,
      maxCount: 10,
      totalCount: BLOGENTRIES.length,
      blogEntries: [],
      articles: []
    }
  },
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
      this.getArticles()
    },
    getArticles () {
      const start = (this.currentPage - 1) * this.maxCount
      const end = start + this.maxCount
      this.articles = this.blogEntries.slice(start, end)
    }
  },
  created () {
    this.blogEntries = _.cloneDeep(BLOGENTRIES)
    this.blogEntries.forEach(article => {
      article.tags = article.tags.map(tag => ({
        name: tag,
        color: Math.round(1 + Math.random() * 4)
      }))
    })
    this.blogEntries.sort((a, b) => b.id - a.id)
    this.getArticles()
  }
}
</script>

<style scoped lang="scss">
.archive-container {
  padding: 30px 30px 80px;
}
@media screen and (max-width: 800px) {
  .archive-container {
    padding: 10px 0 80px;
  }
}
</style>
