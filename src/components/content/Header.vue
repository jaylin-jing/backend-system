<template>
  <div class="header">
    <div class="left-content">
      <el-button
        @click="clickMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          class="my-breadcrumb"
        >
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown>
        <span>
          <img class="user" :src="userImg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const userImg = require("assets/images/user.png");
export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    userImg() {
      return userImg;
    },
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    clickMenu() {
      this.$bus.$emit("clickMenu");
    },
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login")
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.left-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.right-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.my-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #606266 ;
}
</style>