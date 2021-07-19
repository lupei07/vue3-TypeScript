<!--
 * @Author: lu
 * @Date: 2021-07-19 13:37:59
 * @LastEditTime: 2021-07-19 13:42:38
 * @FilePath: \vue3-TypeScript\src\components\Son.vue
 * @Description: 
-->
<template>
  <h2>子组件</h2>
  <hr />
  <GrandSon />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import GrandSon from "./GrandSon.vue";
export default defineComponent({
  name: "Son",
  components: { GrandSon },
  setup() {
    return {};
  }
});
</script>
<style scoped>
</style>