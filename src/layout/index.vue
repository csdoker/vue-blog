<template>
  <div class="app-wrapper">
    <sidebar />
    <app-main />
  </div>
</template>

<script>
import { Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {

  }
</style>
