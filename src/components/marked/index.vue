<template>
  <div v-html="compiledMarkdown" v-highlight></div>
</template>

<script>
import marked from 'marked'
marked.setOptions({
  renderer: new marked.Renderer(),
  // highlight: function (code) {
  //   return require('highlight.js').highlightAuto(code).value
  // },
  pedantic: false,
  gfm: true,
  breaks: true,
  // sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

export default {
  name: 'MarkedContent',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  // data () {
  //   return {
  //     compiledMarkdown: ''
  //   }
  // },
  // watch: {
  //   content (val) {
  //     this.compiledMarkdown = marked(val)
  //   }
  // }
  computed: {
    compiledMarkdown () {
      // return marked(this.content, { sanitize: true })
      return marked(this.content)
    }
  }
}
</script>
