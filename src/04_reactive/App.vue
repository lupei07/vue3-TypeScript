<!--
 * @Author: lu
 * @Date: 2021-07-14 17:08:24
 * @LastEditTime: 2021-07-15 11:00:09
 * @FilePath: \vue3-typescript\src\App.vue
 * @Description: 
-->
<template>
  <h2>reactive</h2>
  <h3>姓名：{{user.name}}</h3>
  <h3>年龄：{{user.age}}</h3>
  <h3>性别：{{user.gender}}</h3>
  <h3>妻子：{{user.wife}}</h3>
  <button @click="updateUser">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  // 需求：显示用户的相关信息，点击按钮，可以更新用户的相关信息数据
  name: "App",
  setup() {
    // 为了使用obj.gender的时候不出现错误提示
    // const obj: any = {
    const obj = {
      name: "小名",
      age: 22,
      wife: {
        name: "小红",
        age: 20,
        cars: ["奔驰", "宝马"]
      }
    };
    // 把数据变成响应式数据
    // 返回的是一个Proxy的代理对象，被代理的目标对象就是obj对象
    // user现在是代理对象，obj就是目标对象
    // user对象的类型是Proxy
    const user = reactive<any>(obj);

    const updateUser = () => {
      // 直接使用目标对象的方式来更新目标对象中的成员值，是不可能的，只能使用代理对象的方式来更新数据（响应式数据）
      // obj.name='小白' // 不更新数据
      user.name = "小明";
      user.age = 29;
      user.wife.cars[0] = "玛莎拉蒂";

      // user对象或者obj对象添加一个新的属性，哪一种方式会影响界面的更新
      // obj.gender = "男";
      user.gender = "男1";
      // user对象或者obj对象移除一个已经存在的属性，哪一种方式会影响界面的更新
      // delete obj.age;
      delete user.age;

      // 总结：如果操作代理对象，目标对象中的数据也会随之变化，同时如果想要在操作数据的时候，界面也要跟着重新更新渲染，那么也是操作代理对象
    };
    return {
      user,
      updateUser
    };
  }
});
</script>

<style>
</style>
