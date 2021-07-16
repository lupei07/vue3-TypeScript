<template>
  <h2>收集用户鼠标点击的页面坐标</h2>
  <h3>x:{{x}} y:{{y}}</h3>
  <hr />
  <h3 v-if="loading">加载中。。。</h3>
  <h3 v-else-if="errorMsg">错误信息：{{errorMsg}}</h3>
  <ul v-else>
    <li>{{data.name}}</li>
    <li>{{data.address}}</li>
    <li>{{data.age}}</li>
  </ul>
  <hr />
  <ul v-for="item in data" :key="item.id">
    <li>{{item.id}}</li>
    <li>{{item.title}}</li>
    <li>{{item.price}}</li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, watch } from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useRequest from "./hooks/useRequest";

// 定义接口，约束对象的类型
interface IAddressData {
  name: string;
  address: string;
  age: number;
}
interface IProductsData {
  id: number;
  title: string;
  price: number;
}

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const { x, y } = useMousePosition();
    // const x = ref(-1);
    // const y = ref(-1);

    // // 点击事件的回调函数
    // const clickHandler = (event: MouseEvent) => {
    //   x.value = event.pageX;
    //   y.value = event.pageY;
    // };

    // // 页面已经加载完毕了，再进行点击的操作
    // onMounted(() => {
    //   window.addEventListener("click", clickHandler);
    // });
    // // 页面卸载之前的生命周期组合API
    // onBeforeUnmount(() => {
    //   window.removeEventListener("click", clickHandler);
    // });

    // const { loading, errorMsg, data } = useRequest<IAddressData>("/data/address.json"); // 对象
    const { loading, errorMsg, data } = useRequest<IProductsData[]>(
      "/data/products.json"
    ); // 数组

    watch(data, () => {
      if (data.value) {
        console.log(data.value.length); // 如果没有泛型定义  飘红
      }
    });
    return {
      x,
      y,
      data,
      loading,
      errorMsg
    };
  }
});
</script>
<style scoped>
</style>