<template>
  <div>
    <canvas id="canvas"></canvas>
    <div class="login">
      <el-form
        label-width="80px"
        :model="loginForm"
        status-icon
        ref="loginForm"
      >
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="loginForm.verificationCode"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="submit('loginForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import draw from '@/utils/canvas';
@Component
export default class Login extends Vue {
  // initial data

  loginForm = {
    username: '',
    password: '',
    verificationCode: ''
  };
  // use prop values for initial data
  // helloMsg = 'Hello, ' + this.propMessage;

  // lifecycle hook
  mounted() {
    draw('canvas');
  }

  // computed
  // get computedMsg() {
  //   return 'computed ' + this.msg;
  // }

  // method
  // greet() {
  //   alert('greeting: ' + this.msg);
  // }

  submit(form: string) {}
}
</script>

<style lang="scss" scoped>
.login {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 30%;
  height: 300px;
}
canvas {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
