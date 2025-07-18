<template>
  <div class="intermediate-container">
    <Description :table-data="tableData" :bottom="10" :right="10" v-show="false"/>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts" name="Intermediate">
import Description from "@/components/Description.vue";
const tableData = [
  {
    name: "Book Finder App",
    des: "按多个条件搜索书籍",
    link: "https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/Book-Finder-App.md",
  },
  {
    name: "Rich Text Editor Quill",
    des: "富文本编辑器",
    link: "https://quilljs.com/docs/quickstart",
  },
  {
    name: "SwitchTheme",
    des: "使用sass和css实现主题切换",
    link: "",
  },
  {
    name: "Vuedraggable",
    des: "拖拽组件",
    link: "",
  },
  {
    name:"Gasp",
    des:"gasp 动画库",
    link:"https://gsap.com/docs/v3/GSAP/"
  }
];
</script>

<style lang="scss" scoped>
.intermediate-container {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
