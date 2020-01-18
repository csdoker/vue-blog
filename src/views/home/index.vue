<template>
  <div class="home-container">
    <article-list :articles="articles" :maxCount="maxCount" />
    <pager :hide-if-one-page="false" :total-page="pageCount" :current-page.sync="currentPage" @update:currentPage="updatePage" />
  </div>
</template>

<script>
import ArticleList from './article-list'
import Pager from '@/components/Pager'
import BLOGENTRIES from '@/data/blogs.json'
import _ from 'lodash'
import { getArticles } from '@/api/article'
import { mapState, mapMutations } from 'vuex'

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
      totalCount: BLOGENTRIES.length,
      // articles: [],
      blogEntries: []
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
    },
    ...mapState({
      articles: state => state.app.articles
    })
  },
  methods: {
    getArticleList (page) {
      getArticles(page).then(response => {
        const start = (page - 1) * this.maxCount
        const end = start + this.maxCount
        const articles = this.blogEntries.slice(start, end)
        articles.forEach(article => {
          // article.summary = () => import(`@/summary/${article.name}.md`)
          article.summary = response.filter(item => item.number === article.id)[0].body.split('<!--more-->')[0]
          // article.content = response.filter(item => item.number === article.id)[0].body
        })
        this.setArticles(articles)
        // console.log(this.articles)
      })
    },
    updatePage (page) {
      this.currentPage = page
      this.getArticleList(page)
      // this.$router.push({ path: `/home/page/${page}` })
    },
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
    ...mapMutations({
      setArticles: 'SET_ARTICLES'
    })
  },
  created () {
    this.blogEntries = _.cloneDeep(BLOGENTRIES)
    this.blogEntries.sort((a, b) => b.id - a.id)
    this.getArticleList(this.currentPage)
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
