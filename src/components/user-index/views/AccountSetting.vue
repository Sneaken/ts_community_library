<template>
  <div id="account">
    <h2 class="title">账户信息</h2>
    <div class="contact">
      <span class="label">用户名</span>
      <span>{{ account.username }}</span>
    </div>

    <div class="phone">
      <span class="label">手机号</span>
      <span v-if="account.phone">{{ account.phone }}</span>
      <span v-else>------------</span>
      <el-button
        type="primary"
        v-if="account.phone"
        size="small"
        @click="phoneDialog.show = true"
        >修改</el-button
      >
      <el-button
        type="primary"
        v-else
        size="small"
        @click="phoneDialog.show = true"
        >绑定</el-button
      >
    </div>
    <div class="email">
      <span class="label">邮箱</span>
      <span v-if="account.email">{{ account.email }}</span>
      <span v-else>------------</span>
      <el-button
        type="primary"
        v-if="account.email"
        size="small"
        @click="emailDialog.show = true"
        >修改</el-button
      >
      <el-button
        type="primary"
        v-else
        size="small"
        @click="emailDialog.show = true"
        >绑定</el-button
      >
    </div>

    <div class="password">
      <span class="label">密码</span>
      <span>已设置</span>
      <el-button type="primary" size="small" @click="passwordDialog.show = true"
        >修改</el-button
      >
    </div>

    <!-- 绑定电话dialog -->
    <el-dialog
      :title="this.account.phone ? '修改手机号码' : '绑定手机号码'"
      :visible.sync="phoneDialog.show"
      :modal-append-to-body="false"
      width="500px"
      top="25vh"
      center
    >
      <el-form label-position="left" label-width="80px" :model="phoneDialog">
        <el-form-item label="原手机" v-if="this.account.phone">
          <el-input
            maxlength="11"
            v-model="this.account.phone"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="新手机">
          <el-input
            maxlength="11"
            v-model="phoneDialog.new_mobile"
            placeholder="请输入新联系电话"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="phoneDialog.show = false">取 消</el-button>
        <el-button type="primary" @click="changePhone">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改邮箱dialog -->
    <el-dialog
      :title="account.email ? '修改电子邮箱' : '绑定电子邮箱'"
      :visible.sync="emailDialog.show"
      :modal-append-to-body="false"
      width="500px"
      top="25vh"
    >
      <el-form label-position="left" label-width="80px" :model="emailDialog">
        <el-form-item label="原邮箱" v-if="account.email">
          <el-input v-model="account.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            maxlength="20"
            v-model="emailDialog.new_email"
            placeholder="请输入电子邮箱"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="emailDialog.show = false">取 消</el-button>
        <el-button type="primary" @click="changeEmail">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改密码dialog -->
    <el-dialog
      title="修改密码"
      :visible.sync="passwordDialog.show"
      :modal-append-to-body="false"
      width="500px"
      top="25vh"
    >
      <el-form label-position="left" label-width="80px" :model="passwordDialog">
        <el-form-item label="原密码">
          <el-input
            maxlength="20"
            type="password"
            v-model="passwordDialog.old_password"
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            maxlength="20"
            type="password"
            v-model="passwordDialog.newValue"
            placeholder="请输入新密码(6-12位数字字母组合)"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            maxlength="20"
            type="password"
            v-model="passwordDialog.newValueConfirm"
            placeholder="请确认新密码(6-12位数字字母组合)"
            @keyup.enter.native="changePassword"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passwordDialog.show = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UPDATE_USER_INFO } from '@/config';
import { ResultInterface } from '@/config/common.interface';
import { UPDATE_USER } from '@/store/mutation-types';

@Component
export default class AccountSetting extends Vue {
  account: any = {};
  phoneDialog = {
    show: false,
    new_mobile: '',
    sendFlag: false,
    sendTimeout: 60
  };
  emailDialog = {
    show: false,
    new_email: '',
    sendFlag: false,
    sendTimeout: 60
  };
  passwordDialog = {
    show: false,
    old_password: '',
    newValue: '',
    newValueConfirm: ''
  };

  created() {
    this.getInfo();
  }
  getInfo() {
    const user = this.$store.getters.user;
    this.account.username = user.username;
    this.account.phone = user.phone;
    this.account.email = user.email;
  }

  async changePhone() {
    const mobileReg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (!mobileReg.test(this.phoneDialog.new_mobile)) {
      return this.$message.error('请输入正确的手机号');
    }
    const params = {
      username: this.account.username,
      op: 1, //修改手机号码
      newValue: this.phoneDialog.new_mobile,
      oldValue:
        typeof this.account.phone === 'undefined' ? null : this.account.phone
    };
    try {
      const result: ResultInterface = await this.$axios.post(
        UPDATE_USER_INFO,
        params
      );
      if (result.status === 200) {
        this.$message.success(result.message);
        this.account.phone = this.phoneDialog.new_mobile;
        this.phoneDialog.show = false;
        this.phoneDialog.new_mobile = '';
        localStorage.setItem('update', 'true');
        this.$store.commit(UPDATE_USER, {
          attribute: 'phone',
          data: this.account.phone
        });
        console.log(this.$store.getters.user.phone);
      } else if (result.status === 212) {
        this.$message.error(result.message);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async changeEmail() {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (!mailReg.test(this.emailDialog.new_email)) {
      return this.$message.error('请输入正确的邮箱!');
    }
    try {
      const params = {
        username: this.account.username,
        op: 2,
        newValue: this.emailDialog.new_email,
        oldValue:
          typeof this.account.email === 'undefined' ? null : this.account.email
      };
      const result = await this.$axios.post(UPDATE_USER_INFO, params);
      if (result.status === 200) {
        this.$message.success(result.message);
        this.account.email = this.emailDialog.new_email;
        this.emailDialog.show = false;
        this.emailDialog.new_email = '';
        localStorage.setItem('update', 'true');
        this.$store.commit(UPDATE_USER, {
          attribute: 'email',
          data: this.account.email
        });
        console.log(this.$store.getters.user.email);
      } else {
        this.$message.error(result.message);
      }
    } catch (e) {
      console.log(e);
    }
  }
  changePassword() {
    const passwrodReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    if (this.passwordDialog.old_password === '') {
      return this.$message.error('请输入旧密码');
    } else if (!passwrodReg.test(this.passwordDialog.newValue)) {
      return this.$message.error('请输入新密码(6-12位数字字母组合)');
    } else if (
      this.passwordDialog.newValueConfirm !== this.passwordDialog.newValue
    ) {
      return this.$message.error('请确认两次密码输入是否一致');
    }
    const params = {
      op: 4,
      user_name: this.account.userName,
      old_password: this.passwordDialog.old_password,
      new_password: this.passwordDialog.newValue
    };
    this.$axios.post('/report/Index/update_user', params).then(res => {
      if (res.errno === 0) {
        this.$message.success('修改成功');
        this.passwordDialog.show = false;
        this.passwordDialog.old_password = '';
        this.passwordDialog.newValue = '';
        this.passwordDialog.newValueConfirm = '';
      } else {
        this.$message.error(res.errmsg);
      }
    });
  }
}
</script>

<style lang="scss" scoped>
#account {
  padding: 30px;
  height: calc(100% - 90px);
  background: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  h2 {
    margin-bottom: 20px;
  }
  & > div {
    line-height: 50px;
    & > span {
      display: inline-block;
      width: 400px;
    }
    .label {
      width: 200px;
      text-align: right;
      margin-right: 50px;
      color: #9ea4b6;
    }
  }
}
</style>
