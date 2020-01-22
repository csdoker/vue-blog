<template>
  <div class="archive-list" :class="{show: toolbar.opened}">
    <section class="archive-wrapper" v-for="archive in archives" :key="archive.date">
      <div class="archive-date">{{ archive.date }}</div>
      <div class="archive-articles">
        <article class="archive-article" v-for="article in archive.articles" :key="article.id">
          <div class="archive-article-inner">
            <h1 class="article-title">
              <router-link :title="article.name" class="article-link" :to="{ name: 'Article', params: { name: article.name } }">
                {{article.name}}
              </router-link>
            </h1>
            <div class="article-date">
              <i class="date-icon iconfont icon-calendar"></i>
              <span class="date-time">{{article.date}}</span>
            </div>
            <div class="article-tag">
              <i class="tag-icon iconfont icon-tag-fill"></i>
              <div class="tag-item" v-for="tag in article.tags" @click.stop="handleClickTag(tag.name)" :style="`background-color: #${tag.color};border-right-color: #${tag.color}`" :key="tag.id">
                {{tag.name}}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
// import BLOGENTRIES from '@/data/blogs.json'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'ArchiveList',
  data () {
    return {}
  },
  props: {
    // articles: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   }
    // },
    // maxCount: {
    //   type: Number,
    //   default: 10
    // }
  },
  computed: {
    ...mapState({
      toolbar: state => state.app.toolbar,
      archives: state => state.app.archives
    })
  },
  methods: {
    handleClickTag (name) {
      this.openToolbar(`#${name}`)
      // this.setToolbarKeyword()
    },
    ...mapMutations({
      setToolbarKeyword: 'SET_TOOLBAR_KEYWORD'
    }),
    ...mapActions(['openToolbar'])
  }
}
</script>

<style scoped lang="scss">
.archive-list {
  background-color: #fff;
  margin-bottom: 30px;

  .archive-wrapper {
    position: relative;
    padding-right: 60px;
    border-bottom: 1px solid #eee;

    .archive-date {
      line-height: 36px;
      width: 200px;
      position: absolute;
      padding-top: 16px;
      z-index: 1;
      text-align: center;
      color: #666;
      font-weight: 700;
      font-size: 29px;
    }

    .archive-articles {
      position: relative;

      .archive-article {
        margin-left: 200px;
        padding: 20px 0 28px 0;
        border-bottom: 1px solid #eee;
        border-top: 1px solid #fff;
        position: relative;

        .archive-article-inner {
          position: relative;
          min-height: 36px;

          .article-date {
            color: #aaa;
            background: none;
            width: auto;
            font-size: 0;
            right: 0;
            top: 4px;
            z-index: 1;

            .date-icon {
              display: inline-block;
              vertical-align: middle;
              margin-right: 6px;
              font-size: 16px;
            }

            .date-time {
              display: inline-block;
              vertical-align: middle;
              font-size: 12px;
              line-height: 16px;
            }
          }

          .article-title {
            line-height: 30px;
            font-size: 16px;
            transition: color 0.3s;
            margin: 0;

            .article-link {
              color: #333;

              &:hover {
                color: #657b83;
              }
            }
          }

          .article-tag {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
          }

          .article-tag .tag-icon {
            color: #999;
            margin-right: 4px;
            font-size: 16px;
          }

          .article-tag .tag-item {
            font-weight: 400;
            font-size: 10px;
            color: #fff;
            height: 18px;
            line-height: 18px;
            padding: 0 5px 0 10px;
            position: relative;
            border-radius: 0 5px 5px 0;
            margin: 5px 9px 5px 8px;
            font-family: Menlo, Monaco, Andale Mono, lucida console, Courier New, monospace;
            cursor: pointer;
            &:hover {
              opacity: 0.8;
            }
            &:before {
              content: " ";
              width: 0;
              height: 0;
              position: absolute;
              top: 0;
              left: -18px;
              border: 9px solid transparent;
              border-right-color: inherit;
            }
            &:after {
              content: " ";
              width: 4px;
              height: 4px;
              background-color: #fff;
              border-radius: 4px;
              box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
              position: absolute;
              top: 7px;
              left: 2px;
            }
            &.color1 {
              background: #ff945c;
              &:before {
                border-right-color: #ff945c;
              }
            }
            &.color2 {
              background: #cc8167;
              &:before {
                border-right-color: #cc8167;
              }
            }
            &.color3 {
              background: #ba8f6c;
              &:before {
                border-right-color: #ba8f6c;
              }
            }
            &.color4 {
              background: #94635c;
              &:before {
                border-right-color: #94635c;
              }
            }
            &.color5 {
              background: #7b5d5f;
              &:before {
                border-right-color: #7b5d5f;
              }
            }
          }
        }

        &:first-child {
          border-top: none;
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  &.show {
    background: rgba(255, 255, 255, 0.3);
  }
}
@media screen and (max-width: 1200px) {
 .archive-list {
    .archive-wrapper {
      .archive-articles {
        .archive-article {
          .archive-article-inner {
            .article-date {
              // margin-bottom: 6px;
            }
          }
        }
      }
    }
 }
}

@media screen and (max-width: 1024px) {
  .archive-list {
    margin: 10px 10px 30px;
    background-color: #eaeaea;

    &:first-child {
      margin-top: 30px;
    }

    .archive-wrapper {
      margin-top: 10px;
      background-color: #fff;
      padding: 10px;

      &:first-child {
        margin-top: 0;
      }

      .archive-date {
        position: relative;
        padding-top: 0;
        text-align: left;
      }

      .archive-articles .archive-article {
        padding: 10px 0;
        margin-left: 0;
      }
    }
  }
}
</style>
