<!--
 * @Author: lu
 * @Date: 2021-07-19 13:40:00
 * @LastEditTime: 2021-07-19 13:46:48
 * @FilePath: \vue3-TypeScript\src\components\GrandSon.vue
 * @Description: 
-->
<template>
  <h2 :style="{color}">孙子组件</h2>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";
export default defineComponent({
  name: "GrandSon",
  components: {},
  setup() {
    // 注入的操作
    const color = inject("color");
    return { color };
  }
});
</script>
<style scoped>
</style>