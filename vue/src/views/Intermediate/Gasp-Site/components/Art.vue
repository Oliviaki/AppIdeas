<template>
  <div class="art-container" id="art">
    <div class="art-word">The Art</div>
    <div class="art-img">
      <img src="../images/under-img.jpg" alt="" class="under-img" />
    </div>
    <ul class="text feature">
      <li v-for="item in featureLists">
        <img src="../images/check.png" alt="" />
        <span>{{ item }}</span>
      </li>
    </ul>
    <ul class="text good">
      <li v-for="item in goodLists">
        <img src="../images/check.png" alt="" />
        <span>{{ item }}</span>
      </li>
    </ul>
    <div class="desc start">Sip-Worthy Perfection</div>
    <div class="desc end">
      <span
        >This isn’t just a drink. It’s a carefully crafted moment made just for
        you.</span
      >
      <br />
      <span>Made with Craft, Poured with Passion</span>
    </div>
  </div>
</template>

<script setup lang="ts" name="Art">
import { onMounted } from "vue";
import { featureLists, goodLists } from "./config";
import Gasp from "gsap";
onMounted(() => {
  const tl = Gasp.timeline({
    scrollTrigger: {
      trigger: ".art-container",
      start: "top top",
      end: "bottom 70%",
      scrub: 1.5,
      pin: true,
      scroller: ".intermediate-container",
    },
  });
  tl.to(".art-container .art-word,.art-container .text, .art-container .desc", {
    opacity: 0,
    stagger: 0.2,
    ease: "power4.out",
  })
    .to(".art-container .art-img", {
      maskSize: "400%",
      duration: 2,
      ease: "power1.out",
    })
    .to(".desc.end", {
      opacity: 1,
      ease: "expo.out",
    });
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as mixin;
.art-container {
  position: relative;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 110px;
  background-image: radial-gradient(#514b4b, #000 60%);
  .art-word {
    position: absolute;
    top: 220px;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    font-family: "Modern Negra";
    font-weight: 400;
    font-size: 330px;
    text-align: center;
    color: #505050;
    opacity: 0.5;
  }
  .art-img {
    text-align: center;
    margin-top: 50px;
    mask-image: url("../images/mask-img.png");
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: 40%;
    .under-img {
      width: 1000px;
      border-radius: 40px;
    }
  }
  .text {
    position: absolute;
    bottom: 200px;
    font-family: "三级泼墨体";
    font-weight: 500;
    font-size: 18px;
    line-height: 36px;
    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-right: 4px;
    }
    &.feature {
      left: 40px;
    }
    &.good {
      right: 40px;
    }
  }
  .desc {
    position: absolute;
    width: 100%;
    bottom: 60px;
    left: 0;
    font-family: "Modern Negra";
    font-weight: 400;
    font-size: 48px;
    text-align: center;
    &.end {
      opacity: 0;
      span:last-child {
        font-family: "三级泼墨体";
        font-size: 18px;
      }
    }
  }
}
</style>
