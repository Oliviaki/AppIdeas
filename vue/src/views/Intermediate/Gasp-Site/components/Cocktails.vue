<template>
  <div class="cocktails-container" id="cocktails">
    <div class="text left">
      <h2 class="title">Most popular cocktails</h2>
      <ul>
        <li v-for="item in cocktailLists" :key="item.name">
          <div class="info">
            <h3 class="name">{{ item.name }}</h3>
            <p class="description">{{ item.country }} | {{ item.detail }}</p>
          </div>
          <div class="price">
            <p class="price">-{{ item.price }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="text right">
      <h2 class="title">Most loved mocktails:</h2>
      <ul>
        <li v-for="item in mockTailLists" :key="item.name">
          <div class="info">
            <h3 class="name">{{ item.name }}</h3>
            <p class="description">{{ item.country }} | {{ item.detail }}</p>
          </div>
          <div class="price">
            <p class="price">-{{ item.price }}</p>
          </div>
        </li>
      </ul>
    </div>
    <img class="c-left-leaf" src="../images/cocktail-left-leaf.png"></img>
    <img class="c-right-leaf" src="../images/cocktail-right-leaf.png"></img>
  </div>
</template>

<script setup lang="ts" name="Cocktails">
import { onMounted } from "vue";
import { cocktailLists, mockTailLists } from "./config";
import Gsap from "gsap";
onMounted(() => {
  const tl = Gsap.timeline({
    scrollTrigger: {
      trigger: ".cocktails-container",
      start: "top 30%",
      end: "bottom 80%",
      scrub: true,
      scroller:".intermediate-container"
    },
  });
  tl.from(".c-left-leaf",{
    y: 100,x:-100
  },0).from(".c-right-leaf",{
    y: 100,x:100
  },0)
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as mixin;
.cocktails-container {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100vh;
  .text {
    position: absolute;
    top: 120px;
    width: 340px;
    .title {
      font-weight: 500;
      font-style: Medium;
      font-size: 20px;
      line-height: 30px;
      letter-spacing: 0;
      margin-bottom: 20px;
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .info {
          .name {
            font-family: "Modern Negra";
            font-size: 30px;
            line-height: 36px;
            color: #e7d393;
          }
          .description {
            font-family: "三级泼墨体";
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
          }
        }
      }
    }
    &.left {
      left: 80px;
    }
    &.right {
      right: 80px;
    }
  }
  .c-left-leaf{
    position: absolute;
    left: 0;
    bottom:200px;
    width: 320px;
  }
  .c-right-leaf{
    position: absolute;
    right: 0;
    bottom: 300px;
    width: 320px;
  }
}
</style>
