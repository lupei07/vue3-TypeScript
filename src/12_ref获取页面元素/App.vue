<template>
  <h2>ref的另一个作用：可以获取页面中的元素</h2>
  <input type="text" ref="inputRef" />
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  name: "App",
  components: {},
  setup() {
    // 需求：当页面加载完毕后，页面中的文本框可以自动获取焦点

    // 默认是空的，页面加载完毕，说明组件已经存在
    const inputRef = ref<HTMLElement | null>(null);

    //   页面加载后的生命周期组合API
    onMounted(() => {
      inputRef.value && inputRef.value.focus(); // 自动获取焦点
    });

    return {
      inputRef
    };
  }
});
</script>
<style scoped>
</style>