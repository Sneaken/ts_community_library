<template>
  <div class="login">
    <canvas id="canvas"></canvas>
    <div class="login-form">
      <el-form
        label-width="80px"
        :model="loginForm"
        status-icon
        ref="loginForm"
      >
        <el-form-item
          prop="username"
          label="用户名"
          :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]"
        >
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item
          prop="verificationCode"
          label="验证码"
          :rules="[
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="loginForm.verificationCode"
            @keyup.enter.native="submit('loginForm')"
          >
            <div slot="append" v-html="img" @click.stop="getVerifyCode"></div>
          </el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button
            type="primary"
            @click="submit('loginForm')"
            :loading="loading"
            >登录</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
          <el-button @click="$router.push('register')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import draw from '@/utils/canvas';
import { LOGIN_URL, VERIFY } from '@/config';
import jwt_decode from 'jwt-decode';
import { isEmpty } from '@/utils/common';
import { ResultInterface } from '@/config/common.interface';
@Component
export default class Login extends Vue {
  loading: boolean = false;

  loginForm = {
    username: '',
    password: '',
    verificationCode: ''
  };
  img: string = '';

  mounted() {
    draw('canvas');
    this.getVerifyCode();
  }

  submit(form: string) {
    (this.$refs[form] as any).validate(async (valid: Boolean) => {
      if (valid) {
        try {
          this.loading = true;
          const result: ResultInterface = await this.$axios.post(LOGIN_URL, {
            username: this.loginForm.username,
            password: this.loginForm.password,
            verificationCode: this.loginForm.verificationCode
          });

          this.loading = false;
          if (result.status === 200) {
            localStorage.setItem('eleToken', result.data);
            //解析token
            const decoded = jwt_decode(result.data);
            console.log(decoded);

            //token存储到vuex
            await this.$store.dispatch('setAuthenticated', !isEmpty(decoded));
            await this.$store.dispatch('setUser', decoded);

            //登录成功
            this.$message({
              message: result.message,
              type: 'success'
            });
            // 跳转地址
            const redirect = this.$route.query.redirect;

            // 临时登录
            if (typeof redirect !== 'undefined') {
              await this.$router.push(redirect as string);
            } else {
              await this.$router.push('/index');
            }
          } else {
            this.$message({
              message: result.message,
              type: 'error'
            });
          }
          // else if (result.status === 201) {
          //     this.$message({
          //         message: result.message,
          //         type: 'error'
          //     });
          // } else if (result.status === 202) {
          //     this.$message({
          //         message: result.message,
          //         type: 'error'
          //     });
          // } else if (result.status === 203) {
          //     this.$message({
          //         message: result.message,
          //         type: 'error'
          //     });
          // }
        } catch (e) {
          console.log(e);
        }
      } else {
        return false;
      }
    });
  }

  resetForm(form: string) {
    (this.$refs[form] as any).resetFields();
  }

  async getVerifyCode() {
    this.img = await this.$axios.get(VERIFY);
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 30%;
  height: 300px;
  margin: 0 auto;
  padding-top: 300px;
}
#canvas {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
