<template>
  <div class="sidebar-container">
    <div class="home">
      <router-link to="/">首页</router-link>
    </div>
    <div class="beginner">
      <router-link to="/beginner">
        <span>初级</span>
        <i
          class="iconfont icon-arrowdown"
          @click="isSHowBeginnerList = !isSHowBeginnerList"
          :class="{ active: isSHowBeginnerList }"
        ></i>
      </router-link>
      <div class="list" v-show="isSHowBeginnerList">
        <router-link
          :to="item.path"
          v-for="item in beginnerList"
          :key="item.path"
          >{{ item.meta.title }}</router-link
        >
      </div>
    </div>
    <div class="intermediate">
      <router-link to="/intermediate">中级</router-link>
    </div>
    <div class="advanced">
      <router-link to="/advanced">高级</router-link>
    </div>
  </div>
</template>

<script setup lang="ts" name="Sidebar">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const isSHowBeginnerList = ref(false);

const beginnerList = computed(() => {
  return router.getRoutes().filter((route) => route.meta.title);
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
