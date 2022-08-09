<template>
  <div class="tag">
    <el-tag
      v-for="(item, index) in tag"
      :key="item.name"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Tag",
  computed: {
    ...mapState({
      tag: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    handleClose(item, index) {
      const length = this.tag.length - 1;
      this.closeTag(item);
      if (index === length) {
        this.$router.push({
          name: this.tag[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tag[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tag {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>