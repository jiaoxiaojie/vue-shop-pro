import Vue from 'vue'
import App from './App'
import router from './router'

// 引入global.css全局样式控制文件
import './assets/css/global.css'

// 引入icon文件
import './assets/fonts/iconfont.css'

// 引入element-ui组件模块
import ElementUI from 'element-ui'

// 引入axios
import axios from 'axios'
// axios配置根地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 把axios配置给Vue的$http成员
Vue.prototype.$http = axios
// 把element注册给vue
Vue.use(ElementUI)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
