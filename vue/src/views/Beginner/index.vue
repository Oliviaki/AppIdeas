<template>
  <div class="beginner-container">
    <div class="description">
      <el-table
        :data="tableData"
        style="width: 420px"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        border
        stripe
      >
        <el-table-column prop="name" label="项目名称" width="120">
          <template #default="scope">
            <a
              :href="scope.row.link"
              style="color: cadetblue"
              target="_blank"
              >{{ scope.row.name }}</a
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="des"
          label="项目描述"
          width="300"
        ></el-table-column>
      </el-table>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts" name="Beginner">
const tableData = [
  {
    name: "Bin2Dec",
    des: "二进制到十进制数转换器",
    link: "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Bin2Dec-App.md",
  },
  {
    name: "Border Radius Previewer",
    des: "预览 CSS3 border-radius 值如何影响元素",
    link: "https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/Book-Finder-App.md",
  },
];
</script>

<style lang="scss" scoped>
.beginner-container {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .description {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
