<template>
  <div class="article-list">
    <article
      v-for="article in articles"
      :key="article.id"
      class="article-item"
    >
      <div class="article-inner">
        <header class="article-header">
          <div class="article-header-inner">
            <router-link
              tag="h1"
              :to="{ name: article.name }"
              class="article-title"
            >
              {{ article.name }}
            </router-link>
            <div class="article-date">
              <i class="date-icon iconfont icon-calendar"></i>
              <span class="date-time">{{ article.date }}</span>
            </div>
          </div>
        </header>
        <div class="article-entry">
          <!-- <component :is="getSummary(article.id)"></component> -->
          <component :is="getSummaries[article.id]"></component>
        </div>
        <div class="article-info">
          <div class="article-tag">
            <i class="tag-icon iconfont icon-tag-fill"></i>
            <div
              class="tag-item"
              v-for="(tag, index) in article.tags"
              :key="index"
            >
              {{
                tag
              }}
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import BLOGENTRIES from '@/data/blogs.json'
import { highlightCode } from '@/utils/highlight.js'

// const components = {}
// BLOGENTRIES.forEach(article => {
//   components[`ArticleSummary${article.id}`] = () => import(`@/summary/${article.name}.md`)
// })

export default {
  name: 'ArticleList',
  // components,
  data () {
    return {}
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    maxCount: {
      type: Number,
      default: 5
    }
  },
  computed: {
    articles () {
      const start = (this.currentPage - 1) * this.maxCount
      const end = start + this.maxCount
      return BLOGENTRIES.sort((a, b) => b.id - a.id).slice(start, end)
    },
    getSummaries () {
      const summaries = {}
      this.articles.forEach(article => {
        // summaries[article.id] = require(`@/summary/${article.name}.md`).default
        summaries[article.id] = () => import(`@/summary/${article.name}.md`)
      })
      return summaries
    }
  },
  methods: {
    // getSummary (id) {
    //   return `article-summary-${id}`
    // }
  },
  mounted () {
    highlightCode()
  },
  updated () {
    highlightCode()
  },
  created () {
    // 走摘要里拿列表显示的数据
    // 暂时先这样处理，等后台完成后，让后台处理文章摘要的截取逻辑
    // console.log(test)
  }
}
</script>

<style scoped lang="scss">
.article-list {
  margin-bottom: 30px;
  .article-item {
    position: relative;
    margin-bottom: 30px;
    border: 1px solid #ddd;
    border-top: none;
    border-bottom: none;
    background-color: #fff;
    transition: all 0.2s ease-in;
    .article-inner {
      .article-header {
        border-left: 5px solid #4d4d4d;
        padding: 30px 8% 0;
        margin-bottom: 24px;
        .article-header-inner {
          border-bottom: 1px dotted #ddd;
          .article-title {
            color: #696969;
            font-weight: 300;
            line-height: 36px;
            font-size: 26px;
            transition: color 0.3s;
            margin: 0 0 20px 0;
            cursor: pointer;
          }
          .article-date {
            display: flex;
            align-items: center;
            color: #999;
            flex-wrap: wrap;
            .date-icon {
              margin-right: 6px;
            }
            .date-time {
              font-size: 16px;
            }
          }
        }
      }
      .article-entry {
        line-height: 1.8em;
        padding: 0 8%;
        margin-bottom: 30px;
        .article-more {
          color: #08c;
          font-size: 16px;
        }
      }
      .article-info {
        padding: 20px 0 40px;
        margin: 0 8% 0;
        border-top: 1px solid #ddd;
        .article-tag {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .tag-icon {
            color: #999;
            margin-right: 10px;
          }
          .tag-item {
            background-color: #ba8f6c;
            font-weight: 400;
            font-size: 10px;
            color: #fff;
            height: 18px;
            line-height: 18px;
            padding: 0 5px 0 10px;
            position: relative;
            border-radius: 0 5px 5px 0;
            margin: 5px 9px 5px 8px;
            font-family: Menlo, Monaco, Andale Mono, lucida console,
              Courier New, monospace;
            cursor: pointer;
            &:before {
              content: ' ';
              width: 0;
              height: 0;
              position: absolute;
              top: 0;
              left: -18px;
              border: 9px solid transparent;
              border-right-color: #ba8f6c;
            }
            &:after {
              content: ' ';
              width: 4px;
              height: 4px;
              background-color: #fff;
              border-radius: 4px;
              box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
              position: absolute;
              top: 7px;
              left: 2px;
            }
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    &.show {
      background: hsla(0,0%,100%,.3);
    }
  }
}
@media screen and (max-width: 800px) {
  .article-list {
    .article-item {
      margin-bottom: 10px;
      padding: 10px;
      border: none;
      font-size: 16px;
      color: #555;
      .article-inner {
        .article-header {
          border-left: none;
          padding: 0;
          margin-bottom: 10px;
          .article-header-inner {
            .article-title {
              font-size: 18px;
              margin-bottom: 10px;
            }
          }
        }
        .article-entry {
          padding: 0;
        }
        .article-info {
          margin: 0;
          padding: 10px 0 0;
        }
      }
    }
  }
}
</style>
