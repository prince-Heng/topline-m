<template>
  <div class="login-container">
    <van-nav-bar title="登陆"/>
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        required
        clearable
        placeholder="请输入手机号"
        label="手机号"
        left-icon="phone-circle"
      />
      <van-field  v-model="user.code" label="验证码"  left-icon="more" placeholder="请输入验证码" required >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn-wrap">
      <van-button type="info" @click="onLogin">登陆</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    // 定义方法，发送登录请求
    async onLogin () {
      // 1. 获取请求数据
      const user = this.user
      // 2.表单验证

      // 表单验证后需要添加loading效果
      this.$toast.loading({
        duration: 0, // toast持续时间 0  代表一直持续
        message: '登陆中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 3.发送请求
      try {
        const res = await login(user)
        console.log(res)
        // 成功提示
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log('登陆失败')
        // 失败提示
        this.$toast.fall('登陆失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.btn-wrap{
padding: 27px 16px;
.van-button{
  width: 100%;
  background-color: #6db4fb;
}
}
</style>