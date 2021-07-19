<!--
 * @Author: lu
 * @Date: 2021-07-19 10:20:27
 * @LastEditTime: 2021-07-19 13:06:18
 * @FilePath: \vue3-TypeScript\src\App.vue
 * @Description: 
-->
<template>
  <h2>CustomRef的使用</h2>
  <input type="text" v-model="keyword" />
  <hr />
  {{keyword}}
</template>
<script lang="ts">
import { defineComponent, ref, customRef } from "vue";
// 自定义 hook 防抖函数
// value 传入的数据,将来数据类型不确定,所以,用泛型,delay防抖的间隔时间,默认是200毫秒
function useDebounceRef<T>(value: T, delay = 200) {
  // 准备一个存储定时器的id的变量
  let timeOutId: number;
  return customRef((trace, trigger) => {
    return {
      // 返回数据
      get() {
        // 告诉Vue追踪数据
        trace();
        return value;
      },
      // 设置数据
      set(newValue: T) {
        // 清除定时器
        clearTimeout(timeOutId);
        // 开启定时器
        setTimeout(() => {
          value = newValue;
          // 告诉Vue更新界面
          trigger();
        }, delay);
      }
    };
  });
}
export default defineComponent({
  name: "App",
  setup() {
    // const keyword = ref("abc");
    const keyword = useDebounceRef("abc", 2000);
    return {
      keyword
    };
  }
});
</script>
<style scoped></style>
