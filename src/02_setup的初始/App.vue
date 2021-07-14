<!--
 * @Author: lu
 * @Date: 2021-07-14 17:08:24
 * @LastEditTime: 2021-07-14 19:44:29
 * @FilePath: \vue3-typescript\src\App.vue
 * @Description: 
-->
<template>
  <div>{{number}}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  // setup 是组合API中第一个要使用的函数
  setup() {
    const number = 10;
    return {
      number
    };
  }
});
</script>

<style>
</style>
