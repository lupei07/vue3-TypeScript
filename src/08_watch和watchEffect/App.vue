<!--
 * @Author: lu
 * @Date: 2021-07-14 17:08:24
 * @LastEditTime: 2021-07-15 19:00:37
 * @FilePath: \vue3-typescript\src\App.vue
 * @Description: 
-->
<template>
  <fieldset>
    <legend>姓名</legend>姓氏：
    <input type="text" v-model="user.firstName" />
    <br />名字：
    <input type="text" v-model="user.lastName" />
    <br />
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>姓名：
    <input type="text" v-model="fullName1" />
    <br />姓名：
    <input type="text" v-model="fullName2" />
    <br />姓名：
    <input type="text" />
    <br />
  </fieldset>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const user = reactive({
      firstName: "东方",
      lastName: "不败"
    });

    // 只有getter的计算属性
    const fullName1 = computed(() => {
      return user.firstName + "_" + user.lastName;
    });
    // 有getter与setter的计算属性
    const fullName2 = computed({
      get() {
        return user.firstName + "_" + user.lastName;
      },
      set(val: string) {
        const names = val.split("_");
        user.firstName = names[0];
        user.lastName = names[1];
      }
    });
    return {
      user,
      fullName1,
      fullName2
    };
  }
});
</script>
<style scoped>
</style>