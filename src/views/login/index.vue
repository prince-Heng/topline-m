<template>
  <div class="login-container">
    <van-nav-bar title="登陆" />
    <!-- vee-validate验证插件的具体使用 -->
    <!-- 1.使用ValidationObserver把需要验证的整个表单包起来 -->
    <!-- 2.使用ValidationProvider把需要校验的具体表单元素包起来,例如  input -->
    <!-- 3.通过ValidationProvider配置具体的验证规则
      name      配置验证字段名
      rules     验证规则
      v-solt="{errors}" 获取错误消息
    -->
    <ValidationObserver ref="form">
      <ValidationProvider name="手机号" rules="required|mobile">
        <van-field
          v-model="user.mobile"
          required
          clearable
          placeholder="请输入手机号"
          label="手机号"
          left-icon="phone-circle"
        ></van-field>
      </ValidationProvider>
      <ValidationProvider name="验证码" rules="required|code">
        <van-field v-model="user.code" label="验证码" left-icon="more"
         placeholder="请输入验证码" required>
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000*60"
            format="ss 秒"
            @finish="isCountDownShow=false"
          />
          <van-button v-else slot="button" size="small" @click="getCode"
          type="primary">发送验证码</van-button>
        </van-field>
      </ValidationProvider>
    </ValidationObserver>
    <div class="btn-wrap">
      <van-button type="info" @click="onLogin">登陆</van-button>
    </div>
  </div>
</template>

<script>
import { login, getVerification } from '@/api/user'
import { validate } from 'vee-validate'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false
    }
  },
  methods: {
    // 定义方法，发送登录请求
    async onLogin () {
      // 1. 获取请求数据
      const user = this.user
      // 2.表单验证
      // 获取验证信息,通过this.$refs.form
      const success = await this.$refs.form.validate()
      // 如果验证失败,提示错误信息,停止表单提交
      if (!success) {
        // console.log('验证失败')
        // 定时器是因为 获取验证失败的结果有延迟,插件原因
        setTimeout(() => {
          const errors = this.$refs.form.errors
          const item = Object.values(errors).find(item => {
            return item[0]
          })
          this.$toast(item[0])
        }, 200)
        return
      }
      // 表单验证后需要添加loading效果
      this.$toast.loading({
        duration: 0, // toast持续时间 0  代表一直持续
        message: '登陆中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 3.发送请求
      try {
        const res = await login(user)
        this.$store.commit('setUser', res.data.data)
        console.log(res)
        // 成功提示
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log('登陆失败')
        // 失败提示
        this.$toast.fail('登陆失败')
      }
    },
    // 发送验证码
    async getCode () {
      // 1.获取手机号
      const { mobile } = this.user
      // 2.验证手机号是否有效
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 如果验证失败,返回信息,停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      // 3.发送请求

      try {
        // 显示倒计时组件
        this.isCountDownShow = true
        await getVerification(mobile)
      } catch (err) {
        console.log(err)
        // 发送失败时关闭倒计时
        this.isCountDownShow = false
        console.log(err)

        if (err.response.status === 429) {
          return this.$toast('请勿频繁操作')
        }
        this.$toast('发送失败')
      }
    }
  }
}

</script>

<style scoped lang='less'>
.btn-wrap {
  padding: 27px 16px;
  .van-button {
    width: 100%;
    background-color: #6db4fb;
  }
}
</style>
