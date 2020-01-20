<template>
  <div class="article-container">
    <article class="article-content" :class="{show: toolbar.opened}">
      <div class="article-inner">
        <header class="article-header">
          <div class="article-header-inner">
            <h1 class="article-title">{{article.name}}</h1>
            <div class="article-date">
              <i class="date-icon iconfont icon-calendar"></i>
              <span class="date-time">{{article.date}}</span>
            </div>
          </div>
        </header>
        <div class="article-entry">
          <div class="article-data">
            <!-- <router-view /> -->
            <!-- <component :is="article.content"></component> -->
            <marked-content :content="article.content"></marked-content>
            <!-- markdown渲染数据 -->
            <!-- <vue-markdown v-if="article.articleContent" :source="article.articleContent"></vue-markdown> -->
          </div>
          <!-- <article-directory></article-directory> -->
        </div>
        <div class="article-info">
          <div class="article-tag">
            <i class="tag-icon iconfont icon-tag-fill"></i>
            <div
              class="tag-item"
              v-for="tag in article.tags"
              :key="tag.id"
              @click.stop="handleClickTag(tag.name)"
              :style="`background-color: #${tag.color};border-right-color: #${tag.color}`"
            >
              {{
                tag.name
              }}
            </div>
          </div>
          <div class="article-share">
            <!-- 文章分享相关按钮 -->
          </div>
        </div>
      </div>
    </article>
    <nav class="article-nav" :class="[!previousArticle.name ? 'start' : '', !nextArticle.name ? 'end' : '']">
      <router-link
        tag="a"
        :to="{ name: 'Article', params: { name: nextArticle.name } }"
        class="nav-link"
        v-if="nextArticle.name"
      >
        <i class="link-icon iconfont icon-arrowleft"></i>
        <span class="link-name">{{ nextArticle.name }}</span>
      </router-link>
      <router-link
        tag="a"
        :to="{ name: 'Article', params: { name: previousArticle.name } }"
        class="nav-link"
        v-if="previousArticle.name"
      >
        <span class="link-name">{{ previousArticle.name }}</span>
        <i class="link-icon iconfont icon-arrowright"></i>
      </router-link>
    </nav>
  </div>
</template>

<script>
// import { highlightCode } from '@/utils/highlight.js'
import { getArticle, getBlogEntries } from '@/api/article'
import { mapState, mapMutations } from 'vuex'
import MarkedContent from '@/components/marked'
// import _ from 'lodash'

export default {
  name: 'Article',
  components: {
    MarkedContent
  },
  data () {
    return {}
  },
  watch: {
    '$route': {
      handler: 'getData',
      immediate: true
    }
  },
  computed: {
    // articles () {
    //   return BLOGENTRIES.sort((a, b) => b.id - a.id)
    // },
    ...mapState({
      toolbar: state => state.app.toolbar,
      article: state => state.app.article,
      // blogEntries: state => state.app.blogEntries,
      previousArticle: state => state.app.previousArticle,
      nextArticle: state => state.app.nextArticle
    })
  },
  methods: {
    getData () {
      getBlogEntries().then(response => {
        const blogEntries = response.sort((a, b) => b.id - a.id)
        const article = blogEntries.filter(article => article.name === this.$route.params.name)[0]
        const previousArticle = article.id === 1 ? {} : blogEntries.filter(item => item.id === article.id - 1)[0]
        const nextArticle = article.id === blogEntries.length ? {} : blogEntries.filter(item => item.id === article.id + 1)[0]
        this.setPreviousArticle(previousArticle)
        this.setNextArticle(nextArticle)
        getArticle(article.id).then(response => {
          article.content = response.body
          article.tags = response.labels.map(label => {
            return {
              name: label.name,
              color: label.color,
              id: label.id
            }
          })
          this.setArticle(article)
        })
      })
    },
    handleClickTag (name) {
      this.openToolbar()
      this.setKeyword(`#${name}`)
    },
    ...mapMutations({
      openToolbar: 'OPEN_TOOLBAR',
      setKeyword: 'SET_KEYWORD',
      setArticle: 'SET_ARTICLE',
      setPreviousArticle: 'SET_PREVIOUS_ARTICLE',
      setNextArticle: 'SET_NEXT_ARTICLE',
      setBlogEntries: 'SET_BLOGENTRIES'
    })
  }
  // mounted () {
  //   highlightCode()
  // },
  // updated () {
  //   highlightCode()
  // }
  // created () {
  //   this.article = this.blogEntries.filter(article => article.name === this.$route.name)[0]
  // }
}
</script>

<style lang="scss" scoped>
.article-container {
  padding: 30px;
  .article-content {
    position: relative;
    border: 1px solid #ddd;
    border-top: none;
    border-bottom: none;
    background-color: #fff;
    transition: all 0.2s ease-in;
    margin-bottom: 30px;
    .article-inner {
      .article-header {
        border-left: 5px solid #4d4d4d;
        padding: 30px 8% 0;
        margin-bottom: 24px;

        .article-header-inner {
          border-bottom: 1px dotted #ddd;

          .article-title {
            display: block;
            color: #696969;
            font-weight: 300;
            line-height: 36px;
            font-size: 26px;
            transition: color 0.3s;
            margin: 0 0 20px 0;
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
            // background-color: #ba8f6c;
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
              // border-right-color: #ba8f6c;
              border-right-color: inherit;
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

        .article-share {
          display: none;
        }
      }
    }

    &.show {
      background: rgba(255, 255, 255, 0.3);
    }
  }
  .article-nav {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .nav-link {
      display: flex;
      align-items: center;
      justify-content: center;
      .link-name {
        font-size: 16px;
        transition: color .3s;
        line-height: 20px;
        color: #08c;
      }
      .link-icon {
        font-size: 20px;
        margin: 0 10px;
        color: #08c;
      }
      &:hover {
        .link-icon, .link-name {
          color: #4d4d4d;
        }
      }
    }
    &.start {
      justify-content: flex-start;
    }
    &.end {
      justify-content: flex-end;
    }
  }
}
// @media screen and (max-width: 1200px) {
//   .article-container {
//     .article-content {
//       .article-inner {
//         .article-entry {
//           .article-data {
//             display: block;
//             width: 100%;
//           }
//         }
//       }
//     }
//   }
// }
@media screen and (max-width: 800px) {
  .article-container {
    padding: 10px 0;
    .article-content {
      padding: 10px;
      border: 0;
      font-size: 16px;
      color: #555;
      .article-inner {
        .article-header {
          border-left: none;
          padding: 0;
          margin-bottom: 0;
          .article-header-inner {
            .article-title {
              font-size: 18px;
              margin-bottom: 10px;
            }
          }
        }
        .article-entry {
          padding: 10px 0 0;
        }
        .article-info {
          margin: 0;
          padding: 10px 0 0;
        }
      }
    }
    .article-nav {
      margin: 0;
    }
  }
}
</style>
