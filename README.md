<!--
 * @Author: lu
 * @Date: 2021-07-14 17:08:58
 * @LastEditTime: 2021-12-06 10:03:01
 * @FilePath: \vue3-TypeScript\README.md
 * @Description:
-->

# vue3-typescript

> [vue3 中文文档](https://vue3js.cn/docs/zh/guide/migration/introduction.html)

> [课程笔记](https://24kcs.github.io/vue3_study/)

## 创建 vue3 项目

    1. 使用 vue-cli 创建

```js
    // 安装或者升级 保证cue-cli 版本在4.5.0 以上
    npm install -g @vue/cli
    // 查看
    vue --version
```

    2. 使用 vite 创建
        - 略

## Composition API（常用部分）

> [Composition-API 手册](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#setup-%E7%BB%84%E4%BB%B6%E9%80%89%E9%A1%B9)

1. setup

   - 新的 option，所有的组合 API 函数都在此使用，只在初始化时执行一次
   - 函数如果返回对象，对象中的属性或方法，模板中可以直接使用

   ```ts
   <template>
   <div>{{number}}</div>
   </template>

   <script lang="ts">
   import { defineComponent } from "vue";

   export default defineComponent({
   name: "App",
   // setup 是组合API中第一个要使用的函数
   setup() {
       const number = 10;
       return {
       number
       };
   }
   });
   </script>
   ```

2. ref

   - 作用：定义一个数据的响应式
   - 语法：`const xxx = rel(initValue)`
     - 创建一个包含响应式数据的引用（reference）对象
     - js 中操作数据：`xxx.value`
     - 模板中操作数据：不需要.value
   - 一般用来定义一个基本类型的响应式数据

   ```ts
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
   ```

3. reactive

   - 作用：定义多个数据的响应式
   - `const proxy = reactive(obj)`：接收一个普通对象然后返回该普通对象的响应式代理器对象
   - 响应式转换是“深层的”：对影响对象背部所有嵌套的属性
   - 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的

   ```ts
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
   ```

4. 比较 Vue2 与 Vue3 的响应式（重要）

   - vue2 的响应式

     - 核心
       - 对象：通过 defineProperty 对对象的已有属性值的读取和修改进行劫持（监视/拦截）
       - 数组：通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持
     - 问题
       - 对象直接新添加的属性或删除已有属性，界面不会自动更新
       - 直接通过下标替换元素或更新 length，界面不会自动更新`arr[1]=0`

     ```js
     Object.defineProperty(data, "count", {
       get() {},
       set() {}
     });
     ```

   - vue3 的响应式

     - 核心
       - 通过 Proxy（代理）：拦截对 data 任意属性的任意（13 种）操作，包括属性值的读写，属性的添加，属性的删除等...
       - 通过 Reflect（反射）：动态对被代理的相应属性进行特定的操作
     - 原理

     ```js
     <script>
         // 目标对象
         const user = {
             name: 'ok',
             age: 20,
             friend: {
                 name: 'yes',
                 age: 18
             }
         }

         /**
         * 把目标对象变成代理对象 new Proxy(target, handler)
         * 参数1：user ----> target目标对象
         * 参数2：handler ----> 处理器对象，用来监视数据，及数据的操作
         */
         const proxyUser = new Proxy(user, {
             // 获取目标对象的某个属性值
             get(target, prop) {
                 return Reflect.get(target, prop)
             },
             // 修改目标对象的属性值/为目标对象添加新属性
             set(target, prop, val) {
                 return Reflect.set(target, prop, val)
             },
             // 删除目标对象的某个属性
             deleteProperty(garget, prop) {
                 return Reflect.deleteProperty(garget, prop)
             }
         })

         // 通过代理对象获取目标对象中的某个属性值
         console.log(proxyUser.name);
         // 设置属性
         proxyUser.name = '鸣人'
         console.log(proxyUser.name);
         console.log(proxyUser.friend.name);
         // 添加属性
         proxyUser.gender = '男'
         // 删除属性
         delete proxyUser.name;
         console.log(user);
         proxyUser.friend.name = '甜的'

     </script>
     ```

5. setup 细节

   - setup 执行的时机
     - 在 beforeCreate 之前执行（一次），此时组件对象还没有创建
     - this 是 undefined，不能通过 this 来访问 data/computed/methods/props
     - 其实所有的 composition API 相关回调函数中也都不可以
   - setup 的返回值
     - 一般都返回一个对象，为模板提供数据，也就是模板中可以直接使用对象中的所有属性/方法
     - 返回对象中的属性会与 data 函数返回对象的属性合并称为组件对象的属性
     - 返回对象中的方法会与 methods 中的方法合并成功组件对象的方法
     - 如果有重名，setup 优先
     - 注意：
       - 一般不要混合使用：methods 中可以访问 setup 提供的属性和方法，但在 setup 方法中不能访问 data 和 methods
       - setup 不能是一个 saync 函数：因为返回值不再是 return 的对象，而是 promise，模板看不到 return 对象中的属性数据
   - setup 参数
     - setup(props, context) / setup(props, {attrs, slots, emit})
     - props: 包含 props 配置声明且传入了的所有属性的对象
     - attrs: 包含没有在 props 配置中声明的属性的对象, 相当于 this.\$attrs
     - slots: 包含所有传入的插槽内容的对象, 相当于 this.\$slots
     - emit: 用来分发自定义事件的函数, 相当于 this.\$emit

   ```ts
   <template>
       <h2>APP父级组件</h2>
       <h3>{{msg}}</h3>
       <button @click="updateMsg">更新信息</button>
       <hr />
       <Child :msg="msg" msg2="kkk" @ok="changeMsg" />
   </template>

   <script lang="ts">
       import { defineComponent, ref } from "vue";
       // 引入子级组件Child
       import Child from "./components/Child.vue";
       export default defineComponent({
       name: "App",
       components: { Child },
       setup() {
           const msg = ref("what are you say");
           const updateMsg = () => {
           msg.value += "====";
           };
           const changeMsg = (txt: string) => {
           msg.value += txt;
           };
           return {
           msg,
           updateMsg,
           changeMsg
           };
       }
       });
       </script>

   ```

   ```ts
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
   ```

6. reactive 与 ref 细节

   - 是 Vue3 的 composition API 中 2 个最重要的响应式 API
   - ref 用来处理基本类型数据，reactive 是用来处理对象（递归深度响应式）
   - 如果用 ref 对象/数组，内部会自动将对象/数组转换为 reactive 的代理对象
   - ref 内部：通过给 value 属性添加 getter/setter 来实现对数据的劫持
   - reactive 内部：通过使用 Proxy 来实现对对象内部所有数据的劫持，并通过 Reflect 操作对象内部数据
   - ref 的数据操作：在 js 中要.value，在模板中不需要（内部解析模板是自动添加.value）

   ```ts
   <template>
       <h2>App</h2>
       <p>m1: {{m1}}</p>
       <p>m2: {{m2}}</p>
       <p>m3: {{m3}}</p>
       <button @click="update">更新</button>
   </template>

   <script lang="ts">
       import { reactive, ref } from "vue";

       export default {
       setup() {
           const m1 = ref("abc");
           const m2 = reactive({ x: 1, y: { z: "abc" } });

           // 使用ref处理对象  ==> 对象会被自动reactive为proxy对象
           const m3 = ref({ a1: 2, a2: { a3: "abc" } });
           console.log(m1, m2, m3);
           console.log(m3.value.a2); // 也是一个proxy对象

           function update() {
           m1.value += "--";
           m2.x += 1;
           m2.y.z += "++";

           m3.value = { a1: 3, a2: { a3: "abc---" } };
           m3.value.a2.a3 += "=="; // reactive对对象进行了深度数据劫持
           console.log(m3.value.a2);
           }

           return {
           m1,
           m2,
           m3,
           update
           };
       }
       };
   </script>
   ```

7. 计算属性与监视

   - `computed`函数：
     - 与 computed 配置功能一致
     - 只有getter
     - 有getter和setter
   - `watch`函数：
     - 与watch配置功能一致
     - 监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
     - 默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次
     - 通过配置deep为true, 来指定深度监视
   - `watchEffect`函数
     - 不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
     - 默认初始时就会执行第一次, 从而可以收集需要监视的数据
     - 监视数据发生变化时回调
  
  ```v
  <template>
    <h2>App</h2>
    fistName: <input v-model="user.firstName"/><br>
    lastName: <input v-model="user.lastName"/><br>
    fullName1: <input v-model="fullName1"/><br>
    fullName2: <input v-model="fullName2"><br>
    fullName3: <input v-model="fullName3"><br>

  </template>

  <script lang="ts">

  import {
    reactive,
    ref,
    computed,
    watch,
    watchEffect
  } from 'vue'

  export default {

    setup () {
      const user = reactive({
        firstName: 'A',
        lastName: 'B'
      })

      // 只有getter的计算属性
      const fullName1 = computed(() => {
        console.log('fullName1')
        return user.firstName + '-' + user.lastName
      })

      // 有getter与setter的计算属性
      const fullName2 = computed({
        get () {
          console.log('fullName2 get')
          return user.firstName + '-' + user.lastName
        },

        set (value: string) {
          console.log('fullName2 set')
          const names = value.split('-')
          user.firstName = names[0]
          user.lastName = names[1]
        }
      })

      const fullName3 = ref('')

      /* 
      watchEffect: 监视所有回调中使用的数据
      */
      /* 
      watchEffect(() => {
        console.log('watchEffect')
        fullName3.value = user.firstName + '-' + user.lastName
      }) 
      */

      /* 
      使用watch的2个特性:
        深度监视
        初始化立即执行
      */
      watch(user, () => {
        fullName3.value = user.firstName + '-' + user.lastName
      }, {
        immediate: true,  // 是否初始化立即执行一次, 默认是false
        deep: true, // 是否是深度监视, 默认是false
      })

      /* 
      watch一个数据
        默认在数据发生改变时执行回调
      */
      watch(fullName3, (value) => {
        console.log('watch')
        const names = value.split('-')
        user.firstName = names[0]
        user.lastName = names[1]
      })

      /* 
      watch多个数据: 
        使用数组来指定
        如果是ref对象, 直接指定
        如果是reactive对象中的属性,  必须通过函数来指定
      */
      watch([() => user.firstName, () => user.lastName, fullName3], (values) => {
        console.log('监视多个数据', values)
      })

      return {
        user,
        fullName1,
        fullName2,
        fullName3
      }
    }
  }
  </script>
  ```

   ```ts
   let person = {
     name: "张三",
     age: 28
   };

   // 监视 reactive 所定义的一个响应式数据，1.注意：此处无法正确的获取 oldValue  2. 注意：强制开启了深度监视（deep配置无效）
   watch(person, (newValue, oldValue) => {
     consle.log("person 变化了", newValue, oldValue);
   });

   // 监视 reactive 所定义的一个响应式数据中的某个属性
   watch(
     () => person.age,
     (newValue, oldValue) => {
       consle.log("person 的age变化了", newValue, oldValue);
     }
   );

   // 监视 reactive 所定义的一个响应式数据中的某些属性
   watch(
     () => person.age,
     (newValue, oldValue) => {
       consle.log("person 的age变化了", newValue, oldValue);
     }
   );
   ```

8. 生命周期

- 与 2.x 版本生命周期对应的组合式 API
- `beforeCreate` -> 使用 `setup()`
- `created` -> 使用 `setup()`
- `beforeMount` -> 使用 `onBeforeMount`
- `mounted` -> 使用 `onMounted`
- `beforeUpdate` -> 使用 `onBeforeUpdate`
- `updated` -> 使用 `onUpdated`
- `beforeDestroy` -> 使用 `onBeforeUnmount`
- `destroyed` -> 使用 `onUnmounted`
- `errorCaptured` -> 使用 `onErrorCapture`

9. 自定义 hook 函数

- 使用 Vue3 的组合 API 封装的可复用的功能函数
- 什么是 hook？-- 本质上是一个函数，把 setup 函数中使用的 Composition API 进行了封装
- 自定义 hook 的作用类似于 vue2 中的 mixin 技术
- 自定义 Hook 的优势：很清楚复用功能代码的来源，更清楚易懂
- 需求 1：收集用户鼠标垫底的 页面坐标
- `App.vue`

```ts
<template>
  <h2>收集用户鼠标点击的页面坐标</h2>
  <h3>x:{{x}} y:{{y}}</h3>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import useMousePosition from "./hooks/useMousePosition";
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

      return {
      x,
      y
      };
  }
});
</script>
```

- `hooks/useMousePosition.ts`

```ts
import { ref, onMounted, onBeforeUnmount } from "vue";
export default function() {
  const x = ref(-1);
  const y = ref(-1);

  // 点击事件的回调函数
  const clickHandler = (event: MouseEvent) => {
    x.value = event.pageX;
    y.value = event.pageY;
  };

  // 页面已经加载完毕了，再进行点击的操作
  onMounted(() => {
    window.addEventListener("click", clickHandler);
  });
  // 页面卸载之前的生命周期组合API
  onBeforeUnmount(() => {
    window.removeEventListener("click", clickHandler);
  });
  return {
    x,
    y
  };
}
```

- 利用 TS 泛型强化类型检查
- 需求 2：封装发 ajax 请求的 hook 函数
- hooks/useRequest

```ts
import axios from "axios";
import { ref } from "vue";

export default function useUrlLoader<T>(url: string) {
  // cosnt data = ref(null) // 坑
  const data = ref<T | null>(null); // 可能是数组也可能是对象
  const loading = ref(true);
  const errorMsg = ref(null);

  axios
    .get(url)
    .then(response => {
      loading.value = false;
      data.value = response.data;
    })
    .catch(e => {
      loading.value = false;
      errorMsg.value = e.message || "未知错误";
    });

  return {
    data,
    loading,
    errorMsg
  };
}
```

```ts
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
```

10. toRefs

    - 把一个响应式对象转换成普通对象，该普通对象的每个 `property` 都是一个`ref`
    - 应用：当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用
    - 问题：`reactive` 对象取出的所有属性值都是非响应式的
    - 解决：利用 `toRefs` 可以将一个响应式 `reactive` 对象的所有的原始属性转换成响应式的`ref`属性

    ```ts
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
    ```

11. ref 获取元素

    - 利用 ref 函数获取组件中的标签元素
    - 功能需求：让输入框自动获取焦点

    ```ts
    <template>
    <h2>ref的另一个作用：可以获取页面中的元素</h2>
    <input type="text" ref="inputRef" />
    </template>
    <script lang="ts">
    import { defineComponent, ref, onMounted } from "vue";
    export default defineComponent({
    name: "App",
    components: {},
    setup() {
        // 需求：当页面加载完毕后，页面中的文本框可以自动获取焦点

        // 默认是空的，页面加载完毕，说明组件已经存在
        const inputRef = ref<HTMLElement | null>(null);

        //   页面加载后的生命周期组合API
        onMounted(() => {
        inputRef.value && inputRef.value.focus(); // 自动获取焦点
        });

        return {
        inputRef
        };
    }
    });
    </script>
    ```

## Composition API（其它部分）

1. shallowReactive 与 shallowRef

   - `shallowReactive`：只处理对象内最外层属性的响应式（也就是浅响应式）
   - `shallowRef`：只处理了 value 的响应式，不进行对象的 reactive 处理
   - 什么时候使用浅响应式呢？
     - 一般情况下使用 ref 和 reactive 即可
     - 如果有一个对象数据，结构比较深，但变化时只是外层属性变化 =====> shallowReactive
     - 如果有一个对象数据，后面会产生新的对象替换 ====> shallowRef

   ```ts
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
       // 深度劫持（深监视） ---- 深度响应式
       const m1 = reactive({
       name: "热巴",
       age: 28,
       car: {
           name: "卡宴",
           color: "red"
       }
       });
       // 浅劫持（浅监视） ---- 浅响应式
       const m2 = shallowReactive({
       name: "热巴",
       age: 28,
       car: {
           name: "卡宴",
           color: "red"
       }
       });
       // 深度劫持（深监视） ---- 深度响应式 ---- 做了reactive处理
       const m3 = ref({
       name: "热巴",
       age: 28,
       car: {
           name: "卡宴",
           color: "red"
       }
       });
       // 浅劫持（浅监视） ---- 浅响应式
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
   ```

2. readonly 与 shallowReadonly

   - readonly：
     - 深度只读数据
     - 获取一个对象（响应式或纯对象）或 ref 并返回原始代理的只读代理
     - 只读代理是深层的：访问的任何嵌套 property 也是只读的
   - shallowReadonly
     - 浅只读数据
     - 创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的只读转换
   - 应用场景：
     - 在某些特定情况下，我们可能不希望对数据进行更新的操作，那就可以包装成一个只读对象来读取数据，而不能修改偶删除

   ```ts
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
   ```

3. toRaw 与 markRaw

   - toRaw
     - 返回由 `reactive` 或 `radonly` 方法转换成响应式代理的普通对象
     - 这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新
   - markRaw
     - 标记个对象，使其永远不会转换为代理，返回对象本身
     - 应用场景：
       - 有些值不应该被设置为响应式的，例如复制的第三方类实例或 Vue 组件对象
       - 当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能

   ```ts
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
   ```

4. toRef

   - 为源响应式对象上的某个属性创建一个 ref 对象，二者内部操作的是同一个数据值，更新时两者是同步的
   - 区别 ref：拷贝了一份新的数据值单独操作，更新时互相不影响
   - 应用：当要将某个 prop 的 ref 传递给复合函数时， toRef 特别有用
   - 应用场景：要将响应式对象中的某个属性单独提供给外部使用时

   ```ts
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
   ```

   ```ts
   <template>
   <h2>Child子级组件</h2>
   <h3>age:{{ age }}</h3>
   <h3>money:{{ money }}</h3>
   <h3>length:{{ length }}</h3>
   </template>
   <script lang="ts">
   import { defineComponent, Ref, computed, toRef } from "vue";
   function useGetLength(age: Ref) {
   return computed(() => {
       return age.value.toString().length;
   });
   }
   export default defineComponent({
   name: "Child",
   components: {},
   props: {
       age: {
       type: Number,
       required: true // 必须传
       },
       money: {
       type: Number,
       required: true
       }
   },
   setup(props) {
       const length = useGetLength(toRef(props, "age"));
       return {
       length
       };
   }
   });
   </script>
   <style scoped></style>
   ```

5. customRef

   > `customRef` 用于自定义一个 `ref`，可以显示地控制依赖追踪和触发响应，接受一个工厂函数，两个参数别人使用是用于追踪的 `track` 与用于触发相应的 `trigger`，并返回一个带有 `get` 和 `set` 属性的对象。

   - 使用自定义 ref 实现带防抖功能的 `v-model`：

   ```ts
   <template>
    <h2>CustomRef的使用</h2>
    <input type="text" v-model="keyword" />
    <hr />
    {{keyword}}
    </template>
    <script lang="ts">
    import { defineComponent, ref, customRef } from "vue";
    // 自定义 hook 防抖函数
    // value 传入的数据,将来数据类型不确定,所以,用泛型,delay防抖的间隔时间,默认是200毫秒
    function useDebounceRef<T>(value: T, delay = 200) {
    // 准备一个存储定时器的id的变量
    let timeOutId: number;
    return customRef((trace, trigger) => {
        return {
        // 返回数据
        get() {
            // 告诉Vue追踪数据 value 的变化
            trace();
            return value;
        },
        // 设置数据
        set(newValue: T) {
            // 清除定时器
            clearTimeout(timeOutId);
            // 开启定时器
            timeOutId = setTimeout(() => {
            value = newValue;
            // 告诉Vue更新界面
            trigger();
            }, delay);
        }
        };
    });
    }
    export default defineComponent({
    name: "App",
    setup() {
        // const keyword = ref("abc");
        const keyword = useDebounceRef("abc", 2000);
        return {
        keyword
        };
    }
    });
   ```

6. provide 与 inject
   - `provide` 和 `inject` 提供依赖注入，功能类似 2.x 的 provide/inject
   - 实现跨层级组件（祖孙）间通信
   ```ts
   <template>
   <h2>provide 与 inject</h2>
   <h3>父级组件</h3>
   {{color}}
   <hr />
   <button @click="color='red'">红色</button>
   <button @click="color='yellow'">黄色</button>
   <button @click="color='green'">绿色</button>
   <hr />
   <Son />
   </template>
   <script lang="ts">
   import { defineComponent, ref, provide } from "vue";
   import Son from "./components/Son.vue";
   export default defineComponent({
   name: "App",
   components: { Son },
   setup() {
       const color = ref("red");
       provide("color", color);
       return {
       color
       };
   }
   });
   </script>
   ```
   ```ts
   <template>
    <h2>子组件</h2>
    <hr />
    <GrandSon />
    </template>
    <script lang="ts">
    import { defineComponent } from "vue";
    import GrandSon from "./GrandSon.vue";
    export default defineComponent({
    name: "Son",
    components: { GrandSon },
    setup() {
        return {};
    }
    });
    </script>
   ```
   ```ts
   <template>
    <h2 :style="{color}">孙子组件</h2>
    </template>
    <script lang="ts">
    import { defineComponent, inject } from "vue";
    export default defineComponent({
    name: "GrandSon",
    components: {},
    setup() {
        // 注入的操作
        const color = inject("color");
        return { color };
    }
    });
    </script>
   ```

7) 响应式数据的判断
   - isRef：检测一个值是否为一个 `ref` 对象
   - isReactive：检查一个对象是否是由 `reactive` 创建的响应式代理
   - isReadonly：检查一个对象是否是由 `readonly` 创建的只读代理
   - isProxy：检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理
   ```ts
   <template>
       <h2>响应式数据的判断</h2>
       </template>
       <script lang="ts">
       import {
       defineComponent,
       ref,
       isRef,
       isReactive,
       reactive,
       isReadonly,
       readonly,
       isProxy
       } from "vue";
       export default defineComponent({
       name: "App",
       components: {},
       setup() {
           console.log(isRef(ref({}))); // true
           console.log(isReactive(reactive({}))); // true
           console.log(isReadonly(readonly({}))); // true
           console.log(isProxy(reactive({}))); // true
           console.log(isProxy(readonly({}))); // true
           return {};
       }
       });
       </script>
   ```

## 手写组合 API

1. shallowReactive 与 reactive

```ts
// 定义一个reactiveHandler处理对象
const reactiveHandler = {
  get(target, prop) {
    const result = Reflect.get(target, prop);
    console.log("拦截了读取数据", prop, result);
    return result;
  },
  set(target, prop, value) {
    const result = Reflect.set(target, prop, value);
    console.log("拦截了修改数据或者是添加数据", prop, value);
    return result;
  },
  deleteProperty(target, prop) {
    const result = Reflect.deleteProperty(target, prop);
    console.log("拦截了删除数据", prop);
    return result;
  }
};

// 定义一个shallowReactive函数，传入一个目标对象
function shallowReactive(target) {
  // 判断当时的目标是不是object类型（对象/数组）
  if (target && typeof target === "object") {
    return new Proxy(target, reactiveHandler);
  }
  return target; // 普通类型直接返回
}

// 定义个reactive函数，传入一个目标对象
function reactive(target) {
  // 判断当时的目标是不是object类型（对象/数组）
  if (target && typeof target === "object") {
    //   对数组或者对象中所有的数据进行reactive的递归处理
    // 先判断当前的数据是不是数组
    if (Array.isArray(target)) {
      target.forEach((item, index) => {
        target[index] = reactive(item);
      });
    } else {
      // 判断当前的数据是不是对象
      Object.keys(target).forEach(key => {
        target[key] = reactive(target[key]);
      });
    }
    return new Proxy(target, reactiveHandler);
  }
  return target; // 普通类型直接返回
}
```

2. shallowReadonly 与 readonly

```ts
const readonlyHandler = {
  get(target, prop) {
    const result = Reflect.get(target, prop);
    return result;
  },
  set(target, prop, value) {
    console.log("只读数据，不能修改");
    return true;
  },
  deleteProperty(target, prop) {
    console.log("只读数据，不能删除");
    return true;
  }
};

function shallowReadonly(target) {
  if (target && typeof target === "object") {
    return new Proxy(target, readonlyHandler);
  }
  return target;
}

function readonly(target) {
  if (target && typeof target === "object") {
    //   对数组或者对象中所有的数据进行readonly的递归处理
    // 先判断当前的数据是不是数组
    if (Array.isArray(target)) {
      target.forEach((item, index) => {
        target[index] = readonly(item);
      });
    } else {
      // 判断当前的数据是不是对象
      Object.keys(target).forEach(key => {
        target[key] = readonly(target[key]);
      });
    }
    return new Proxy(target, readonlyHandler);
  }
  return target; // 普通类型直接返回
}
```

3. shallowRef 与 ref

```ts
function shallowRef(target) {
  return {
    // 把targe数据保存起来
    _valuue: target,
    get value() {
      console.log("劫持了读取数据");
      return this._valuue;
    },
    set value(val) {
      console.log("劫持到了修改数据，准备更新界面", val);
      return (this._value = val);
    }
  };
}

function ref(target) {
  target = reactive(target);
  return {
    // 把targe数据保存起来
    _valuue: target,
    get value() {
      console.log("劫持了读取数据");
      return this._valuue;
    },
    set value(val) {
      console.log("劫持到了修改数据，准备更新界面", val);
      return (this._value = val);
    }
  };
}
```

4. isRef, isReactive 与 isReadonly, isProxy

```ts
// 定义一个函数isRef，判断当前的对象是不是ref对象
function isRef(obj) {
  return obj && obj._is_ref;
}
// 定义一个函数isReactive，判断当前的对象是不是isReactive对象
function isReactive(obj) {
  return obj && obj._is_reactive;
}
// 定义一个函数isReadonly，判断当前的对象是不是isReadonly对象
function isReadonly(obj) {
  return obj && obj._is_readonly;
}
// 定义一个函数isProxy，判断当前的对象是不是isProxy对象
function isProxy(obj) {
  return isReactive(obj) || isReadonly(obj);
}
```

## 新组件

1. Fragment（片断）

   - 在 vue2 中：组件必须有一个根标签
   - 在 Vue3 中：组件可以没有根标签，内部会将多个标签包含在一个 Fragmeng 虚拟标签中
   - 好处：减少标签层级，减少内存占用

   ```ts
   <template>
       <h2>aaaa</h2>
       <h2>bbb</h2>
   </templage>
   ```

2. Teleport（瞬移）

   - `Teleport` 提供了一种干净的方法，让组件的 `html` 在父组件界面的特定标签（很可能是 body）下插入 `ModalButton.vue`

   ```ts
   <template>
   <button @click="modalOpen = true">
       Open full screen modal! (With teleport!)
   </button>

   <teleport to="body">
       <div v-if="modalOpen" class="modal">
       <div>
           I'm a teleported modal!
           (My parent is "body")
           <button @click="modalOpen = false">
           Close
           </button>
       </div>
       </div>
   </teleport>
   </template>

   <script>
   import { ref } from 'vue'
   export default {
   name: 'modal-button',
   setup () {
       const modalOpen = ref(false)
       return {
       modalOpen
       }
   }
   }
   </script>
   ```

   ```ts
   <template>
    <h2>App</h2>
    <modal-button></modal-button>
    </template>

    <script lang="ts">
    import ModalButton from './ModalButton.vue'

    export default {
    setup() {
        return {
        }
    },

    components: {
        ModalButton
    }
    }
    </script>
   ```

3. Suspense（不确定）
   - 它们允许我们的应用程序在等待异步组件时渲染一些后备内容，可以让我们创建一个平滑的用户体验

```ts
<template>
  <Suspense>
    <template v-slot:default>
    // <template #default>
      <AsyncComp/>
      <!-- <AsyncAddress/> -->
    </template>

    <template v-slot:fallback>
      <h1>LOADING...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
/*
异步组件 + Suspense组件
*/
// import AsyncComp from './AsyncComp.vue'
import AsyncAddress from './AsyncAddress.vue'
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() => import('./AsyncComp.vue'))
export default {
  setup() {
    return {

    }
  },

  components: {
    AsyncComp,
    AsyncAddress
  }
}
</script>
```

- AsyncComp.vue

```ts
<template>
  <h2>AsyncComp22</h2>
  <p>{{msg}}</p>
</template>

<script lang="ts">

export default {
  name: 'AsyncComp',
  setup () {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       msg: 'abc'
    //     })
    //   }, 2000)
    // })
    return {
      msg: 'abc'
    }
  }
}
</script>
```

- AsyncAddress.vue

```ts
<template>
<h2>{{data}}</h2>
</template>

<script lang="ts">
import axios from 'axios'
export default {
  async setup() {
    const result = await axios.get('/data/address.json')
    return {
      data: result.data
    }
  }
}
</script>
```

## Vuex 的基本使用

`yarn add vuex@next --save`

## 面试相关

- 2020 年 9 月发布的正式版
- Vue3 支持大多数的 Vue2 的特性
- Vue 中设计了一套强大的组合 API 代替了 Vue2 中的 option API，复用性更强了
- 更好的支持 TS
- 最主要：Vue3 中使用 `Proxy` 和 `Reflect` 代替了 Vue2 中 `Object.defineProperty()`方法实现数据的响应式（数据代理）
- 重写了虚拟 DOM，速度更快了
- 新的组件：`Fragment`（片段），`Teleport`（瞬移），`Suspense`（不确定，异步）
- 设计了一个新的脚手架工具，vite
