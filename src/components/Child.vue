<template>
  <h2>Child子级组件</h2>
  <h3>msg：{{msg}}</h3>
  <!-- <h3>count：{{count}}</h3> -->
  <button @click="emitFn">分发事件</button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Child",
  props: ["msg"],
  //   setup是在beforeCreate生命周期回调之前就执行了，而且就执行一次
  //   由此可以推断出：setup在执行的时候，当前的组件还没有创建出来，也就意味着：组件实例对象this根本不能用
  // this是undefined，说明，就不能通过this再去调用data/computed/methods/props中的相关内容

  // setup中的返回值是一个对象，内部的属性和方法是给html模板使用的
  //   setup中的对象内部的属性和data函数中的return对象的属性都可以在html模板中使用

  //   数据初始化的生命周期
  beforeCreate() {
    console.log("beforeCreate执行了", this); // 后执行  Proxy{}
  },
  setup(props, context) {
    //   setup(props, { attrs, slots, emit }) {
    //   props参数，是一个对象，里面有父级组件向子级组件传递的数据
    // context参数，是一个对象，里面有attrs对象（获取当前组件标签上所有的的属性的对象，但是该属性是在props中没有声明的所有的属性对象），emit方法（分发事件的），slots对象（插槽）
    console.log("props", props);
    console.log("context", context.attrs.msg2);
    console.log("setup执行了", this); // 先执行了  undefined
    const emitFn = () => {
      context.emit("ok", "++");
    };
    return { emitFn };
  }
  //   data() {
  //     return {
  //       count: 10
  //     };
  //   }
});
</script>
<style scoped>
</style>