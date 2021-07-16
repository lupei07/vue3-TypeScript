<template>
  <h2>toRaw和markRaw</h2>
  <h3>{{ state }}</h3>
  <hr />
  <button @click="testToRaw">toRaw</button>
  <button @click="testMarkRaw">markRaw</button>
</template>
<script lang="ts">
import { defineComponent, reactive, toRaw, markRaw } from "vue";

interface UserInfo {
  name: string;
  age: number;
  likes?: string[];
}
export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const state = reactive<UserInfo>({
      name: "阿隼",
      age: 20
    });
    const testToRaw = () => {
      // 把代理对象编程了普通对象了，数据变化，界面不变化
      const user = toRaw(state);
      user.name = "阿诗勒隼"; // 界面没有发生变化
    };
    const testMarkRaw = () => {
      const likes = ["长歌", "长歌"];
      // state.likes = likes; // 改变
      // state.likes[0] = "长歌歌"; // 改变

      // markRaw 标记的对象数据，从此以后都不能再成为代理对象了
      state.likes = markRaw(likes);
      setTimeout(() => {
        if (state.likes) {
          state.likes[0] = "长歌歌"; // 不改变
        }
      }, 1000);
    };
    return { state, testToRaw, testMarkRaw };
  }
});
</script>
<style scoped></style>
