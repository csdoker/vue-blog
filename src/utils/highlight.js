// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import hljs from 'highlight.js/lib/highlight'
import 'highlight.js/styles/atom-one-dark.css'

// 只加载常用语法
import javascript from 'highlight.js/lib/languages/javascript'
// import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
// import scss from 'highlight.js/lib/languages/scss'
// import markdown from 'highlight.js/lib/languages/markdown'

hljs.registerLanguage('javascript', javascript)
// hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
// hljs.registerLanguage('scss', scss)
// hljs.registerLanguage('markdown', markdown)

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
