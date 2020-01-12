// 此模块专门用来封装axios请求
// 引入axios
import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
// 自定义配置axios的新实例，将根地址封装
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// transformResponse是axios提供的API
// 支持用户自己决定如何转换后端返回的数据
request.defaults.transformResponse = [
  function (data) {
    try {
      // 正常同通过return JSON.parse(data)对数据进行转换
      // 但是转化完成的数据可能超出安全数据长度
      // 因此我们定制使用第三包来转化
      return jsonBig.parse(data)
    } catch (err) {
      // 转换失败返回一个空对象
      return {}
    }
  }
]

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default request
