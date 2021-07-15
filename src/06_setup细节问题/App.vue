<!--
 * @Author: lu
 * @Date: 2021-07-14 17:08:24
 * @LastEditTime: 2021-07-15 16:26:30
 * @FilePath: \vue3-typescript\src\App.vue
 * @Description: 
-->
<template>
  <h2>APP父级组件</h2>
  <h3>{{msg}}</h3>
  <button @click="updateMsg">更新信息</button>
  <hr />
  <Child :msg="msg" msg2="kkk" @ok="changeMsg" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// 引入子级组件Child
import Child from "./components/Child.vue";
export default defineComponent({
  name: "App",
  components: { Child },
  setup() {
    const msg = ref("what are you say");
    const updateMsg = () => {
      msg.value += "====";
    };
    const changeMsg = (txt: string) => {
      msg.value += txt;
    };
    return {
      msg,
      updateMsg,
      changeMsg
    };
  }
});
</script>

<style>
</style>
