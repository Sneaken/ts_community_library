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
          <el-input
            type="password"
            v-model="registerForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPassword" label="确认密码">
          <el-input
            type="password"
            v-model="registerForm.checkPassword"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="电子邮箱">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="realName" label="姓名">
          <el-input v-model="registerForm.realName"> </el-input>
        </el-form-item>
        <el-form-item prop="idCard" label="身份证号">
          <el-input v-model="registerForm.idCard"> </el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="submitForm('registerForm')"
            >注册</el-button
          >
          <el-button @click="resetForm('registerForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import draw from '@/utils/canvas';
import { REGISTER } from '@/config';
import { ResultInterface } from '@/config/common.interface';
import logger from 'vuex/dist/logger';
import { ElForm } from 'element-ui/types/form';

@Component
export default class Register extends Vue {
  registerForm = {
    username: '',
    realName: '',
    password: '',
    checkPassword: '',
    phone: '',
    email: '',
    idCard: ''
  };

  private validatePhone = (
    rule: any,
    value: string,
    callback: { (arg0: Error): void; (): void }
  ) => {
    const reg = /^[1][3-8][0-9]{9}$/;
    if (!reg.test(value)) {
      callback(new Error('手机号有误'));
    }
    callback();
  };
  private validateIdNumber = (
    rule: any,
    value: string,
    callback: {
      (arg0: Error): void;
      (arg0: Error): void;
      (arg0: Error): void;
      (): void;
    }
  ) => {
    // 1 "验证通过!", 0 //校验不通过
    const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
    //号码规则校验
    if (!format.test(value)) {
      callback(new Error('身份证号码不合规'));
    }
    //区位码校验
    //出生年月日校验   前正则限制起始年份为1900;
    const year = Number.parseInt(value.substr(6, 4)), //身份证年
      month = Number.parseInt(value.substr(10, 2)), //身份证月
      date = Number.parseInt(value.substr(12, 2)), //身份证日
      time = Date.parse(month + '-' + date + '-' + year), //身份证日期时间戳date
      now_time = Date.parse(new Date().toString()), //当前时间戳
      dates = new Date(year, month, 0).getDate(); //身份证当月天数
    if (time > now_time || date > dates) {
      callback(new Error('身份证号码日期不合规'));
    }
    //校验码判断
    const c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //系数
    const b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; //校验码对照表
    const id_array = value.split('');
    let sum = 0;
    for (let k = 0; k < 17; k++) {
      sum += parseInt(id_array[k]) * c[k];
    }
    if (
      id_array[17] &&
      id_array[17].toUpperCase() !== b[sum % 11].toUpperCase()
    ) {
      callback(new Error('身份证号码校验码不合规'));
    }
    callback();
  };
  private validateName = (
    rule: any,
    value: string,
    callback: { (arg0: Error): void; (): void }
  ) => {
    const reg = /^[\u4e00-\u9fa5]{2,5}$/;
    if (!reg.test(value)) {
      callback(new Error('请输入中文姓名'));
    } else {
      callback();
    }
  };

  private validatePass = (
    rule: any,
    value: string,
    callback: { (arg0: Error): void; (): void }
  ) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (reg.test(this.registerForm.checkPassword)) {
        console.log(reg.test(this.registerForm.checkPassword));
        (this.$refs['registerForm'] as any).validateField('checkPassword');
      } else {
        console.log(reg.test(this.registerForm.checkPassword));
        callback(new Error('请检查密码格式 格式为 8-16位 数字字母组合'));
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

  private validateEmail = (
    rule: any,
    value: string,
    callback: { (arg0: Error): void; (): void }
  ) => {
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (this.registerForm.email === '') {
      callback();
    }
    if (!reg.test(this.registerForm.email)) {
      callback(new Error('请检查邮箱是否输入正确！'));
    }
    callback();
  };
  rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    realName: [
      { required: true, message: '姓名不能为空', trigger: 'blur' },
      { validator: this.validateName, trigger: 'blur' }
    ],
    password: [
      { required: true, validator: this.validatePass, trigger: 'blur' }
    ],
    checkPassword: [
      { required: true, validator: this.validatePass2, trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '手机号不能为空', trigger: 'blur' },
      { validator: this.validatePhone, trigger: 'blur' }
    ],
    email: [{ validator: this.validateEmail, trigger: 'blur' }],
    idCard: [
      { required: true, message: '身份证号不能为空', trigger: 'blur' },
      { validator: this.validateIdNumber, trigger: 'blur' }
    ]
  };

  mounted() {
    draw('canvas');
  }

  submitForm(formName: string) {
    (this.$refs[formName] as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        const {
          username,
          realName,
          password,
          phone,
          email,
          idCard
        } = this.registerForm;
        const result: ResultInterface = await this.$axios.post(REGISTER, {
          username,
          realName,
          password,
          phone,
          email,
          idCard
        });

        if (result.status === 200) {
          this.$message({
            type: 'success',
            message: '注册成功！跳转至登录页！'
          });
          localStorage.removeItem('eleToken');
          await this.$router.push({
            name: 'login'
          });
        } else {
          this.$message({
            type: 'error',
            message: result.message
          });
        }
      } else {
        return false;
      }
    });
  }

  resetForm(formName: string | number) {
    (this.$refs[formName] as any).resetFields();
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
