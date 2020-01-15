<template>
  <div class="app-main" :class="{show: toolbar.opened}">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppMain',
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
  background-color: #eaeaea;
  left: 300px;
  transition: all 0.2s ease-in;
  &.show {
    transform: translateX(360px);
  }
}
@media screen and (max-width: 800px) {
  .app-main {
    position: relative;
    left: 0;
  }
}
</style>
