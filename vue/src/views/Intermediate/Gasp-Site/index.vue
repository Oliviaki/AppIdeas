<template>
  <div class="gsap-container">
    <Navbar />
    <Hero />
    <Cocktails />
    <About />
    <Art />
    <MenuC />
    <Contact />
  </div>
</template>

<script setup lang="ts" name="Gasp">
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";
import Cocktails from "./components/Cocktails.vue";
import About from "./components/About.vue";
import Art from "./components/Art.vue";
import MenuC from "./components/MenuC.vue";
import Contact from "./components/Contact.vue";
import Gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
Gsap.registerPlugin(ScrollTrigger, SplitText);
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as mixin;
@import url("https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap");
.gsap-container {
  --color-yellow: #e7d393;
  --color-white-100: #efefef;
  --font-sans: "Mona Sans", sans-serif;
  --font-modern-negra: "Modern Negra", sans-serif;
  --font-serif: "DM Serif Text", serif;
  background-color: black;
  color: white;
  scroll-behavior: smooth;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
