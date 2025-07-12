<template>
  <div class="virtual-list-container" ref="containerRef" @scroll="handleScroll">
    <div
      class="virtual-list-placeholder"
      :style="{ height: totalHeight + 'px' }"
    ></div>
    <div class="virtual-list-viewport" ref="viewportRef">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="virtual-list-item"
        :style="{
          transform: `translateY(${item.top}px)`,
        }"
      >
        <slot :item="item.data" :index="item.index"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, nextTick, watch } from "vue";

interface ItemData {
  id: number | string;
  [key: string]: any;
}

interface VisibleItem {
  id: number | string;
  index: number;
  top: number;
  data: ItemData;
}

interface ItemSize {
  height: number;
  top: number;
  bottom: number;
}

const props = defineProps({
  items: {
    type: Array as () => ItemData[],
    required: true,
  },
  estimatedItemSize: {
    type: Number,
    default: 50,
  },
  buffer: {
    type: Number,
    default: 200,
  },
});

const emit = defineEmits(["scroll"]);

const containerRef = ref<HTMLDivElement | null>(null);
const viewportRef = ref<HTMLDivElement | null>(null);

// 存储每个元素的高度和位置信息
const itemSizes = reactive<{ [key: string | number]: ItemSize }>({});
// 存储可见区域内的元素
const visibleItems = ref<VisibleItem[]>([]);
// 列表总高度
const totalHeight = computed(() => {
  if (props.items.length === 0) return 0;
  const lastItem = props.items[props.items.length - 1];
  const size = itemSizes[lastItem.id] || {
    bottom: props.estimatedItemSize * props.items.length,
  };
  return size.bottom;
});

// 计算可见区域的元素
const calculateVisibleItems = () => {
  if (!containerRef.value) return;

  const { scrollTop, clientHeight } = containerRef.value;
  const start = scrollTop - props.buffer;
  const end = scrollTop + clientHeight + props.buffer;

  let visibleStart = 0;
  let visibleEnd = props.items.length - 1;

  // 找到可见区域的起始和结束索引
  for (let i = 0; i < props.items.length; i++) {
    const item = props.items[i];
    const size = itemSizes[item.id] || {
      top: i * props.estimatedItemSize,
      bottom: (i + 1) * props.estimatedItemSize,
    };

    if (size.bottom >= start) {
      visibleStart = i;
      break;
    }
  }

  for (let i = props.items.length - 1; i >= 0; i--) {
    const item = props.items[i];
    const size = itemSizes[item.id] || {
      top: i * props.estimatedItemSize,
      bottom: (i + 1) * props.estimatedItemSize,
    };

    if (size.top <= end) {
      visibleEnd = i;
      break;
    }
  }

  // 更新可见元素列表
  visibleItems.value = [];
  for (let i = visibleStart; i <= visibleEnd; i++) {
    const item = props.items[i];
    const size = itemSizes[item.id] || {
      top: i * props.estimatedItemSize,
      height: props.estimatedItemSize,
    };

    visibleItems.value.push({
      id: item.id,
      index: i,
      top: size.top,
      data: item,
    });
  }

  emit("scroll", {
    scrollTop,
    scrollHeight: totalHeight.value,
    clientHeight,
  });
};

// 处理滚动事件
const handleScroll = () => {
  calculateVisibleItems();
};

// 测量元素高度并更新缓存
const measureItems = () => {
  if (!viewportRef.value) return;

  const children = viewportRef.value.children;
  let hasNewMeasurements = false;

  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
    const index = visibleItems.value[i]?.index;

    if (index !== undefined) {
      const item = props.items[index];
      const height = child.offsetHeight;

      // 如果高度变化或尚未测量，更新尺寸信息
      if (!itemSizes[item.id] || itemSizes[item.id].height !== height) {
        // 计算当前元素的顶部位置
        const prevItem = index > 0 ? props.items[index - 1] : null;
        const prevBottom = prevItem
          ? itemSizes[prevItem.id]?.bottom || index * props.estimatedItemSize
          : 0;

        itemSizes[item.id] = {
          height,
          top: prevBottom,
          bottom: prevBottom + height,
        };

        // 更新后续元素的位置
        for (let j = index + 1; j < props.items.length; j++) {
          const nextItem = props.items[j];
          const prevItem = props.items[j - 1];
          const prevBottom =
            itemSizes[prevItem.id]?.bottom || j * props.estimatedItemSize;

          if (itemSizes[nextItem.id]) {
            const height = itemSizes[nextItem.id].height;
            itemSizes[nextItem.id] = {
              ...itemSizes[nextItem.id],
              top: prevBottom,
              bottom: prevBottom + height,
            };
          } else {
            break; // 如果遇到未测量的元素，停止更新
          }
        }

        hasNewMeasurements = true;
      }
    }
  }

  // 如果有新的测量结果，重新计算可见元素
  if (hasNewMeasurements) {
    calculateVisibleItems();
  }
};

// 初始化和监听变化
onMounted(() => {
  calculateVisibleItems();

  // 使用MutationObserver监听内容变化
  const observer = new MutationObserver(() => {
    nextTick(() => {
      measureItems();
    });
  });

  if (viewportRef.value) {
    observer.observe(viewportRef.value, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });
  }

  // 初始测量
  nextTick(() => {
    measureItems();
  });
});

// 监听props.items变化
watch(
  () => props.items,
  () => {
    // 重置尺寸缓存
    const newIds = new Set(props.items.map((item) => item.id));
    Object.keys(itemSizes).forEach((key) => {
      if (!newIds.has(key)) {
        delete itemSizes[key];
      }
    });

    calculateVisibleItems();
    nextTick(() => {
      measureItems();
    });
  }
);
</script>

<style scoped lang="scss">
.virtual-list-container {
  position: relative;
  overflow: auto;
  height: 100%;
}

.virtual-list-placeholder {
  position: relative;
  width: 100%;
}

.virtual-list-viewport {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .virtual-list-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
