<template>
  <!-- <transition name="fade" enter-active-class="animated bounceInLeft fast" leave-active-class="animated bounceOutLeft fast">
  </transition> -->
  <div
    class="toolbar-container"
    @click.stop
    :class="{ show: toolbar.opened, hide: !toolbar.opened }"
  >
    <div class="toolbar-close">
      <i class="close-icon iconfont icon-close-circle" @click="closeToolbar"></i>
    </div>
    <div class="toolbar-headar">
      <ul class="headar-menu">
        <li class="menu-item" @click="handleSwitchTab(0)">
          <a
            href="javascript:;"
            class="item-link"
            :class="{ active: toolbar.tabs[0] }"
            >搜索</a
          >
        </li>
        <li class="menu-item" @click="handleSwitchTab(1)">
          <a
            href="javascript:;"
            class="item-link"
            :class="{ active: toolbar.tabs[1] }"
            >友链</a
          >
        </li>
      </ul>
    </div>
    <div class="toolbar-body">
      <section v-show="toolbar.tabs[0]" class="section-archive">
        <div class="archive-search">
          <input
            type="text"
            class="search-input"
            v-model="keyword"
            placeholder="find something..."
          />
          <i class="search-icon iconfont icon-search"></i>
        </div>
        <div class="archive-tag">
          <div class="tag-toggle">
            <span class="tag-wording">tag:</span>
            <input @click="toggleTag" type="checkbox" class="tag-checkbox" />
          </div>
          <ul class="tag-list" v-show="isShowTags">
            <li
              class="tag-item"
              @click="handleTagClick(tag.name)"
              v-for="(tag, index) in allTags"
              :key="index"
            >
              <a
                href="javascript:;"
                class="tag-link"
                :style="`background-color: #${tag.color};border-right-color: #${tag.color}`"
                >{{ tag.name }}</a
              >
            </li>
            <div class="clearfix"></div>
          </ul>
        </div>
        <ul class="archive-list">
          <li
            class="archive-item"
            v-for="archive in toolbar.archives"
            :key="archive.id"
          >
            <a href="javascript:;" class="item-title">
              <i class="title-icon iconfont icon-quote-left"></i>
              <a
                :title="archive.name"
                class="title-name"
                @click="handleTitleClick(archive.name)"
              >
                {{ archive.name }}
              </a>
            </a>
            <div class="item-info">
              <!-- <p class="info-time"> -->
              <i class="time-icon iconfont icon-calendar"></i>
              <span class="time-date">{{ archive.date }}</span>
              <!-- </p> -->
              <!-- <p class="info-tag"> -->
              <i class="tag-icon iconfont icon-tag-fill"></i>
              <span
                class="tag-item"
                @click="handleTagClick(tag)"
                v-for="(tag, index) in archive.tags"
                :key="index"
              >
                #{{ tag }}
              </span>
              <!-- </p> -->
            </div>
          </li>
        </ul>
      </section>
      <section v-show="toolbar.tabs[1]" class="section-friends">
        <ul class="friends-list">
          <li class="friends-item">
            <a href="javascript:;" target="_blank" class="friend-link">
              <i class="link-icon iconfont icon-quote-left"></i>
              <span class="link-name">测试测试测试</span>
            </a>
          </li>
          <li class="friends-item">
            <a href="javascript:;" target="_blank" class="friend-link">
              <i class="link-icon iconfont icon-quote-left"></i>
              <span class="link-name">测试测试测试</span>
            </a>
          </li>
          <li class="friends-item">
            <a href="javascript:;" target="_blank" class="friend-link">
              <i class="link-icon iconfont icon-quote-left"></i>
              <span class="link-name">测试测试测试</span>
            </a>
          </li>
          <li class="friends-item">
            <a href="javascript:;" target="_blank" class="friend-link">
              <i class="link-icon iconfont icon-quote-left"></i>
              <span class="link-name">测试测试测试</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
// import BLOGENTRIES from '@/data/blogs.json'
import { mapState, mapMutations, mapActions } from 'vuex'
// import { getAllArticles, getBlogEntries } from '@/api/article'
// import _ from 'lodash'

