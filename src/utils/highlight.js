// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

// const Highlight = {}
// Highlight.install = function (Vue, options) {
//   Vue.directive('highlight', function (el) {
//     const blocks = el.querySelectorAll('pre code')
//     blocks.forEach((block) => {
//       hljs.highlightBlock(block)
//     })
//   })
// }

// export default Highlight

export const highlightCode = () => {
  const blocks = document.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
}
