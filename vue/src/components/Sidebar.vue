<template>
  <div class="sidebar-container">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      active-text-color="#1677FF"
      background-color="#001529"
      text-color="#fff"
      router
    >
      <template v-for="item in router.getRoutes()" :key="item.path">
        <template v-if="item.name === 'introduction'">
          <el-menu-item :index="item.path">
            <template #title>{{ item.meta.title }}</template>
          </el-menu-item>
        </template>
        <template v-else-if="item.children.length">
          <el-sub-menu :index="item.path">
            <template #title>{{ item.meta.title }}</template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.path"
              :index="`${item.path}/${child.path}`"
            >
              <template #title>{{ child.meta!.title }}</template>
            </el-menu-item>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts" name="Sidebar">
import { computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const defaultActive = computed(() => {
  return router.currentRoute.value.path;
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as *;
.sidebar-container {
  height: 2000px;
  .home,
  .beginner,
  .intermediate,
  .advanced {
    text-align: center;
    color: var(--text-color);
    margin-bottom: 10px;
    & > a {
      display: block;
      background-color: var(--bg-color);
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      box-sizing: border-box;
      &:hover,
      &.router-link-exact-active {
        background-color: var(--secondary-color);
        color: var(--primary-color);
      }
      i {
        float: right;
        &.active {
          transform: rotate(180deg);
        }
      }
    }
    .list {
      a {
        display: block;
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
        background-color: var(--accent-color);
        font-size: 14px;
        &.router-link-exact-active {
          background-color: var(--primary-color);
        }
      }
    }
  }
}
</style>