export default {
  name: 'Toolbar',
  data () {
    return {
      // tags: [],
      archives: [],
      isShowTags: false
      // result: []
    }
  },
  computed: {
    keyword: {
      get () {
        return this.toolbar.keyword
      },
      set (newVal) {
        this.setToolbarKeyword(newVal)
      }
    },
    // articles () {
    //   return BLOGENTRIES.sort((a, b) => b.id - a.id)
    // },
    ...mapState({
      toolbar: state => state.app.toolbar,
      allTags: state => state.app.allTags
    })
  },
  watch: {
    keyword (val) {
      const isTag = val.substr(0, 1) === '#'
      if (isTag) {
        this.setToolbarArchives(this.toolbar.list.filter(archive => archive.tags.includes(val.substr(1))))
      } else {
        this.setToolbarArchives(this.toolbar.list.filter(archive => archive.name.indexOf(val) > -1))
      }
    }
  },
  methods: {
    // async getAllTagsData () {
    //   const articles = await this.getAllArticles()
    //   const tags = []
    //   articles.forEach(article => {
    //     article.labels.forEach(tag => {
    //       if (tags.filter(item => item.name === tag.name).length === 0) {
    //         tags.push({
    //           name: tag.name,
    //           color: tag.color
    //         })
    //       }
    //     })
    //   })
    //   this.setToolbarAllTags(tags)
    // },
    // async getArchivesData () {
    //   const blogEntries = await this.getBlogEntries()
    //   this.result = blogEntries
    //   this.archives = blogEntries
    // },
    handleSwitchTab (index) {
      this.toggleTabs(index)
    },
    toggleTag () {
      this.isShowTags = !this.isShowTags
    },
    handleTagClick (tag) {
      this.setToolbarKeyword(`#${tag}`)
    },
    handleTitleClick (title) {
      if (this.$route.params.name !== title) {
        this.closeToolbar()
        this.$router.push({ name: 'Article', params: { name: title } })
      }
    },
    ...mapMutations({
      toggleTabs: 'TOGGLE_TABS',
      setToolbarKeyword: 'SET_TOOLBAR_KEYWORD',
      closeToolbar: 'CLOSE_TOOLBAR',
      setToolbarAllTags: 'SET_TOOLBAR_ALL_TAGS',
      setToolbarArchives: 'SET_TOOLBAR_ARCHIVES'
    }),
    ...mapActions(['getBlogEntries', 'getAllArticles'])
  },
  created () {
    // this.getArchivesData()
    // this.getAllTagsData()
  }
}
</script>

