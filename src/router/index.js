import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    //  @是是如此、目录的别名，这是vue CLI项目中特殊提供的
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'Tabbar',
    component: () => import('@/views/tag-bar')
  }
]

const router = new VueRouter({
  routes
})

export default router
