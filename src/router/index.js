import Vue from 'vue'
import Router from 'vue-router'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import getPageTitle from '@/utils/get-page-title'

/* Layout */
import Layout from '@/layout'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

Vue.use(Router)

const routes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '主页' }
      },
      {
        path: 'archive',
        name: 'Archive',
        component: () => import('@/views/archive/index'),
        meta: { title: '归档' }
      },
      {
        path: 'photo',
        name: 'Photo',
        component: () => import('@/views/photo/index'),
        meta: { title: '相册' }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/about/index'),
        meta: { title: '关于' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
