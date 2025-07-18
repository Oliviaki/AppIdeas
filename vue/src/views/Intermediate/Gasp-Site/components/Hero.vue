<template>
  <div class="hero-container" id="hero">
    <h1 class="title">MOJITO</h1>
    <img src="../images/hero-left-leaf.png" alt="" class="hero-leaf-left" />
    <img src="../images/hero-right-leaf.png" alt="" class="hero-leaf-right" />
    <div class="hero-body">
      <div class="hero-content">
        <div class="left-text">
          <p>Cool. Crisp. Classic.</p>
          <p class="sub">
            Sip the Spirit <br />
            of Summer
          </p>
        </div>
        <div class="right-text">
          <p class="sub">
            Every cocktail on our menu is a<br />
            blend of premium ingredients,<br />
            creative flair, and timeless recipes<br />
            — designed to delight your senses.
          </p>
          <a href="#cocktails">View cocktails</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Hero">
import Gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { onMounted } from "vue";
onMounted(() => {
  const heroSplit = new SplitText(".title", {
    type: "chars,words",
  });
  const paragraphSplit = new SplitText(".sub", {
    type: "lines",
  });

  heroSplit.chars.forEach((char) => {
    char.classList.add("text-gradient");
  });
  Gsap.from(heroSplit.chars, {
    yPercent: 100,
    duration: 1.8,
    stagger: 0.06,
    ease: "expo.out",
  });
  Gsap.from(paragraphSplit.lines, {
    yPercent: 100,
    opacity: 0,
    duration: 1.8,
    stagger: 0.06,
    ease: "expo.out",
    delay: 1,
  });
  Gsap.timeline({
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      scroller: ".gsap-container",
    },
  })
    .to(".hero-leaf-right", { y: 200 }, 0)
    .to(".hero-leaf-left", { y: -200 }, 0);
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as mixin;
.hero-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: url("../images/noise.png");
  .title {
    font-family: "Modern Negra";
    font-size: 330px;
    letter-spacing: -2px;
    text-align: center;
    margin-top: 146px;
    :deep(.text-gradient) {
      background: linear-gradient(to bottom, #ffffff, #898989);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }
  .hero-leaf-left {
    position: absolute;
    left: 0;
    top: 241px;
    width: 326px;
  }
  .hero-leaf-right {
    position: absolute;
    top: 200px;
    right: 0;
    width: 356px;
  }
  .hero-body {
    .hero-content {
      .left-text {
        position: absolute;
        top: 727px;
        left: 80px;
        margin-top: 20px;
        font-family: "三级泼墨体";
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 0;
        .sub {
          font-family: "Modern Negra";
          font-weight: 400;
          font-size: 50px;
          line-height: 46px;
          letter-spacing: 0;
          color: #e7d393;
        }
      }
      .right-text {
        position: absolute;
        top: 703px;
        right: 80px;
        font-family: "三级泼墨体";
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        letter-spacing: 0;
      }
    }
  }
}
</style>
