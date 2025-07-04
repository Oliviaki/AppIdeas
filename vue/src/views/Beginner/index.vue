<template>
  <div class="beginner-container">
    <Description :table-data="tableData" :top="10" :right="10"></Description>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts" name="Beginner">
import Description from "@/components/Description.vue";
const tableData = [
  {
    name: "Bin2Dec",
    des: "二进制到十进制数转换器",
    link: "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Bin2Dec-App.md",
  },
  {
    name: "Border Radius Previewer",
    des: "预览 CSS3 border-radius 值如何影响元素",
    link: "https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Border-Radius-Previewer.md",
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
