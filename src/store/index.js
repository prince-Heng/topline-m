import Vue from 'vue'
import Vuex from 'vuex'
// 引入本地储存方法
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: null
    // user: JSON.parse(window.localStorage.getItem('user'))
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止数据刷新丢失, 需要放到本地存储, 使数据持久化
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
