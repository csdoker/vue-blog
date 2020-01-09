<template>
  <div class="archive-container">
    <archive-list :currentPage="currentPage" :maxCount="maxCount" />
    <pager :hide-if-one-page="false" :total-page="pageCount" :current-page.sync="currentPage" @update:currentPage="updatePage" />
  </div>
</template>

<script>
import ArchiveList from './archive-list'
import Pager from '@/components/Pager'
import BLOGENTRIES from '@/data/blogs.json'

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
      totalCount: BLOGENTRIES.length
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
    }
  }
}
</script>

<style scoped lang="scss">

</style>
