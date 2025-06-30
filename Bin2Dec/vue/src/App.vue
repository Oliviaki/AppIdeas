<template>
  <div class="app-container">
    <input type="text" v-model.trim="binaryDigit" />
    <span v-if="binaryDigit" class="tips">{{ tips }}</span>
    <span class="answer">{{ answer }}</span>
  </div>
</template>

<script setup lang="ts" name="App">
import { computed, ref } from "vue";
const reg = /^[0-1]+$/;
const binaryDigit = ref("");
function isValidBinary(value: string): boolean {
  return reg.test(value);
}
function convertBinaryToDecimal(binary: string):string{
  return parseInt(binary, 2).toString();
}
const answer = computed(()=>{
  return isValidBinary(binaryDigit.value) ? convertBinaryToDecimal(binaryDigit.value) : "";
})
const tips = computed(()=>{
  return isValidBinary(binaryDigit.value) ? "" : "请输入有效的二进制数";
})
</script>

<style lang="scss" scoped>
.app-container {
  box-sizing: border-box;
  padding-top: 100px;
  width: 400px;
  height: 200px;
  margin: 100px auto;
  background-color: bisque;
  border-radius: 8px;
  .tips {
    color: red;
  }
  .answer {
    color: blue;
    text-align: center;
  }
}
</style>
