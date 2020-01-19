<template>
  <div class="archive-container">
    <archive-list />
    <pager :hide-if-one-page="false" :total-page="pageCount" :current-page.sync="currentPage" @update:currentPage="updatePage" />
  </div>
</template>

<script>
import ArchiveList from './archive-list'
import Pager from '@/components/Pager'
// import BLOGENTRIES from '@/data/blogs.json'
// import _ from 'lodash'
import { getArticles } from '@/api/article'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Archive',
  components: {
    ArchiveList,
    Pager
  },
  data () {
    return {
      currentPage: 1,
      perPage: 10
      // totalCount: BLOGENTRIES.length,
      // blogEntries: [],
      // articles: []
    }
  },
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
    updatePage (page) {
      this.currentPage = page
      this.getArchiveList(page)
    },
    getArchiveList (page) {
      getArticles(page, this.perPage).then(response => {
        const start = (page - 1) * this.perPage
        const end = start + this.perPage
        const articles = this.blogEntries.slice(start, end)
        articles.forEach(article => {
          console.log(response.filter(item => item.number === article.id)[0])
          article.tags = response.filter(item => item.number === article.id)[0].labels.map(label => {
            return {
              name: label.name,
              color: label.color,
              id: label.id
            }
          })
        })
        this.setArchives(this.formatArchives(articles))
      })
    },
    formatArchives (articles) {
      let chunkResult = this.chunkArr(articles, this.perPage)
      let result = []
      for (let i = 0; i < chunkResult.length; i++) {
        // 抽离
        let datas = this.sortArr(chunkResult[i], 'date')
        // 根据所给数据结构进行赋值
        result.push([])
        for (let j = 0; j < datas.length; j++) {
          result[i].push({
            date: new Date(datas[j][0].date).getFullYear(),
            articles: []
          })
        }
        for (let k = 0; k < result[i].length; k++) {
          result[i][k].articles = this.sortArr(chunkResult[i], 'date')[k]
        }
      }
      return result[0]
    },
    chunkArr (array, size) {
      // 获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
      const length = array.length
      // 判断不是数组，或者size没有设置，size小于1，就返回空数组
      if (!length || !size || size < 1) {
        return []
      }
      // 用来表示切割元素的范围start
      let index = 0
      // 用来递增表示输出数组的下标
      let resIndex = 0
      // 根据length和size算出输出数组的长度，并且创建它。
      let result = new Array(Math.ceil(length / size))
      // 进行循环
      while (index < length) {
        // 循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
        result[resIndex++] = array.slice(index, (index += size))
      }
      // 输出新数组
      // return result
      return result
    },
    sortArr (array, prop) {
      let result = []
      let entry = []
      let temp = 0
      // 按照特定的参数将数组排序将具有相同值得排在一起
      array = array.sort((a, b) => {
        return a[prop] > b[prop] ? -1 : 1
      })
      if (array.length) {
        temp = new Date(array[0][prop]).getFullYear()
      }
      // 将相同类别的对象添加到统一个数组
      for (let i = 0; i < array.length; i++) {
        if (new Date(array[i][prop]).getFullYear() === temp) {
          entry.push(array[i])
        } else {
          temp = new Date(array[i][prop]).getFullYear()
          result.push(entry)
          entry = [array[i]]
        }
      }
      // 将最后的内容推出新数组
      result.push(entry)
      return result
    },
    ...mapMutations({
      setArchives: 'SET_ARCHIVES'
    })
  },
  created () {
    // this.blogEntries = _.cloneDeep(BLOGENTRIES)
    // this.blogEntries.forEach(article => {
    //   article.tags = article.tags.map(tag => ({
    //     name: tag,
    //     color: Math.round(1 + Math.random() * 4)
    //   }))
    // })
    // this.blogEntries.sort((a, b) => b.id - a.id)
    this.getArchiveList(this.currentPage)
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
