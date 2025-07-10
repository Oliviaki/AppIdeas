<template>
  <div class="advanced-container">
    <Description :table-data="tableData" :bottom="10" :right="10" />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts" name="Advanced">
import Description from "@/components/Description.vue";
const tableData = [
  {
    name: "Long List Optimization",
    des: "长列表优化(等高/不等高)",
    link: "",
  },
];
</script>

<style lang="scss" scoped>
.advanced-container {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
