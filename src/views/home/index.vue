<template>
  <div class="home-container">
    <article-list />
    <pager :hide-if-one-page="false" :total-page="pageCount" :current-page.sync="currentPage" @update:currentPage="updatePage" />
  </div>
</template>

<script>
import ArticleList from './article-list'
import Pager from '@/components/Pager'
import _ from 'lodash'
import { getArticles, getBlogEntries } from '@/api/article'
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
      perPage: 5
      // articles: [],
      // blogEntries: []
    }
  },
  // watch: {
  //   '$route': {
  //     handler: 'setCurrentPage',
  //     immediate: true
  //   }
  // },
  computed: {
    totalCount () {
      return this.blogEntries.length
    },
    pageCount () {
      let pageCount = 0
      if (this.totalCount % this.perPage === 0) {
        pageCount = this.totalCount / this.perPage
      } else {
        pageCount = (this.totalCount - this.totalCount % this.perPage) / this.perPage + 1
      }
      return pageCount
    },
    ...mapState({
      blogEntries: state => state.app.blogEntries
    })
  },
  methods: {
    getArticleList (page) {
      getBlogEntries().then(response => {
        this.setBlogEntries(response.sort((a, b) => b.id - a.id))
        const blogEntries = _.cloneDeep(this.blogEntries)
        getArticles(page, this.perPage).then(response => {
          const start = (page - 1) * this.perPage
          const end = start + this.perPage
          const articles = blogEntries.slice(start, end)
          articles.forEach(article => {
            // article.summary = () => import(`@/summary/${article.name}.md`)
            article.summary = response.filter(item => item.number === article.id)[0].body.split('<!--more-->')[0]
            article.tags = response.filter(item => item.number === article.id)[0].labels.map(label => {
              return {
                name: label.name,
                color: label.color,
                id: label.id
              }
            })
            // article.content = response.filter(item => item.number === article.id)[0].body
          })
          this.setArticles(articles)
          // console.log(this.articles)
        })
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
      setArticles: 'SET_ARTICLES',
      setBlogEntries: 'SET_BLOGENTRIES'
    })
  },
  created () {
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
