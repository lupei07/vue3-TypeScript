<template>
  <h2>toRef的使用和特点</h2>
  <h3>state:{{ state }}</h3>
  <h3>age:{{ age }}</h3>
  <h3>money:{{ money }}</h3>
  <hr />
  <button @click="update">更新数据</button>
  <hr />
  <Child :age="age" :money="money" />
</template>
<script lang="ts">
import { defineComponent, reactive, toRef, ref } from "vue";
import Child from "./components/Child.vue";
export default defineComponent({
  name: "App",
  components: { Child },
  setup() {
    const state = reactive({
      age: 5,
      money: 100
    });
    // 把响应式数据state对象中的某个属性age变成了ref对象
    const age = toRef(state, "age");

    // 把响应式对象中的某个属性使用ref进行包装，变成了一个ref对象
    const money = ref(state.money);

    // 更新数据
    const update = () => {
      state.age += 2; // state,age 两个都改变
      // age.value += 3; // state,age 两个都改变

      // state.money = +100; // 没作用
      money.value += 200; // state数据不变 money 变化
    };

    return {
      state,
      age,
      money,
      update
    };
  }
});
</script>
<style scoped></style>
