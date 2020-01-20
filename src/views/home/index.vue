<template>
  <div class="home-container">
    <article-list />
    <pager :hide-if-one-page="false" :total-page="pagerHomeCount" :current-page.sync="currentPage" @update:currentPage="updatePage" />
  </div>
</template>

<script>
import ArticleList from './article-list'
import Pager from '@/components/Pager'
// import _ from 'lodash'
// import { getArticles, getBlogEntries } from '@/api/article'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    ArticleList,
    Pager
  },
  data () {
    return {
      currentPage: 1
      // perPage: 5
      // totalCount: 0
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
    // totalCount () {
    //   return this.blogEntries.length
    // },
    ...mapState({
      // blogEntries: state => state.app.blogEntries,
      totalCount: state => state.app.totalCount,
      perHomeCount: state => state.app.perHomeCount
    }),
    ...mapGetters(['pagerHomeCount'])
  },
  methods: {
    async getArticleList (page) {
      const blogEntries = await this.getBlogEntries()
      const { result, articles } = await this.getArticles({
        page, perPage: this.perHomeCount, blogEntries
      })
      articles.forEach(article => {
        const data = result.filter(item => item.number === article.id)[0]
        article.summary = data.body.split('<!--more-->')[0]
        article.tags = data.labels.map(label => {
          return {
            name: label.name,
            color: label.color,
            id: label.id
          }
        })
      })
      this.setArticles(articles)
    },
    updatePage (page) {
      this.currentPage = page
      this.getArticleList(page)
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
    }),
    ...mapActions(['getBlogEntries', 'getArticles'])
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
