import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
Vue.use(Router)
var router = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [{ path: '/welcome', component: Welcome }]
    }
  ]
})
// 给路由设置“导航守卫”
// 在守卫中对token进行监听，有token就让执行，否则就跳转登录
router.beforeEach((to, from, next) => {
  // 请求login就直接通过
  if (to.path === '/login') {
    return next()
  }
  // 请求非login就判断token
  var token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  // 请继续执行
  next()
})
export default router
