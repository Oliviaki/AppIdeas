<template>
  <div class="book-finder-app-container">
    <div class="search">
      <el-input
        v-model.trim="keyWord"
        style="max-width: 50%"
        placeholder="请输入您需要查询的关键字内容"
        class="input-with-select"
        @change="getBooksList"
        clearable
      >
        <template #prepend>
          <el-select
            v-model="selectSearchType"
            placeholder=" 请选择查询条件"
            style="width: 115px"
          >
            <el-option label="标题" value="intitle" />
            <el-option label="作者" value="inauthor" />
            <el-option label="出版商" value="inpublisher" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="getBooksList" />
        </template>
      </el-input>
    </div>
    <div class="content" v-loading="isLoading">
      <el-card
        style="max-width: 100%"
        class="book-card"
        v-for="item in booksList"
        :key="item.id"
      >
        <div class="book">
          <div class="book-img">
            <el-image
              v-if="item.volumeInfo.imageLinks"
              style="width: 130px; height: 190px"
              :src="item.volumeInfo.imageLinks.smallThumbnail"
              fit="fill"
              lazy
            >
              <template #error
                ><el-empty description="加载失败" :image-size="50"
              /></template>
              <template #placeholder
                ><div
                  v-loading="true"
                  element-loading-text="加载中"
                  :style="{ width: '100%', height: '100%' }"
                ></div
              ></template>
            </el-image>
            <el-image
              v-else
              style="width: 130px; height: 190px"
              src="https://picsum.photos/130/190"
              fit="fill"
              lazy
            />
          </div>
          <div class="book-info">
            <h2 class="book-title">标题:{{ item.volumeInfo.title }}</h2>
            <h3 class="book-author">
              作者:{{ item.volumeInfo.authors?.[0] || "暂无" }}
            </h3>
            <div class="book-public-date">
              发布日期:{{ item.volumeInfo.publishedDate || "暂无" }}
            </div>
            <div class="book-desc">
              描述:{{ item.volumeInfo.description || "暂无" }}
            </div>
          </div>
          <div class="book-more">
            <el-button @click="handleMore(item.volumeInfo.infoLink)"
              >查看更多</el-button
            >
          </div>
        </div>
      </el-card>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="sizes, prev, pager, next,->, total"
        :total="total"
        @change="handlePageChange"
        :page-sizes="[10, 20, 30, 40]"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="BookFinderApp">
import { getBooksListApi } from "./api";
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const selectSearchType = ref("intitle");
const keyWord = ref("");
const booksList = ref<any>([]);
const isLoading = ref(false);
const startIndex = ref(0);
const total = ref(0);
const maxResults = ref(10);

async function getBooksList() {
  if (!keyWord.value) {
    ElMessage.error("请输入关键字");
    keyWord.value = "";
    return;
  }
  try {
    isLoading.value = true;
    const searchParams = `${selectSearchType.value}:${keyWord.value}`;
    const res = await getBooksListApi({
      q: searchParams,
      startIndex: startIndex.value,
      maxResults: maxResults.value,
    });
    booksList.value = (res as any).items;
    total.value = (res as any).totalItems;
  } finally {
    isLoading.value = false;
  }
}
function handleMore(link: string) {
  window.open(link);
}
function handlePageChange(currentPage: number, pageSize: number) {
  startIndex.value = (currentPage - 1) * pageSize;
  maxResults.value = pageSize;
  getBooksList();
}
</script>

<style lang="scss" scoped>
@use "@/assets/css/mixin.scss" as *;
.book-finder-app-container {
  position: relative;
  width: 100%;
  height: 100%;
  .search {
    @include bg("bg_book.png");
    height: 100px;
    @include flex();
    margin-bottom: 10px;
  }
  .content {
    height: calc(100% - 110px);
    overflow-y: auto;
    .book-card {
      margin-bottom: 10px;
      :deep(.book) {
        @include flex(space-between);

        .book-img {
          margin-right: 10px;
          .el-image {
            border-radius: 4px;
            background-color: #e4e7ed;
          }
        }
        .book-info {
          margin-right: auto;
          .book-title {
            font-size: 24px;
            margin-bottom: 10px;
          }
          .book-author {
            font-size: 20px;
            margin-bottom: 10px;
          }
          .book-public-date {
            font-size: 18px;
            margin-bottom: 10px;
          }
          .book-desc {
            overflow-y: auto;
            width: 100%;
            height: 80px;
            font-size: 20px;
          }
        }
        .book-more {
          margin-left: 20px;
        }
      }
    }
  }
  .pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
  }
}
</style>
