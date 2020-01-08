import Vue from 'vue'

import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import '@/styles/markdown.css'

import App from './App.vue'
import router from './router'
import store from './store'

import Highlight from '@/utils/highlight.js'
Vue.use(Highlight)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
