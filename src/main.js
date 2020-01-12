import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 跟组件中引入vant组件模块
import './utils/register-vant'

// 加载全局样式
import './style/index.less'

// 注册rem适配插件（postcss-pxtorem）
import 'amfe-flexible'

// 加载表单验证插件初始化配置
import './utils/validation'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
