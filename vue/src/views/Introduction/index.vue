<template>
  <div class="introduction-container">
    <div class="switch-theme">
      <el-switch
        v-model="themeStore.theme"
        active-value="light"
        inactive-value="dark"
        :active-action-icon="View"
        :inactive-action-icon="Hide"
        active-text="亮色模式"
        inactive-text="暗色模式"
      />
    </div>
    <h1 class="title">梅狸猫的技术中心</h1>
    <p>
      GitHub项目资源地址:<a
        href="https://github.com/KelvinQiu802/project-ideas"
        target="_blank"
        >点击访问</a
      >
    </p>
    <p>
      梅狸猫的仓库地址:<a
        href="https://github.com/Oliviaki/AppIdeas"
        target="_blank"
        >点击访问</a
      >
    </p>
  </div>
</template>
<script setup lang="ts" name="Introduction">
import { useThemeStore } from "@/stores/useThemeStore";
import { View, Hide } from "@element-plus/icons-vue";
const themeStore = useThemeStore();
</script>
<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as *;
.introduction-container {
  @include positioningCenteredVerticallyAndHorizontally;
  max-width: 600px;
  padding: 30px 60px;
  background: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  .title {
    color: var(--text-color);
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    color: var(--text-color);
    a {
      color: #007bff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
