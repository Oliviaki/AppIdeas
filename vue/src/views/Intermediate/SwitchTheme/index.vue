<template>
  <div class="switch-theme-container" :data-theme="theme">
    <div class="switch-theme-button">
      <el-switch
        v-model="theme"
        active-text="白天"
        inactive-text="黑夜"
        active-value="day"
        inactive-value="night"
      />
      <br />
    </div>
    <div class="main">
      <div class="use-sass">
        <div class="header"></div>
        <div class="notice"></div>
        <div class="icon"></div>
      </div>
      <div class="use-css">
        <div class="header"></div>
        <div class="notice"></div>
        <div class="icon"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="SwitchTheme">
import { ref, watch } from "vue";
type Theme = "day" | "night";
const theme = ref<Theme>((localStorage.getItem("theme") as Theme) || "day");

watch(theme, (newValue) => {
  localStorage.setItem("theme", newValue);
});
</script>

<style lang="scss" scoped>
@use "./handle.scss" as handle;
@use "./mixin.scss" as mixin;
@import "./css-theme.css";
.switch-theme-container {
  .switch-theme-button {
    text-align: center;
  }
  .main {
    display: flex;
    @at-root {
      .use-sass {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .header {
          @include handle.theme-bg-image("bg_header");
          width: 375px;
          height: 510px;
        }
        .notice {
          @include handle.theme-bg-image("bg_relaxed_notice");
          width: calc(714px / 2);
          height: calc(896px / 2);
        }
        .icon {
          @include handle.theme-bg-image("bg_icon");
          width: calc(125px / 2);
          height: calc(42px / 2);
        }
      }
    }
    .use-css {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .header {
        background-image: var(--bg_header);
        background-size: 100%;
        width: 375px;
        height: 510px;
      }
      .notice {
        background-image: var(--bg_relaxed_notice);
        background-size: 100%;
        width: calc(714px / 2);
        height: calc(896px / 2);
      }
      .icon {
        background-image: var(--bg_icon);
        background-size: 100%;
        width: calc(125px / 2);
        height: calc(42px / 2);
      }
    }
  }
}
</style>
