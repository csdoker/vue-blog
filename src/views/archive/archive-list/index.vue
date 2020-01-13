<template>
  <div class="archive-list">
    <section class="archive-wrapper" v-for="archive in archives" :key="archive.date">
      <a href="javascript:;" class="archive-date">{{ archive.date }}</a>
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
              <div class="tag-item" href="javascript:;" v-for="tag in article.tags" :class="`color${tag.color}`" :key="tag.name">
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
import BLOGENTRIES from '@/data/blogs.json'
// import _ from 'lodash'

export default {
  name: 'ArchiveList',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    maxCount: {
      type: Number,
      default: 10
    }
  },
  computed: {
    articles () {
      const start = (this.currentPage - 1) * this.maxCount
      const end = start + this.maxCount
      return BLOGENTRIES.sort((a, b) => b.id - a.id).slice(start, end)
    },
    archives () {
      const archives = this.getArchives()
      archives.forEach(archive => {
        archive.articles.forEach(article => {
          article.tags = article.tags.map(tag => ({
            name: tag,
            color: Math.round(1 + Math.random() * 4)
          }))
          console.log(article.tags)
        })
      })
      return archives
    }
  },
  methods: {
    getArchives () {
      let chunkResult = this.chunkArr(this.articles, this.maxCount)
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
    }
  },
  created () {
    // console.log(this.archives)
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

@media screen and (max-width: 800px) {
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
      }

      .archive-articles .archive-article {
        padding: 10px 0;
        margin-left: 0;
      }
    }
  }
}
</style>
