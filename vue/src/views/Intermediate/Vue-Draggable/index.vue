<template>
  <div class="vue-draggable-container" ref="draggable-container">
    <div class="left">
      <h3>表单组件库</h3>
      <VueDraggable
        v-model="componentList"
        :animation="150"
        :group="{ name: 'form', pull: 'clone', put: false }"
        class="left-container"
      >
        <div class="item" v-for="item in componentList" :key="item.label">
          {{ item.icon + "-" + item.label }}
        </div>
      </VueDraggable>
    </div>
    <div class="right">
      <h3>表单设计区</h3>
      <VueDraggable
        v-model="droppedComponents"
        :animation="150"
        :group="{ name: 'form', pull: false }"
        class="right-container"
      >
        <div
          v-for="item in droppedComponents"
          :key="item.id"
          class="right-container-item"
        >
          <template v-if="item.type === 'input'">
            <el-input
              v-model.trim="item.fieldName"
              placeholder="填写字段名"
              class="fieldName"
            ></el-input>
            <el-input
              v-model="item.value"
              :placeholder="item.placeholder"
            ></el-input>
          </template>
          <template v-if="item.type === 'select'">
            <el-input
              v-model.trim="item.fieldName"
              placeholder="填写字段名"
              class="fieldName"
            ></el-input>
            <el-select v-model="item.value" placeholder="请选择">
              <el-option
                v-for="optionItem in item.options"
                :key="optionItem.value"
                :label="optionItem.label"
                :value="optionItem.value"
              ></el-option>
            </el-select>
          </template>
        </div>
      </VueDraggable>
    </div>
    <el-button type="primary" class="download" @click="handleDownload"
      >下载</el-button
    >
  </div>
</template>

<script setup lang="ts" name="vue-draggable">
import { ref, useTemplateRef } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import html2canvas from "html2canvas";
interface ComponentItem {
  fieldName: string;
  value: any;
  type: string;
  label: string;
  icon: string;
  options?: Array<{ label: string; value: string }>;
  [key: string]: any;
}

const componentList = ref<ComponentItem[]>([
  {
    type: "input",
    label: "文本输入框",
    icon: "📝",
    fieldName: "", // 等待用户填写字段名
    placeholder: "请输入文本内容",
    value: "",
  },
  {
    type: "select",
    label: "下拉选择框",
    icon: "🔽",
    fieldName: "",
    value: "",
    options: [
      { label: "选项1", value: "1" },
      { label: "选项2", value: "2" },
    ],
  },
]);
const droppedComponents = ref<ComponentItem[]>([]);
const draggableContainerRef = useTemplateRef("draggable-container");

function handleDownload() {
  if (!draggableContainerRef.value) return;
  const clientWidth = draggableContainerRef.value.clientWidth;
  const clientHeight = draggableContainerRef.value.clientHeight;
  const canvas = document.createElement("canvas");
  const scale = 2;
  canvas.width = clientWidth * scale;
  canvas.height = clientHeight * scale;
  const option = {
    scale,
    with: clientWidth,
    height: clientHeight,
    useCORS: true,
    allowTaint: true,
    tainTest: false,
    backgroundColor: "#FFDAF3",
  };
  html2canvas(draggableContainerRef.value, option).then((canvas) => {
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "canvas.png";
    a.click();
  });
}
</script>

<style lang="scss" scoped>
.vue-draggable-container {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .left {
    width: 200px;
    height: 100%;
    border: 2px solid #6ca06b;
    .item {
      cursor: pointer;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    border: 2px solid #6985aa;
    &-container {
      height: 100%;
      &-item {
        cursor: pointer;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .fieldName {
          width: 200px;
        }
      }
    }
  }
  .download {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
