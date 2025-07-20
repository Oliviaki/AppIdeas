<template>
  <div class="contact-container" id="contact">
    <img class="f-left-leaf" alt="" src="../images/footer-left-leaf.png" />
    <img class="f-right-leaf" alt="" src="../images/footer-right-leaf.png" />
    <img class="drinks" alt="" src="../images/footer-drinks.png" />
    <h1 class="ques">Where to Find Us</h1>
    <p class="repo">https://github.com/Oliviaki/AppIdeas</p>
    <h1 class="author">MeiLiMao</h1>
  </div>
</template>

<script setup lang="ts" name="Contact">
import Gsap from "gsap";

import { onMounted } from "vue";
onMounted(() => {
  const tl = Gsap.timeline({
    defaults: { duration: 1, opacity: 0 },
    scrollTrigger: {
      trigger: ".contact-container",
      start: "top 90%",
      end: "bottom 90%",
      scrub: true,
      scroller: ".intermediate-container",
    },
  });
  tl.from(".contact-container .ques", {
    xPercent: 100,
    ease: "power4.out",
    delay: 0.5,
  })
    .from(".contact-container .repo", {
      xPercent: -100,
      ease: "sine.inOut",
    })
    .from(".contact-container .author", {
      yPercent: 100,
      ease: "bounce.out",
    });
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as mixin;
.contact-container {
  position: relative;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 110px;
  .f-left-leaf {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .f-right-leaf {
    position: absolute;
    top: 110px;
    right: 0;
  }
  .drinks {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .ques,
  .author,
  .repo {
    margin-top: 100px;
    font-family: "Modern Negra";
    font-weight: 400;
    font-size: 90px;
    text-align: center;
  }
}
</style>
