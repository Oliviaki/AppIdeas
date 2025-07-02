<template>
  <div class="description-container">
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
          <a :href="scope.row.link" style="color: cadetblue" target="_blank">{{
            scope.row.name
          }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="des"
        label="项目描述"
        width="300"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts" name="Description">
interface tableDataType {
  name: string;
  link: string;
  des: string;
}

defineProps<{
  tableData: tableDataType[];
}>();
</script>

<style lang="scss" scoped>
.description-container {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
