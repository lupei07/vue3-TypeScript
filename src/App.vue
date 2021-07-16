<template>
  <h2>toRefs的使用</h2>
  <ul>
    <li>state1:{{state1.name}}</li>
    <li>state1:{{state1.age}}</li>
  </ul>
  <ul>
    <li>state2:{{name}}</li>
    <li>state2:{{age}}</li>
  </ul>
  <ul>
    <li>state4:{{name2}}</li>
    <li>state4:{{age2}}</li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

function useFeatureX() {
  const state4 = reactive({
    name2: "wb",
    age2: 12
  });
  return {
    ...toRefs(state4)
  };
}

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const state1 = reactive({
      name: "QQ",
      age: 10
    });
    const state2 = reactive({
      name: "wx",
      age: 10
    });

    // toRefs可以把一个响应式对象转换成普通对象，该普通对象的每个 `property` 都是一个`ref`
    const state3 = toRefs(state1);
    // const {name,age}=toRefs(state1); // 也可以直接解构写

    console.log("useFeatureX", useFeatureX());
    const { name2, age2 } = useFeatureX();

    // 定时器，更新数据
    setInterval(() => {
      // 更新state1的数据（如果数据变化了，界面也变化了，说明state1是响应式数据）
      state1.name += "++";
      // 更新state2的数据（如果数据变化了，界面没有变化了，说明state2解构出来的数据name不是响应式数据）
      state2.name += "--";
      // 更新state3的数据 (如果数据变化了，界面也变化了，说明state3解构出来的数据name是ref响应式数据)
      state3.name.value += ">>";
      name2.value += "--";
    }, 1000);
    return {
      state1,
      ...state2, // 不是响应式数据了
      ...state3, // toRefs返回来的对象 此时是ref的响应式数据  改变时用.value
      name2,
      age2
    };
  }
});
</script>
<style scoped>
</style>