<template>
  <div class="rich-text-editor-quill-container">
    <input
      type="file"
      ref="fileUpload"
      accept="image/png"
      style="display: none"
      @change="handleFileUpload"
    />
    <div class="editor-container">
      <div id="editor"></div>
    </div>
    <div class="content">
      <div v-html="editorHtmlContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="RichTextEditorQuill">
import Quill from "quill";
import { onMounted, ref, useTemplateRef } from "vue";
import imageResize from "quill-image-resize-module--fix-imports-error";
Quill.register("modules/imageResize", imageResize);

let quill: any = null;
const editorHtmlContent = ref("");
const fileUpload = useTemplateRef("fileUpload");
function initQuill() {
  quill = new Quill("#editor", {
    theme: "snow",
    placeholder: "请输入内容...",
    modules: {
      imageResize: {
        // ...
        handleStyles: {
          backgroundColor: "black",
          border: "none",
          color: "white",
          // other camelCase styles for size display
        },
      },
      toolbar: {
        container: [
          { header: [1, 2, 3, 4, 5, 6, false] }, // 标题
          "bold", // 加粗
          "italic", // 斜体
          "blockquote", // 引用
          "link", // 超链接
          "image", // 插入图片
          "video", // 插入视频
          "code", // 行内代码
          "code-block", // 代码块
          { color: [] }, // 颜色"
          { list: "bullet" }, // 无序列表
          { list: "ordered" }, // 有序列表
          "strike", // 删除线
          { align: [] }, // 对齐方式
          "formula", // 公式
        ],
        handlers: {
          image: handleImage,
        },
      },
    },
  });
  quill.on("editor-change", function (delta: any, oldDelta: any, source: any) {
    editorHtmlContent.value = quill.getSemanticHTML();
  });
}

async function handleImage() {
  fileUpload.value?.click();
}
function handleFileUpload(e: any) {
  const file = e.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    fetch("http://localhost:3001/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        quill.insertEmbed(quill.getSelection().index, "image", res.fileUrl);
        quill.setSelection(quill.getSelection().index + 1);
      });
  }
}

onMounted(() => {
  initQuill();
});
</script>

<style lang="scss" scoped>
.rich-text-editor-quill-container {
  display: flex;
  height: 100%;
  .editor-container {
    flex: 1;
    height: calc(100% - 45px);
    :deep(.ql-toolbar) {
      border: 2px solid red;
    }
    #editor {
      border: 2px solid green;
    }
  }
  :deep(.content) {
    flex: 1;
    width: 100%;
    border: 2px solid blue;
  }
}
</style>
