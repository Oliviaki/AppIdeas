<template>
  <div class="about-container" id="about">
    <div class="top-content">
      <div class="left-content">
        <div class="badge">Best Cocktails</div>
        <h1>
          Where every detail<br />
          matters—from muddle<br />
          to garnish
        </h1>
      </div>
      <div class="right-content">
        <div class="desc">
          Every cocktail we serve is a reflection of our<br />
          obsession with detail — from the first muddle to the<br />
          final garnish. That care is what turns a simple drink<br />
          into something truly memorable.
        </div>
        <div class="evaluation">
          <div class="goodStar">
            <div class="star">
              <el-icon v-for="i in 5" :key="i"><StarFilled /></el-icon>
            </div>
            <div class="score"><span class="score-num">4.5</span>/5</div>
            <p class="people">More than +12000 customers</p>
          </div>
          <div class="gap"></div>
          <div class="customers">
            <img
              :src="item.imgPath"
              alt=""
              v-for="(item, index) in profileLists"
              class="avatar"
              :style="{ transform: `translateX(${-index * 10}px)` }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-content">
      <img src="../images/abt1.png" alt="" class="abt1" />
      <div class="card">
        <div class="card-title">Crafted to Impress</div>
        <div class="gap"></div>
        <div class="card-item" v-for="item in featureLists">
          <img src="../images/check.png" alt="" /> {{ item }}
        </div>
      </div>
      <img src="../images/abt2.png" alt="" class="abt2" />
      <img src="../images/abt3.png" alt="" class="abt3" />
      <img src="../images/abt4.png" alt="" class="abt4" />
    </div>
  </div>
</template>

<script setup lang="ts" name="About">
import { StarFilled } from "@element-plus/icons-vue";
import { profileLists, featureLists } from "./config";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";
import { onMounted } from "vue";
onMounted(() => {
  const titleSplit = new SplitText(
    ".about-container .top-content .left-content h1",
    { type: "words" }
  );
  const descSplit = new SplitText(
    ".about-container .top-content .right-content .desc",
    { type: "lines" }
  );
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-container",
      start: "top 85%",
      scrub: true,
      scroller: ".intermediate-container",
    },
  });

  tl.from(
    titleSplit.words,
    {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.02,
      ease: "expo.out",
    },
    0
  )
    .from(descSplit.lines, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.05,
      ease: "expo.out",
    },0)
    .from(
      ".about-container .bottom-content > img,.bottom-content > .card",
      {
        scale: 0.5,
        duration: 0.5,
        ease: "power1.out",
      },
      0
    );
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as mixin;
.about-container {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 100px 80px 0;
  .top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .left-content {
      .badge {
        font-weight: 500;
        font-size: 14px;
        width: 140px;
        height: 40px;
        background-color: #fff;
        border-radius: 20px;
        line-height: 40px;
        color: #000;
        text-align: center;
      }
      h1 {
        font-family: "Modern Negra";
        font-weight: 400;
        font-size: 64px;
      }
    }
    .right-content {
      .desc {
        font-family: "三级泼墨体";
        font-weight: 500;
        font-size: 18px;
        line-height: 30px;
        margin-bottom: 20px;
      }
      .evaluation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .goodStar {
          .star {
            margin-bottom: 20px;
          }
          .score {
            font-weight: 700;
            font-style: Bold;
            font-size: 24px;
            margin-bottom: 10px;
            &-num {
              font-size: 32px;
              color: #e7d393;
            }
          }
          .people {
            font-weight: 500;
            font-size: 14px;
          }
        }
        .gap {
          width: 0px;
          height: 85px;
          border: 1px solid #565656;
        }
        .customers {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 196px;
          height: 85px;
          border-radius: 60px;
          background: linear-gradient(180deg, #313131 0%, #0f0f0f 100%);
          box-sizing: border-box;
          padding-left: 20px;
          .avatar {
            width: 44px;
            height: 44px;
          }
        }
      }
    }
  }
  .bottom-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    row-gap: 20px;
    .abt1 {
      width: 330px;
      height: 285px;
    }
    .card {
      width: 330px;
      height: 285px;
      background: linear-gradient(180deg, #313131 0%, #0f0f0f 100%);
      border-radius: 20px;
      box-sizing: border-box;
      padding: 40px 32px;
      &-title {
        font-family: "Modern Negra";
        font-weight: 400;
        font-size: 24px;
        margin-bottom: 10px;
      }
      .gap {
        width: 266;
        height: 0px;
        border: 1px solid #565656;
        margin-bottom: 10px;
      }
      &-item {
        font-family: "三级泼墨体";
        font-weight: 500;
        font-size: 18px;
        line-height: 36px;
        .check {
          width: 16px;
          height: 16px;
          vertical-align: middle;
        }
      }
    }
    .abt2 {
      width: 580px;
      height: 285px;
    }
    .abt3 {
      width: 780px;
      height: 285px;
      border-radius: 20px;
    }
    .abt4 {
      width: 480px;
      height: 285px;
      border-radius: 20px;
    }
  }
}
</style>
