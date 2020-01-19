<template>
  <div class="app-wrapper" @click="closeToolbar" :class="{show: toolbar.opened}">
    <app-canvas />
    <sidebar />
    <toolbar />
    <app-main />
  </div>
</template>

<script>
import { AppCanvas, Sidebar, Toolbar, AppMain } from './components'
// import BLOGENTRIES from '@/data/blogs.json'
import { mapState, mapMutations } from 'vuex'
import { getBlogEntries } from '@/api/article'

export default {
  name: 'Layout',
  components: {
    AppCanvas,
    Sidebar,
    Toolbar,
    AppMain
  },
  computed: {
    ...mapState({
      toolbar: state => state.app.toolbar
    })
  },
  methods: {
    ...mapMutations({
      closeToolbar: 'CLOSE_TOOLBAR',
      setBlogEntries: 'SET_BLOGENTRIES'
    })
  },
  created () {
    getBlogEntries().then(response => {
      this.setBlogEntries(response.sort((a, b) => b.id - a.id))
    })
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    &.show {
      background: linear-gradient(200deg, #a0cfe4, #e8c37e);
    }
  }
  @media screen and (max-width: 800px) {
    .app-wrapper {
      &.show {
        overflow-y: hidden;
      }
    }
  }
</style>
