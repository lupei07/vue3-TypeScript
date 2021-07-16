<template>
  <h2>readonly 与 shallowReadonly</h2>
  <h3>{{ state2 }}</h3>
  <hr />
  <button @click="update">更新</button>
</template>
<script lang="ts">
import { defineComponent, reactive, readonly, shallowReadonly } from "vue";
export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const state = reactive({
      name: "长歌",
      age: 18,
      car: {
        name: "劳斯莱斯",
        color: "red"
      }
    });
    // const state2 = readonly(state);
    const state2 = shallowReadonly(state);

    const update = () => {
      // readonly ---- 深只读
      // state2.name += "++"; // 报错
      // state2.car.name += "++"; // 报错
      // shallowReadonly ---- 浅只读
      // state2.name += "++"; // 报错
      state2.car.name += "++"; // 成功
    };

    return {
      state2,
      update
    };
  }
});
</script>
<style scoped></style>
