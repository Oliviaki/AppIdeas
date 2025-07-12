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
      <EstimatedVirtualList class="scroll" :items="UnequalList">
        <template #default="{ item }">
          <div class="list-item">{{ item.id }}-{{ item.content }}</div>
        </template>
      </EstimatedVirtualList>
    </div>
  </div>
</template>

<script setup lang="ts" name="LongListOptimization">
import ListItem from "./ListItem.vue";
import RecycleScroller from "./EqualHeight/RecycleScroller.vue";
import EstimatedVirtualList from "./UnequalHeight/EstimatedVirtualList.vue";
import { ref } from "vue";
const list = new Array(10000).fill(0).map((_, index) => {
  return { id: index, name: `item ${index}`, count: index };
});
const UnequalList = ref<any[]>([]);
fetch("/api/list")
  .then((res) => res.json())
  .then((res) => {
    UnequalList.value = res.data.list;
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
    justify-content: flex-start;
    flex-direction: column;
    flex: 1;
    height: 100%;
    background-color: aqua;
    .scroll {
      width: 500px;
      height: 600px;
      background-color: beige;
      .list-item{
        padding: 10px;
        border-bottom: 2px solid #ccc;
      }
    }
  }
}
</style>
