<template>
  <div class="sidebar-container">
    <div class="sidebar-overlay"></div>
    <div class="sidebar-header">
      <header class="header-innner">
        <a class="header-profilepic" href="javascript:;">
          <img class="header-avatar" src="@/assets/image/avatar.jpg" alt="">
        </a>
        <hgroup class="header-author">
          <h1 class="author-wrap">
            <a class="author-name" href="javascript:;">Csdoker</a>
          </h1>
        </hgroup>
        <p class="header-subtitle">每一位少年都有一颗屠龙的心</p>
        <nav class="header-menu">
          <ul class="menu-list">
            <li class="menu-item" v-for="route in getRoute()" :key="route.path">
              <router-link :to="{ name: route.name, params: {} }" class="menu-link" :key="route.path">{{ route.meta.title }}</router-link>
            </li>
          </ul>
        </nav>
        <nav class="header-smart-menu">
          <a class="smart-menu-link" href="javascript:;">搜索</a>
          <a class="smart-menu-link" href="javascript:;">友链</a>
        </nav>
        <nav class="header-nav">
          <div class="social">
            <a class="social-link" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=758371536&site=qq&menu=yes" title="qq">
              <i class="icon iconfont icon-QQ-circle-fill"></i>
            </a>
            <a class="social-link" target="_blank" href="https://github.com/csdoker" title="github">
              <i class="icon iconfont icon-github-fill"></i>
            </a>
            <a class="social-link" target="_blank" href="https://www.zhihu.com/people/csdoker" title="zhihu">
              <i class="icon iconfont icon-zhihu-circle-fill"></i>
            </a>
          </div>
        </nav>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Siderbar',
  computed: {
    routes () {
      return this.$router.options.routes
    }
  },
  methods: {
    getRoute () {
      return this.routes.filter(item => !item.hidden)[0].children
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  position: fixed;
  width: 300px;
  height: 100%;
  background-color: #fff;
  opacity: 1;
  transition: all .2s ease-in;
  z-index: 999;
  .sidebar-overlay {
    position: absolute;
    width: 100%;
    height: 180px;
    background-color: #4d4d4d;
  }
  .sidebar-header {
    width: 76%;
    text-align: center;
    margin: 112px auto 0;
    .header-innner {
      position: relative;
      width: 100%;
      .header-profilepic {
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        text-align: center;
        color: #696969;
        position: relative;
        width: 128px;
        height: 128px;
        margin: 0 auto;
        border: 5px solid #fff;
        border-radius: 300px;
        overflow: hidden;
        background-color: #88acdb;
        transition: all .2s ease-in;
        .header-avatar {
          border-radius: 300px;
          opacity: 1;
          transition: all .2s ease-in;
          border: 0;
          vertical-align: middle;
          max-width: 100%;
        }
      }
      .header-author {
        display: block;
        .author-wrap {
          text-align: center;
          margin: .67em 0;
          font-family: Roboto,serif;
          font-size: 30px;
          transition: .3s;
          line-height: 2;
          font-weight: 400;
          .author-name {
            color: #696969;
            &:hover {
              color: #b0a0aa;
            }
          }
        }
      }
      .header-subtitle {
        text-align: center;
        color: #999;
        font-size: 14px;
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: block;
        margin-bottom: 20px;
      }
      .header-menu {
        font-weight: 300;
        line-height: 32px;
        text-transform: uppercase;
        float: none;
        min-height: 150px;
        text-align: center;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        margin-bottom: 20px;
        .menu-list {
          .menu-item {
            .menu-link {
              font-size: 14px;
              min-width: 300px;
              color: #696969;
              &:hover {
                color: #b0a0aa;
              }
            }
          }
        }
      }
      .header-smart-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        margin-bottom: 30px;
        .smart-menu-link {
          color: #696969;
          margin: 0 6px;
          &:hover {
            color: #b0a0aa;
          }
        }
      }
      .header-nav {
        width: 100%;
        transition: -webkit-transform .3s ease-in;
        transition: transform .3s ease-in;
        transition: transform .3s ease-in, -webkit-transform .3s ease-in;
        .social {
          display: flex;
          align-items: center;
          justify-content: center;
          .social-link {
            margin: 0 8px;
            transition: .3s;
            opacity: .7;
            .icon {
              font-size: 30px;
              &.icon-QQ-circle-fill {
                color: #34baad;
              }
              &.icon-github-fill {
                color: #afb6ca;
              }
              &.icon-zhihu-circle-fill {
                color: #0078d8;
              }
            }
            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }
  &.show {
    box-shadow: 0 0 6px 0 rgba(0,0,0,.75);
  }
}
@media screen and (max-width: 800px) {
  .sidebar-container {
    display: none
  }
}
</style>