<style lang="scss" scoped>
.toolbar-container {
  position: fixed;
  width: 360px;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  padding: 0;
  opacity: 0;
  -webkit-overflow-scrolling: touch;
  // transition: all 0.2s ease-in;

  .toolbar-close {
    display: none;
  }

  .toolbar-headar {
    display: none;
  }

  .toolbar-body {
    height: 100%;
    color: #e5e5e5;
    overflow: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .section-archive {
      color: #e5e5e5;
      overflow: hidden;
      overflow-y: auto;

      .archive-search {
        position: relative;
        padding: 20px;

        .search-input {
          width: 100%;
          color: #fff;
          background: none;
          border: none;
          border-bottom: 2px solid #fff;
          font-family: Roboto, serif;
          font-size: 16px;
          line-height: 28px;
          -webkit-user-modify: read-write-plaintext-only;
          -webkit-appearance: none;
          border-radius: 0;

          &::-webkit-input-placeholder {
            color: #ededed;
          }
        }

        .search-icon {
          position: absolute;
          right: 20px;
          font-size: 20px;
          line-height: 30px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s ease-in;
        }
      }

      .archive-tag {
        margin-bottom: 10px;

        .tag-toggle {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 20px;
          margin-bottom: 20px;

          .tag-wording {
            font-size: 18px;
            line-height: 24px;
            margin-right: 10px;
          }

          .tag-checkbox {
            width: 42px;
            height: 16px;
            border: 1px solid #bdcabc;
            position: relative;
            display: flex;
            z-index: 2;
            background: 0 0;
            -webkit-appearance: none;
            outline: 0;

            &:before {
              content: '';
              width: 100%;
              height: 100%;
              background-color: #fdfdfd;
              border-radius: 20px;
              cursor: pointer;
              box-sizing: content-box;
              box-shadow: inset 0 0 0 0 #dfdfdf;
              transition: border 0.4s, box-shadow 0.4s;
              background-clip: content-box;
            }

            &:after {
              content: '';
              width: 16px;
              height: 16px;
              position: absolute;
              top: 7px;
              left: 0;
              -webkit-transform: translateY(-50%);
              border-radius: 100%;
              background-color: #91c0f1;
              box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
              transition: left 0.2s;
              cursor: pointer;
            }

            &:checked {
              &:before {
                border-color: #64bd63;
                box-shadow: inset 0 0 0 0.16rem #64bd63;
                background-color: #64bd63;
                transition: border 0.4s, box-shadow 0.4s, background-color 1.2s;
              }

              &:after {
                left: 28px;
                background: #fff;
              }
            }
          }
        }

        .tag-list {
          display: flex;
          flex-wrap: wrap;
          margin: 0 10px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease-in;

          .tag-item {
            .tag-link {
              display: flex;
              align-items: center;
              font-weight: 400;
              text-decoration: none;
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

              &:hover {
                opacity: 0.8;
              }

              &:before {
                content: ' ';
                width: 0;
                height: 0;
                position: absolute;
                top: 0;
                left: -18px;
                border: 9px solid transparent;
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
        }
      }

      .archive-list {
        color: rgba(77, 77, 77, 0.75);
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;

        .archive-item {
          padding: 10px 20px;
          border-bottom: 1px dotted #dcdcdc;

          .item-title {
            display: inline-flex;
            align-items: center;
            color: #fffff8;
            text-shadow: 1px 1px rgba(77, 77, 77, 0.25);

            .title-icon {
              margin-right: 10px;
              color: #fffdd8;
            }

            .title-name {
              font-size: 16px;
              line-height: 28px;
              // width: calc(100% - 26px);
              // overflow: hidden;
              // text-overflow: ellipsis;
              // white-space: nowrap;
              color: #fff;
            }
          }

          .item-info {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            .info-time {
              display: inline-block;
              vertical-align: middle;
              font-size: 0;
            }

            .time-icon {
              color: #fffdd8;
              font-size: 16px;
              margin-right: 4px;
            }

            .time-date {
              margin-right: 10px;
              color: #fffdd8;
              line-height: 24px;
              font-size: 12px;
            }

            .info-tag {
              display: inline-block;
              vertical-align: middle;
              font-size: 0;
            }

            .tag-icon {
              color: #fffdd8;
              font-size: 16px;
              margin-right: 4px;
            }

            .tag-item {
              color: #fffdd8;
              line-height: 24px;
              font-size: 12px;
              margin-right: 6px;
              cursor: pointer;

              &:hover {
                color: #fff;
              }
            }
          }

          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }

    .section-friends {
      height: 100%;
      color: #e5e5e5;
      overflow: hidden;
      overflow-y: auto;
      padding-top: 30px;

      .friends-list {
        // margin-top: 10px;
        color: rgba(77, 77, 77, 0.75);
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
        overflow-y: auto;

        .friends-item {
          padding: 10px 20px;
          border-bottom: 1px dotted #dcdcdc;

          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }

          .friend-link {
            display: inline-flex;
            align-items: center;
            color: #fffff8;
            text-shadow: 1px 1px rgba(77, 77, 77, 0.25);
            line-height: 28px;
            font-size: 16px;

            .link-icon {
              margin-right: 10px;
              color: #fffdd8;
            }

            // .link-name {
            //   width: calc(100% - 26px);
            //   overflow: hidden;
            //   white-space: nowrap;
            //   text-overflow: ellipsis;
            // }
          }
        }
      }
    }
  }

  // &.show {
  //   transform: translateX(300px);
  //   opacity: 1;
  //   // left: 300px;
  // }

  &.show {
    opacity: 1;
    transform: translateX(300px);
    // transition: all 0.2s ease-in;
    // -webkit-animation-duration: 0.8s;
    // animation-duration: 0.8s;
    // -webkit-animation-fill-mode: both;
    // animation-fill-mode: both;
    // -webkit-animation-name: smallLeftIn;
    // animation-name: smallLeftIn;
  }

  &.hide {
    z-index: 0;
    // opacity: 1;
    transform: translateX(0);
    // transition: all 0.2s ease-in;
    // -webkit-animation-duration: 0.8s;
    // animation-duration: 0.8s;
    // -webkit-animation-fill-mode: both;
    // animation-fill-mode: both;
    // -webkit-animation-name: smallleftOut;
    // animation-name: smallleftOut;
  }
}
@media screen and (max-width: 1366px) {
  .toolbar-container {
    width: calc(100% - 300px);
    .toolbar-close {
      display: flex;
      align-items: center;
      justify-content: center;
      .close-icon {
        cursor: pointer;
        color: #fff;
        font-size: 30px;
      }
    }
    .toolbar-body {
      overflow: unset;
      overflow-y: unset;
    }
    &.show {
      overflow-y: auto;
    }
  }
}
@media screen and (max-width: 1024px) {
  .toolbar-container {
    width: 100%;
    position: absolute;

    .toolbar-headar {
      display: block;
      // position: fixed;
      // left: 0;
      width: 100%;
      // z-index: 9999;
      // height: auto;
      margin: 10px 0 20px;

      .headar-menu {
        width: 70%;
        border-color: #fff;
        text-align: center;
        cursor: default;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin: 0 auto;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        position: relative;
        z-index: 1;
        border: 1px solid #a0a0a0;
        border-radius: 3px;

        .menu-item {
          width: 50%;

          .item-link {
            color: #fff;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;

            &.active {
              background-color: #81b5cc;
              color: #eaeaea;
            }
          }
        }
      }
    }

    .toolbar-body {
      height: auto;
      .section-friends .friends-list .friends-item {
        padding: 5px 20px;
      }
    }

    &.show {
      animation: none;
      opacity: 1;
      overflow-y: auto;
      transform: translateX(0);
      // -webkit-animation-duration: 0.6s;
      // animation-duration: 0.6s;
      // -webkit-animation-name: bounceInLeft;
      // animation-name: bounceInLeft;
    }
    &.hide {
      animation: none;
      display: none;
    }
  }
}
</style>
