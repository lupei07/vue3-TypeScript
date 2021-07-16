<!--
 * @Author: lu
 * @Date: 2021-07-14 17:08:24
 * @LastEditTime: 2021-07-16 10:17:30
 * @FilePath: \vue3-typescript\src\App.vue
 * @Description: 
-->
<template>
  <h2>App</h2>
  <button @click="isShow=!isShow">切换</button>
  <hr />
  <Child v-if="isShow" />
</template>

<script lang="ts">
import Child from "./Child.vue";
export default {
  data() {
    return {
      isShow: true
    };
  },

  components: {
    Child
  }
};
</script>
<style scoped>
</style>