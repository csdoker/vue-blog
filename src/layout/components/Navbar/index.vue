<template>
  <div class="navbar-container">
    <div class="nav-overlay"></div>
    <div class="open-button" @click.stop="openToolbar">
      <i class="icon iconfont icon-menu"></i>
    </div>
    <header class="navbar-wrapper">
      <div class="profilepic">
        <img class="avatar" src="@/assets/image/avatar.jpg" alt="">
      </div>
      <hgroup class="author">
        <h1 class="author-name">Csdoker</h1>
      </hgroup>
      <p class="subtitle">
        <i class="subtitle-icon iconfont icon-quote-left"></i>
        <span>每一位少年都有一颗屠龙的心</span>
        <i class="subtitle-icon iconfont icon-quote-right"></i>
      </p>
      <nav class="social">
        <a class="social-link" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=758371536&site=qq&menu=yes" title="qq">
          <i class="icon iconfont icon-QQ-circle-fill"></i>
        </a>
        <a class="social-link" target="_blank" href="https://github.com/csdoker" title="github">
          <i class="icon iconfont icon-github-fill"></i>
        </a>
        <a class="social-link" target="_blank" href="https://www.zhihu.com/people/csdoker" title="zhihu">
          <i class="icon iconfont icon-zhihu-circle-fill"></i>
        </a>
      </nav>
      <nav class="menu">
        <ul class="menu-list">
          <li class="menu-item" v-for="route in getRoute()" :key="route.path">
            <router-link :to="{ name: route.name, params: {} }" class="menu-link" :key="route.path">{{ route.meta.title }}</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    routes () {
      return this.$router.options.routes
    }
  },
  methods: {
    getRoute () {
      return this.routes.filter(item => !item.hidden)[0].children.filter(item => !item.hidden)
    },
    ...mapMutations({
      openToolbar: 'OPEN_TOOLBAR'
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar-container {
  display: none;
}
@media screen and (max-width: 1024px) {
  .navbar-container {
    display: block;

    .nav-overlay {
      position: absolute;
      width: 100%;
      height: 110px;
      z-index: 2;
      background-color: #4d4d4d;
    }

    .open-button {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      top: 0;
      z-index: 4;

      &:hover {
        background-color: #444;
      }

      .icon {
        font-size: 24px;
        color: #fff;
      }
    }

    .navbar-wrapper {
      padding: 10px 0 20px;

      .profilepic {
        position: relative;
        display: block;
        z-index: 100;
        border: 5px solid #fff;
        border-radius: 300px;
        width: 128px;
        height: 128px;
        margin: 0 auto;
        overflow: hidden;
        background-color: #88acdb;
        -webkit-transition: all 0.2s ease-in;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        text-align: center;

        .avatar {
          border: 0;
          vertical-align: middle;
          max-width: 100%;
        }
      }

      .author .author-name {
        text-align: center;
        margin: 0;
        position: relative;
        z-index: 2;
        color: #424242;
        font-family: Roboto, serif;
        font-size: 30px;
        transition: 0.3s;
        line-height: 60px;
        font-weight: 400;
      }

      .subtitle {
        text-align: center;
        color: #999;
        font-size: 14px;
        line-height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        .subtitle-icon {
          font-size: 20px;
          margin: 0 10px;
          color: #d0d0d0;
        }
      }

      .social {
        position: relative;
        width: 100%;
        transition: transform 0.3s ease-in;
        transition: -webkit-transform 0.3s ease-in;
        transition: transform 0.3s ease-in, -webkit-transform 0.3s ease-in;
        text-align: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin-bottom: 10px;

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

      .menu {

        .menu-list {
          width: 70%;
          text-align: center;
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
            width: 25%;
            border-left: 1px solid #a0a0a0;

            &:first-child {
              border-left: 0;
            }

            .menu-link {
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: block;
              color: #a0a0a0;
            }
          }
        }
      }
    }
  }
}
</style>
