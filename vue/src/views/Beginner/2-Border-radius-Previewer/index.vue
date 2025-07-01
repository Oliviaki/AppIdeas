<template>
  <div class="app-container">
    <div class="box" :style="style" ref="box"></div>
    <div class="slides">
      <div class="border-width">
        <span>边框宽度:{{ boxInfo.borderWidth }}px</span>
        <el-slider v-model="boxInfo.borderWidth" />
      </div>
      <div class="box-width">
        <span>盒子宽度:{{ boxInfo.boxWidth }}px</span>
        <el-slider v-model="boxInfo.boxWidth" :max="max" />
      </div>

      <div class="box-height">
        <span>盒子高度:{{ boxInfo.boxHeight }}px</span>
        <el-slider v-model="boxInfo.boxHeight" :max="max" />
      </div>
      <div class="box-radius">
        <span>盒子圆角左上:{{ boxInfo.borderRadiusTopLeft }}px</span>
        <el-slider v-model="boxInfo.borderRadiusTopLeft" />
      </div>
      <div class="box-radius">
        <span>盒子圆角右上:{{ boxInfo.borderRadiusTopRight }}px</span>
        <el-slider v-model="boxInfo.borderRadiusTopRight" />
      </div>
      <div class="box-radius">
        <span>盒子圆角左下:{{ boxInfo.borderRadiusBottomLeft }}px</span>
        <el-slider v-model="boxInfo.borderRadiusBottomLeft" />
      </div>
      <div class="box-radius">
        <span>盒子圆角右下:{{ boxInfo.borderRadiusBottomRight }}px</span>
        <el-slider v-model="boxInfo.borderRadiusBottomRight" />
      </div>
      <button @click="reset">重置</button>
      <button @click="copy">复制样式</button>
    </div>
  </div>
</template>

<script setup lang="ts" name="app">
import { ElMessage } from "element-plus";
import { computed, reactive, useTemplateRef } from "vue";

interface BoxInfo {
  [props: string]: any;
}
const max = 400;
const boxRef = useTemplateRef("box");
const originBoxInfo: BoxInfo = {
  borderWidth: 10,
  boxWidth: 100,
  boxHeight: 100,
  borderRadiusTopLeft: 10,
  borderRadiusTopRight: 10,
  borderRadiusBottomLeft: 10,
  borderRadiusBottomRight: 10,
};
const boxInfo = reactive(JSON.parse(JSON.stringify(originBoxInfo)));
const style = computed(() => {
  if (boxInfo.borderWidth > Math.min(boxInfo.boxWidth, boxInfo.boxHeight) / 2) {
    boxInfo.borderWidth = Math.min(boxInfo.boxWidth, boxInfo.boxHeight) / 2;
  }
  return {
    borderWidth: `${boxInfo.borderWidth}px`,
    width: `${boxInfo.boxWidth}px`,
    height: `${boxInfo.boxHeight}px`,
    borderRadius: `${boxInfo.borderRadiusTopLeft}px ${boxInfo.borderRadiusTopRight}px ${boxInfo.borderRadiusBottomRight}px ${boxInfo.borderRadiusBottomLeft}px`,
  };
});

function reset() {
  for (const item in originBoxInfo) {
    boxInfo[item] = originBoxInfo[item];
  }
}
async function copy() {
  const styleText = boxRef.value?.style.cssText;
  await navigator.clipboard.writeText(styleText as string);
  ElMessage.success("Copied");
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 1000px;
  background-color: bisque;
  .box {
    box-sizing: border-box;
    margin: 0 auto;
    background-color: aquamarine;
    border-color: #000;
    border-style: solid;
  }
}
</style>
