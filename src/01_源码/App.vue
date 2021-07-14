<!--
 * @Author: lu
 * @Date: 2021-07-14 17:08:24
 * @LastEditTime: 2021-07-14 19:41:28
 * @FilePath: \vue3-typescript\src\01_源码\App.vue
 * @Description: 
-->
<template>
  <!-- Vue2中的html模板中必须要有一堆根标签，Vue3组件的html模板中可以没有根标签 -->
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
// 这里可以使用ts代码

// defineComponent函数，目的是定义一个组件，内部可以传入一个配置对象
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

// 暴露出去一个定义好的组件
export default defineComponent({
  name: "App",
  components: {
    HelloWorld
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
