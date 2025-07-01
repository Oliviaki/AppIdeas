<template>
  <div class="app-container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts" name="App">
import Sidebar from "@/components/Sidebar.vue";
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as *;
.app-container {
  display: flex;
  .sidebar {
    width: 200px;
    background-color: aqua;
    height: 100vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .main {
    @include bg("bg_main.jpg");
    position: relative;
    flex: 1;
    background-color: bisque;
    overflow: auto;
  }
}
</style>
