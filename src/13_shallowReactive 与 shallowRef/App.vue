<template>
  <h2>shallowReactive 与 shallowRef</h2>
  <hr />
  <h3>m1:{{m1}}</h3>
  <h3>m2:{{m2}}</h3>
  <h3>m3:{{m3}}</h3>
  <h3>m4:{{m4}}</h3>
  <button @click="update">更新</button>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  shallowReactive,
  ref,
  shallowRef
} from "vue";
export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const m1 = reactive({
      name: "热巴",
      age: 28,
      car: {
        name: "卡宴",
        color: "red"
      }
    });
    const m2 = shallowReactive({
      name: "热巴",
      age: 28,
      car: {
        name: "卡宴",
        color: "red"
      }
    });
    const m3 = ref({
      name: "热巴",
      age: 28,
      car: {
        name: "卡宴",
        color: "red"
      }
    });
    const m4 = shallowRef({
      name: "热巴",
      age: 28,
      car: {
        name: "卡宴",
        color: "red"
      }
    });
    const update = () => {
      //   m1.name += "++";
      //   m1.car.name += "++"; // 深响应
      //   m2.name += "++";
      //   m2.car.name += "++";
      //   m3.value.name += "+";
      //   m3.value.car.name += "++"; // 深响应
      //   m4.value.name += "++"; // 不能修改 因为数据是个对象
      //   m4.value.car.name += "++"; // 不能修改
    };
    return {
      m1,
      m2,
      m3,
      m4,
      update
    };
  }
});
</script>
<style scoped>
</style>