<template>
  <div class="long-list-optimization-container">
    <div class="item-equal-height">
      <h1>等高</h1>
      <RecycleScroller
        class="scroll"
        :listData="list"
        :itemHeight="54"
        :itemGap="20"
      >
        <template #item="{ item }">
          <ListItem :itemData="item"></ListItem>
        </template>
      </RecycleScroller>
    </div>
    <div class="item-unequal-height">
      <h1>不等高</h1>
    </div>
  </div>
</template>

<script setup lang="ts" name="LongListOptimization">
import ListItem from "./ListItem.vue";
import RecycleScroller from "./RecycleScroller.vue";
const list = new Array(10000).fill(0).map((_, index) => {
  return { id: index, name: `item ${index}`, count: index };
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as mixin;
.long-list-optimization-container {
  display: flex;
  height: 100%;
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  .item-equal-height {
    @include mixin.flex();
    justify-content: flex-start;
    flex-direction: column;
    flex: 1;
    height: 100%;
    background-color: antiquewhite;
    .scroll {
      width: 500px;
      height: 600px;
      background-color: beige;
    }
  }
  .item-unequal-height {
    @include mixin.flex();
    align-items: flex-start;
    flex: 1;
    height: 100%;
    background-color: aqua;
  }
}
</style>
