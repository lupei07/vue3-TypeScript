<!--
 * @Author: lu
 * @Date: 2021-07-14 17:08:24
 * @LastEditTime: 2021-07-15 17:39:32
 * @FilePath: \vue3-typescript\src\App.vue
 * @Description: 
-->
<template>
  <h2>App</h2>
  <p>m1: {{m1}}</p>
  <p>m2: {{m2}}</p>
  <p>m3: {{m3}}</p>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import { reactive, ref } from "vue";

export default {
  setup() {
    const m1 = ref("abc");
    const m2 = reactive({ x: 1, y: { z: "abc" } });

    // 使用ref处理对象  ==> 对象会被自动reactive为proxy对象
    const m3 = ref({ a1: 2, a2: { a3: "abc" } });
    console.log(m1, m2, m3);
    console.log(m3.value.a2); // 也是一个proxy对象

    function update() {
      m1.value += "--";
      m2.x += 1;
      m2.y.z += "++";

      m3.value = { a1: 3, a2: { a3: "abc---" } };
      m3.value.a2.a3 += "=="; // reactive对对象进行了深度数据劫持
      console.log(m3.value.a2);
    }

    return {
      m1,
      m2,
      m3,
      update
    };
  }
};
</script>

<style>
</style>
