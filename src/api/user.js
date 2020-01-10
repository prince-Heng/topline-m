// 用户相关请求接口模块
import request from '@/utils/request'

export const login = data => {
  return request({
    // 请求方法
    method: 'POST',

    // 请求地址
    url: '/app/v1_0/authorizations',

    // 请求头
    // headers: {
    // //   'Content-Type': 'application/json'
    // // axios会默认发送该请求头数据
    // },

    // Query参数
    // params: {},

    // body请求体参数
    data
  })
}
