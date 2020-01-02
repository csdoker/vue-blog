import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'

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
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '主页' }
    }]
  },
  {
    path: '/archive',
    component: Layout,
    redirect: '/archive/index',
    children: [
      {
        path: 'index',
        name: 'Archive',
        component: () => import('@/views/archive/index'),
        meta: { title: '归档' }
      }
    ]
  },
  {
    path: '/photo',
    component: Layout,
    redirect: '/photo/index',
    children: [
      {
        path: 'index',
        name: 'Photo',
        component: () => import('@/views/photo/index'),
        meta: { title: '相册' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const router = new Router({
  routes
})

export default router
