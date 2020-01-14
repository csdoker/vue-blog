<template>
  <div class="toolbar-container">

  </div>
</template>

<script>
import BLOGENTRIES from '@/data/blogs.json'

export default {
  name: 'Toolbar',
  data () {
    return {
      tags: [],
      archives: []
    }
  },
  methods: {
    getTags () {
      this.archives.forEach(archive => {
        archive.tags.forEach(tag => {
          this.tags.push(tag)
        })
      })
      this.tags = [...new Set(this.tags)]
      this.tags = this.tags.map(tag => ({
        name: tag,
        color: Math.round(1 + Math.random() * 4)
      }))
      console.log(this.tags)
    },
    getArchives () {
      this.archives = BLOGENTRIES.sort((a, b) => b.id - a.id)
      console.log(this.archives)
    }
  },
  created () {
    this.getArchives()
    this.getTags()
  }
}
</script>

<style lang="scss" scoped>

</style>
