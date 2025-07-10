<template>
  <div class="introduction-container">
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
<script setup lang="ts" name="Introduction"></script>
<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as *;
.introduction-container {
  @include positioningCenteredVerticallyAndHorizontally;
  max-width: 600px;
  padding: 30px 60px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  .title {
    color: #333;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    color: #333;
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
