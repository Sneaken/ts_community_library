<template>
  <div class="register">
    <canvas id="canvas"></canvas>
    <div class="register-form">
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="checkPassword" label="确认密码">
          <el-input v-model="registerForm.checkPassword"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="电子邮箱">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="icCard" label="身份证号">
          <el-input v-model="registerForm.idCard"> </el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="onSubmit">注册</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import draw from '@/utils/canvas';

@Component
export default class Register extends Vue {
  registerForm = {
    username: '',
    password: '',
    checkPassword: '',
    phone: '',
    email: '',
    idCard: ''
  };

  private validatePass: any = (
    rule: any,
    value: string,
    callback: { (arg0: Error): void; (): void }
  ) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (
        this.registerForm.checkPassword !== '' &&
        reg.test(this.registerForm.checkPassword)
      ) {
        (this.$refs['registerForm'] as any).validateField('checkPassword');
      }
      callback();
    }
  };
  private validatePass2 = (
    rule: any,
    value: string,
    callback: { (arg0: Error): void; (arg0: Error): void; (): void }
  ) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.registerForm.password) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  };
  rules = {
    pass: [{ validator: this.validatePass, trigger: 'blur' }],
    checkPass: [{ validator: this.validatePass2, trigger: 'blur' }]
  };

  mounted() {
    draw('canvas');
  }
}
</script>

<style lang="scss" scoped>
.register-form {
  width: 30%;
  height: 300px;
  margin: 0 auto;
  padding-top: 200px;
}
#canvas {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
