<template>
  <div class="user">
    <el-dialog
      :title="operateType === 'add' ? '新增' : '更新'"
      :visible.sync="isShow"
    >
      <common-form
        :form-label="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="user-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <common-form
        :form-label="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
        class="user-header-form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      :table-data="tableData"
      :table-label="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import { getUser } from "network/user.js";
import CommonForm from "components/common/Form";
import CommonTable from "components/common/Table";
export default {
  name: "User",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      wholeData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        let { addr, age, birth, id, name, sex } = this.operateForm;
        let sex_num = parseInt(sex);
        this.wholeData.some((u) => {
          if (u.id === id) {
            u.name = name;
            u.addr = addr;
            u.age = age;
            u.birth = birth;
            u.sex = sex_num;
          }
        });
        this.isShow = false;
        this.getList();
      } else {
        this.wholeData.unshift({
          id: this.config.total + 1,
          name: this.operateForm.name,
          addr: this.operateForm.addr,
          age: this.operateForm.age,
          birth: this.operateForm.birth,
          sex: this.operateForm.sex,
        });
        this.isShow = false;
        this.getList();
      }
    },
    addUser() {
      this.operateType = "add";
      this.isShow = true;
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    getList(name = "") {
      if (name !== "") {
        this.wholeData = this.wholeData.filter(u => u.name == name)
        this.getList();
      } else {
        getUser({
          page: this.config.page,
          name,
        }).then((res) => {
          res = res.data;
          if (this.wholeData.length <= 0) {
            this.wholeData = res;
          }
          let limit = 20;
          const pageList = this.wholeData.filter(
            (item, index) =>
              index < limit * this.config.page &&
              index >= limit * (this.config.page - 1)
          );
          this.tableData = pageList.map((item) => {
            item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = this.wholeData.length;
        });
      }
    },
    // getList(name = "") {
    //   this.config.loading = true;
    //   name ? (this.config.page = 1) : "";
    //   getUser({
    //     page: this.config.page,
    //     name,
    //   }).then((res) => {
    //     res = res.data
    //     let limit = 20;
    //     const pageList = res.filter(
    //       (item, index) => index < limit * this.config.page && index >= limit * (this.config.page - 1)
    //     );

    //     this.tableData = pageList.map((item) => {
    //       item.sexLabel = item.sex === 0 ? "女" : "男";
    //       return item;
    //     });
    //     this.config.total = res.length;
    //     this.config.loading = false;
    //   });
    // },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除此组件，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let id = row.id;
        new Promise((resolve, reject) => {
          if (id === null || id === undefined) {
            resolve("参数不正确");
          } else {
            resolve("删除成功");
          }
        }).then((res) => {
          this.wholeData = this.wholeData.filter((u) => u.id !== id);
          this.$message({
            type: "success",
            message: res,
          });
          this.getList();
        });
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-header-form /deep/ .el-form-item {
  margin-bottom: 0;
}
</style>