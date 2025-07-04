<template>
  <div class="description-container" :style="positionData">
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
import { computed } from "vue";

interface tableDataType {
  name: string;
  link: string;
  des: string;
}
const props = withDefaults(
  defineProps<{
    tableData: tableDataType[];
    top?: number | string;
    left?: number | string;
    bottom?: number | string;
    right?: number | string;
  }>(),
  {
    top: "initial",
    left: "initial",
    bottom: "initial",
    right: "initial",
  }
);
function handleUnit(value: string | number) {
  return Number.isInteger(value) ? value + "px" : value;
}
const positionData = computed(() => {
  return {
    top: handleUnit(props.top),
    left: handleUnit(props.left),
    bottom: handleUnit(props.bottom),
    right: handleUnit(props.right),
  };
});
</script>

<style lang="scss" scoped>
.description-container {
  position: absolute;
}
</style>
