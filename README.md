<!--
 * @Author: lu
 * @Date: 2021-07-14 17:08:58
 * @LastEditTime: 2021-07-14 20:02:00
 * @FilePath: \vue3-typescript\README.md
 * @Description: 
-->
# vue3-typescript
> [vue3 文档](https://vue3js.cn/docs/zh/guide/migration/introduction.html)

> [笔记](https://24kcs.github.io/vue3_study/)
## 创建vue3项目
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
> [Composition API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#setup-%E7%BB%84%E4%BB%B6%E9%80%89%E9%A1%B9)
1. setup
    - 新的option，所有的组合API函数都在此使用，只在初始化时执行一次
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
    - 语法：```const xxx = rel(initValue)``` 
        - 创建一个包含响应式数据的引用（reference）对象
        - js中操作数据：```xxx.value```
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
