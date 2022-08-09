<template>
  <div class="login">
    <el-card shadow="hover">
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        class="login-container"
        :label-position="labelPosition"
      >
        <h3 class="login_title">系统登陆</h3>
        <el-form-item
          label="用户名"
          prop="username"
          class="username"
          label-width="70px"
        >
          <el-input
            type="input"
            v-model="form.username"
            auto-complete="off"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" label-width="70px">
          <el-input
            type="password"
            v-model="form.password"
            auto-complete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="login_submit">
          <el-button type="primary" @click="login" class="login_submit">
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getMenuAdmin, getMenuUser } from "network/menu.js";
export default {
  name: "Login",
  data() {
    return {
      labelPosition: "left",
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      let { username, password } = this.form;
      if (username === "admin" && password === "admin") {
        getMenuAdmin(this.form)
          .then(({ data: res }) => {
            this.$store.commit("clearMenu");
            this.$store.commit("setMenu", res.menu);
            this.$store.commit("setToken", res.token);
            this.$store.commit("addMenu", this.$router);
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            this.$message.warning(error);
          });
      } else if ((username === "jjl") & (password === "jjl")) {
        getMenuUser(this.form).then(({ data: res }) => {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.menu);
          this.$store.commit("setToken", res.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.el-card {
  padding: 20px;
}
.login_submit {
  margin-bottom: 0px;
  margin-left: 0px;
  display: flex;
  justify-content: center;
}
.login_title {
  margin-bottom: 22px;
}
</style>