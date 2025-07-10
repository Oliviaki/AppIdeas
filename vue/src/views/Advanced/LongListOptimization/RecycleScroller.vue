<template>
  <div
    class="recycle-scroller-container"
    ref="recycle-scroller-container"
    @scroll="setPool"
  >
    <div class="recycle-scroller-warp" :style="{ height: totalHeight + 'px' }">
      <div
        class="recycle-scroller-item"
        v-for="poolItem in pool"
        :key="poolItem.item[keyField]"
        :style="{ transform: `translateY(${poolItem.position}px)` }"
      >
        <slot name="item" :item="poolItem.item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="RecycleScroller">
import { computed, onMounted, ref, useTemplateRef } from "vue";

interface Props {
  listData?: any[]; // 列表数据
  itemHeight?: number; // 列表项高度
  keyField?: string; ///给我的items数组中，每个对象哪个属性代表唯一且稳定的编号
  itemGap?: number; //列表项之间的间距
}
interface poolItem {
  item: any;
  position: number;
}
const props = withDefaults(defineProps<Props>(), {
  listData: () => [],
  itemHeight: 0,
  keyField: "id",
  itemGap: 0,
});
const prev = 10; //提前加载的个数防止滑动过快白屏
const next = 10; //后加载的个数
const recycleScrollerContainer = useTemplateRef("recycle-scroller-container");
/**
 * {item:原始数据，position:该列表项的偏移位置}
 */
const pool = ref<poolItem[]>([]); //渲染池，保存渲染的列表项

const totalHeight = computed(() => props.listData.length * props.itemHeight); //列表总高度

function setPool() {
  const scrollTop = recycleScrollerContainer.value!.scrollTop; //获取滚动条的滚动距离
  const containerHeight = recycleScrollerContainer.value!.clientHeight; //获取容器的可见高度
  const startIndex = Math.max(
    Math.floor(scrollTop / props.itemHeight) - prev,
    0
  ); //获取当前滚动条所在位置的列表项的索引
  const endIndex =
    Math.ceil((scrollTop + containerHeight) / props.itemHeight) + next; //获取当前滚动条所在位置的末尾列表项的索引
  const startPosition = startIndex * props.itemHeight; //起始位置的偏移值
  pool.value = props.listData.slice(startIndex, endIndex).map((item, index) => {
    return {
      item,
      position:
        startPosition + index * props.itemHeight + index * props.itemGap,
    };
  });
}

onMounted(() => {
  setPool();
});
</script>

<style lang="scss" scoped>
.recycle-scroller-container {
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  .recycle-scroller-warp {
    position: relative;
    .recycle-scroller-item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
