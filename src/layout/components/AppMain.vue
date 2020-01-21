<template>
  <div class="app-main" :class="{ show: toolbar.opened, hide: !toolbar.opened }">
    <navbar />
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from './Navbar'

export default {
  name: 'AppMain',
  components: {
    Navbar
  },
  computed: {
    key () {
      return this.$route.path
    },
    ...mapState({
      toolbar: state => state.app.toolbar
    })
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  position: absolute;
  right: 0;
  min-height: 100%;
  left: 300px;
  // transition: all 0.2s ease-in;
  background-color: #eaeaea;
  // &.show {
  //   // transform: translateX(360px);
  //   left: 660px;
  // }
  &.show {
    background: none;
    opacity: .9;
    left: 630px;
    // transform: translateX(330px);
  //   -webkit-animation-duration: .8s;
  //   animation-duration: .8s;
  //   -webkit-animation-fill-mode: both;
  //   animation-fill-mode: both;
  //   -webkit-animation-name: leftIn;
  //   animation-name: leftIn;
  }
  // &.hide {
  //   -webkit-animation-duration: .8s;
  //   animation-duration: .8s;
  //   -webkit-animation-name: leftOut;
  //   animation-name: leftOut;
  // }
}
@media screen and (max-width: 1366px) {
  .app-main {
    &.show {
      display: none;
    }
  }
}
@media screen and (max-width: 800px) {
  .app-main {
    display: block;
    position: relative;
    left: 0;

    &.show {
      animation: none;
      opacity: 0;
      transform: translateX(0);
      left: 0;
    }
    &.hide {
      animation: none;
      opacity: 1;
    }
  }
}
</style>
