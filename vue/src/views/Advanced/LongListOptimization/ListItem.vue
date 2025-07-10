<template>
  <div class="list-item-container">
    <div class="list-item-id">id:{{ itemData.id }}</div>
    <div class="list-item-name">name:{{ itemData.name }}</div>
    <div class="list-item-count">count:{{ itemData.count }}</div>
  </div>
</template>

<script setup lang="ts" name="ListItem">
interface Props {
  itemData: { id: number; name: string; count: number };
}
defineProps<Props>();
</script>

<style lang="scss" scoped>
.list-item-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  padding: 0.5rem;
  background-color: cadetblue;
  box-sizing: border-box;
}
</style>
