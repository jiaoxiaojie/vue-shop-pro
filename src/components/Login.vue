<template>
  <div id="login-container">
    <div id="login-box">
      <div id="logo-box">
        <img src="../assets/img/logo.png" alt>
      </div>
      <el-form :rules="loginFormRules" ref="loginFormref" :model="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" @click="login" v-model="loginForm.password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :offset="15">
            <el-button @click="login" type="primary">登录</el-button>
            <el-button @click="resetForm" type="info">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 登录form表单需要的数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 给表单定义校验规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 用户登录系统
    login() {
      // 对登录表单校验
      this.$refs.loginFormref.validate(async valid => {
        if (valid === true) {
          // 用户信息真实性校验
          // axios带着用户信息去数据库校验
          const { data: res } = await this.$http.post('/login', this.loginForm)
          // console.log(res)
          // 判断用户名或者密码校验失败
          if (res.meta.status !== 200) {
            return this.$message.error('用户名或者密码不存在')
          }
          // 通过游览器的sessionstorage记录游览器返回的token信息
          window.sessionStorage.setItem('token', res.data.token)
          // 路由重定向到首页
          this.$router.push('/home')
        }
      })
    },
    // 重置按钮
    resetForm() {
      this.$refs.loginFormref.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
#login-container {
  height: 100%;
  background-color: #2b4b6b;
  overflow: hidden;
  #login-box {
    width: 450px;
    height: 304px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .el-form {
      width: 100%;
      position: absolute;
      bottom: 0;
      padding: 20px;
      box-sizing: border-box;
    }
    #logo-box {
      background-color: #fff;
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 8px;
      box-shadow: 0 0 10px #eee;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        background-color: #eee;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
