<template>
  <div class="navbar-container">
    <router-link :to="{ name: 'gsap-site' }" class="logo-container">
      <img src="../images/logo.png" alt="logo" />
      <span>Velvet Pour</span>
    </router-link>
    <ul class="menu">
      <li v-for="item in navLinks" :key="item.id" class="menu-item">
        <a :href="`#${item.id}`">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="Navbar">
import { navLinks } from "./config";
import Gsap from "gsap";
import { onMounted } from "vue";
onMounted(async () => {
  const tl = Gsap.timeline({
    scrollTrigger: {
      trigger: ".navbar-container",
      start: "bottom top",
      scroller: ".intermediate-container",
    },
  });
  tl.fromTo(
    ".navbar-container",
    { backgroundColor: "transparent" },
    {
      backgroundColor: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(10px)",
      duration: 1,
      ease: "power1.inOut",
    }
  );
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as mixin;
.navbar-container {
  @include mixin.flex(space-between);
  height: 90px;
  width: 1813px;
  position: fixed;
  z-index: 50;
  padding: 0 90px;
  box-sizing: border-box;
  .logo-container {
    display: block;
    font-family: "Modern Negra";
    font-size: 30px;
    img {
      vertical-align: middle;
    }
  }
  .menu {
    @include mixin.flex(space-between);
    font-family: "三级泼墨体";
    font-weight: 500;
    font-style: Medium;
    font-size: 16px;
    letter-spacing: 0%;
    gap: 48px;
  }
}
</style>
