<template>
  <div class="menu-container">
    <img src="../images/slider-left-leaf.png" alt="" class="menu-left-leaf" />
    <img src="../images/slider-right-leaf.png" alt="" class="menu-right-leaf" />
    <div class="tab-bar">
      <div
        class="item"
        v-for="(item, index) in allCocktails"
        :key="item.id"
        :class="{ active: index === activeIndex }"
        @click="changeTab(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="arrows">
      <div class="left-arrow" @click="changeTab(activeIndex - 1, 'left')">
        <div class="name">{{ prevAndNextCocktail.preName }}</div>
      </div>
      <div class="right-arrow" @click="changeTab(activeIndex + 1, 'right')">
        <div class="name">{{ prevAndNextCocktail.nextName }}</div>
      </div>
    </div>
    <div class="cocktail-image">
      <img :src="prevAndNextCocktail.currentCocktail.image" alt="" />
    </div>
    <div class="text">
      <div class="left">
        <h4 class="recipe">Recipes for:</h4>
        <h2 class="cocktail-name">
          {{ prevAndNextCocktail.currentCocktail.name }}
        </h2>
      </div>
      <div class="right">
        <h4 class="ingredients-title">
          {{ prevAndNextCocktail.currentCocktail.title }}
        </h4>
        <p class="ingredients-list">
          {{ prevAndNextCocktail.currentCocktail.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Menu">
import { computed, nextTick, onMounted, ref } from "vue";
import { allCocktails } from "./config";
import Gsap from "gsap";
import { SplitText } from "gsap/SplitText";
const activeIndex = ref(0);
async function changeTab(index: number, direction: "left" | "right" = "left") {
  activeIndex.value = (index + allCocktails.length) % allCocktails.length;
  await nextTick();
  handleSwitch(direction); //也可以用watch监视activeIndex.value
}
const prevAndNextCocktail = computed(() => {
  const index = activeIndex.value;
  // const preName =
  //   index === 0
  //     ? allCocktails[allCocktails.length - 1].name
  //     : allCocktails[index - 1].name;
  // const nextName =
  //   index === allCocktails.length - 1
  //     ? allCocktails[0].name
  //     : allCocktails[index + 1].name;
  const preName =
    allCocktails[(index - 1 + allCocktails.length) % allCocktails.length].name;
  const nextName =
    allCocktails[(index + 1 + allCocktails.length) % allCocktails.length].name;
  const currentCocktail = allCocktails[index];
  return { preName, nextName, currentCocktail };
});

function handleSwitch(direction: "right" | "left") {
  const nameSplit = new SplitText(
    ".menu-container .text .left .cocktail-name",
    { type: "words" }
  );
  const ingredientTitleSplit = new SplitText(
    ".menu-container .text .right .ingredients-title",
    { type: "lines" }
  );
  const ingredientListSplit = new SplitText(
    ".menu-container .text .right .ingredients-list",
    { type: "lines" }
  );
  const tl = Gsap.timeline({
    defaults: { yPercent: 100, opacity: 0, duration: 1, stagger: 0.02 },
  });

  tl.from(nameSplit.words, {
    ease: "expo.out",
  })
    .from(
      ingredientTitleSplit.lines,
      {
        ease: "power2.inOut",
      },
      "-=1"
    )
    .from(
      ingredientListSplit.lines,
      {
        ease: "power3.inOut",
      },
      "-=1"
    );
  if (direction == "right") {
    Gsap.from(".menu-container .cocktail-image", {
      xPercent: -100,
      opacity: 0,
      duration: 1,
    });
  } else {
    Gsap.from(".menu-container .cocktail-image", {
      xPercent: 100,
      opacity: 0,
      duration: 1,
    });
  }
}

onMounted(() => {
  const tl = Gsap.timeline({
    scrollTrigger: {
      trigger: ".menu-container",
      start: "top center",
      scrub: true,
      scroller: ".intermediate-container",
    },
  });
  tl.to(
    ".menu-container .menu-right-leaf",
    {
      y: 200,
    },
    0
  ).to(
    ".menu-container .menu-left-leaf",
    {
      y: -200,
    },
    0
  );
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as mixin;
.menu-container {
  position: relative;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 110px;
  background-image: radial-gradient(#514b4b, #000 60%);
  .menu-left-leaf {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .menu-right-leaf {
    position: absolute;
    right: 0;
    top: 110px;
  }
  .tab-bar {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;
    .item {
      cursor: pointer;
      user-select: none;
      font-family: "Modern Negra";
      font-weight: 400;
      font-size: 32px;
      color: #505050;
      opacity: 0.8;
      text-decoration: underline;
      text-underline-offset: 10px;
      &.active {
        color: #fff;
        opacity: 1;
      }
    }
  }
  .cocktail-image {
    margin-top: 120px;
    width: 100%;
    text-align: center;
    pointer-events: none;
  }
  .arrows {
    cursor: pointer;
    user-select: none;
    font-family: "Modern Negra";
    .left-arrow {
      position: absolute;
      top: 50%;
      left: 200px;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &::after {
        content: "";
        width: 38px;
        height: 38px;
        background: url("../images/right-arrow.png") no-repeat 0 0/100%;
      }
      &:hover {
        color: #e7d393;
      }
    }
    .right-arrow {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 200px;
      top: 50%;
      transform: translateY(-50%);
      &::after {
        content: "";
        width: 38px;
        height: 38px;
        background: url("../images/left-arrow.png") no-repeat 0 0/100%;
      }
      &:hover {
        color: #e7d393;
      }
    }
  }
  .text {
    .left {
      position: absolute;
      width: 201px;
      height: 126px;
      top: 579px;
      left: 278px;

      .recipe {
        font-weight: 500;
        font-size: 16px;
      }
      .cocktail-name {
        font-family: "Modern Negra";
        font-weight: 400;
        font-size: 50px;
        line-height: 46px;
        color: #e7d393;
      }
    }
    .right {
      position: absolute;
      width: 540px;
      height: 222px;
      top: 600px;
      right: 98px;
      .ingredients-title {
        font-family: "Modern Negra";
        font-weight: 400;
        font-size: 48px;
        line-height: 64px;
        letter-spacing: 2px;
      }
      .ingredients-list {
        font-family: "三级泼墨体";
        font-weight: 500;
        font-size: 18px;
        line-height: 30px;
      }
    }
  }
}
</style>
