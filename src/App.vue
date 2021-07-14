<!--
 * @Author: lu
 * @Date: 2021-07-14 17:08:24
 * @LastEditTime: 2021-07-14 20:01:32
 * @FilePath: \vue3-typescript\src\App.vue
 * @Description: 
-->
<template>
  <h2>setup和ref的基本使用</h2>
  <h3>{{count}}</h3>
  <button @click="updateCount">点击</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  // 需求：页面打开后可以直接看到一个数据，点击按钮后，该数据可以发生变化
  name: "App",
  // vue2 的方式实现
  // data() {
  //   return {
  //     count: 0
  //   };
  // },
  // methods: {
  //   updateCount() {
  //     this.count++;
  //   }
  // }
  // vue3 的方式实现
  // setup是组合API的入口函数
  setup() {
    // 变量
    // let count = 0; // 此时的数据并不是响应式的数据（响应式数据：数据变化，页面跟着渲染变化）
    // ref是一个函数，作用：定义一个响应式的数据，返回的是一个REF对象，对象中有一个value属性，如果需要对数据进行操作，需要使用Ref对象调用value属相的方式来进行数据的操作
    // html模板中是不需要使用.value属性的写法
    // 一般用来定义一个基本类型的响应式数据
    let count = ref(0);
    // 方法
    function updateCount() {
      // 报错的原因：count是一个Ref对象，对象不能进行++的操作
      // count++
      count.value++;
    }
    return {
      count,
      updateCount
    };
  }
});
</script>

<style>
</style>
