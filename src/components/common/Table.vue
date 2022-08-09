<template>
  <div class="table">
    <el-table :data="tableData" height="90%" stripe>
      <el-table-column
          show-overflow-tooltip
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="180px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :total="config.total"
        :current-page.sync="config.page"
        @current-change="changePage"
        :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {

    }
  },
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  methods: {
    handleEdit(row) {
      this.$emit('edit', row)
    },
    handleDelete(row) {
      this.$emit('del', row)
    },
    changePage(page) {
      this.$emit('changePage', page)
    }
  },
}
</script>

<style lang="less" scoped>
.table {
  height: calc(90vh - 60px - 64px - 40px);
  background-color: white;
  position: relative;
  .pagination {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>