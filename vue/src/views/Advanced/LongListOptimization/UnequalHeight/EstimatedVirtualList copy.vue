<template>
  <div class="estimated-virtual-list-container">
    <div class="estimated-virtual-list-content" ref="contentRef">
      <div class="estimated-virtual-list-list" ref="listRef">
        <div
          class="estimated-virtual-list-item"
          v-for="item in renderList"
          :key="item.id"
          :id="item.id"
        >
          <slot name="item" :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="EstimatedVirtualList">
import {
  computed,
  nextTick,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  useTemplateRef,
  watch,
} from "vue";

interface Props {
  dataSource?: any[];
  estimatedHeight?: number;
}

interface IPopsInfo {
  index: number; //当前pos对应的元素的索引
  height: number; //元素高度
  top: number; //元素顶部所处位置
  bottom: number; //元素底部所处位置
  dHeight: number; //∥高度差判蜥是否需要更新
}

const props = withDefaults(defineProps<Props>(), {
  dataSource: () => [],
  estimatedHeight: 100,
});

const emits = defineEmits<{
  (e: "getMoreData"): void;
}>();

const positions = ref<IPopsInfo[]>([]);

const state = reactive({
  viewHeight: 0,
  listHeight: 0,
  startIndex: 0,
  maxCount: 0,
  preLen: 0,
});

const contentRef = useTemplateRef("contentRef");

const listRef = useTemplateRef("listRef");

const endIndex = computed(() => {
  return Math.min(props.dataSource.length, state.startIndex + state.maxCount);
});

const renderList = computed(() => {
  return props.dataSource.slice(state.startIndex, endIndex.value);
});

//初始化：拿到数据源初始化pos数组
function initPosition() {
  const pos: IPopsInfo[] = [];
  for (let i = 0; i < props.dataSource.length; i++) {
    pos.push({
      index: i,
      height: props.estimatedHeight,
      top: i * props.estimatedHeight,
      bottom: (i + 1) * props.estimatedHeight,
      dHeight: 0,
    });
  }
  positions.value = [...positions.value, ...pos];
}

//数据item渲染完成后，更新数据item的真实高度
function setPosition() {
  const nodes = listRef.value?.children;
  if (!nodes || !nodes.length) return;
  Array.from(nodes).forEach((node) => {
    const rect = node.getBoundingClientRect();
    const item = positions.value[+node.id];
    const dHeight = item.height - rect.height;
    if (dHeight) {
      item.height = rect.height;
      item.bottom = item.bottom - dHeight;
      item.dHeight = dHeight;
    }
  });
  const startId = +nodes[0].id;
  let startHeight = positions.value[startId].height;
  positions.value[startId].dHeight = 0;
  for (let i = startId + 1; i < positions.value.length; i++) {
    const item = positions.value[i];
    item.top = positions.value[i - 1].bottom;
    item.bottom = item.bottom - startHeight;
    if (item.dHeight !== 0) {
      startHeight += item.height;
      item.dHeight = 0;
    }
  }
  state.listHeight = positions.value[positions.value.length - 1].bottom;
}

function binarySearch(list: IPopsInfo[], value: number) {
  let left = 0;
  let right = list.length - 1;
  let templateIndex = -1;
  while (left < right) {
    const midIndex = Math.floor((left + right) / 2);
    const midValue = list[midIndex].bottom;
    if (midValue === value) return midIndex;
    else if (midValue < value) left = midIndex + 1;
    else if (midValue > value) {
      if (templateIndex === -1 || templateIndex > midIndex)
        templateIndex = midIndex;
      right = midIndex;
    }
  }
  return templateIndex;
}
function handleScroll() {
  const { scrollTop, clientHeight, scrollHeight } = contentRef.value!;
  state.startIndex = binarySearch(positions.value, scrollTop);
  const bottom = scrollHeight - clientHeight - scrollTop;
  if (bottom <= 20) {
    emits("getMoreData");
  }
}

function init() {
  state.viewHeight = contentRef.value ? contentRef.value.offsetHeight : 0;
  state.maxCount = Math.ceil(state.viewHeight / props.estimatedHeight) + 1;
  contentRef.value && contentRef.value.addEventListener("scroll", handleScroll);
}

watch(
  () => props.dataSource.length,
  () => {
    props.dataSource.length && initPosition();
    nextTick(() => {
      props.dataSource.length && setPosition();
    });
  }
);

watch(
  () => state.startIndex,
  () => {
    setPosition();
  }
);

onBeforeMount(() => {
  contentRef.value &&
    contentRef.value.removeEventListener("scroll", handleScroll);
});
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.estimated-virtual-list-container {
  width: 100%;
  height: 100%;
  .estimated-virtual-list-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    .estimated-virtual-list-list {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
