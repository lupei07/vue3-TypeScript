<!--
 * @Author: lu
 * @Date: 2021-07-14 17:08:58
 * @LastEditTime: 2021-07-16 16:26:17
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

3. reactive
    - 作用：定义多个数据的响应式
    - ```const proxy = reactive(obj) ```：接收一个普通对象然后返回该普通对象的响应式代理器对象
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
4. 比较Vue2与Vue3的响应式（重要）
    - vue2的响应式
        - 核心
            - 对象：通过defineProperty对对象的已有属性值的读取和修改进行劫持（监视/拦截）
            - 数组：通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持
        - 问题
            - 对象直接新添加的属性或删除已有属性，界面不会自动更新
            - 直接通过下标替换元素或更新length，界面不会自动更新`arr[1]=0`
        ```js
        Object.defineProperty(data, 'count', {
            get () {}, 
            set () {}
        })
        ```

    - vue3的响应式
        - 核心
            - 通过Proxy（代理）：拦截对data任意属性的任意（13种）操作，包括属性值的读写，属性的添加，属性的删除等...
            - 通过Reflect（反射）：动态对被代理的相应属性进行特定的操作
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
5. setup细节
    - setup执行的时机
        - 在beforeCreate之前执行（一次），此时组件对象还没有创建
        - this是undefined，不能通过this来访问data/computed/methods/props
        - 其实所有的composition API相关回调函数中也都不可以
    - setup的返回值
        - 一般都返回一个对象，为模板提供数据，也就是模板中可以直接使用对象中的所有属性/方法
        - 返回对象中的属性会与data函数返回对象的属性合并称为组件对象的属性
        - 返回对象中的方法会与methods中的方法合并成功组件对象的方法
        - 如果有重名，setup优先
        - 注意：
            - 一般不要混合使用：methods中可以访问setup提供的属性和方法，但在setup方法中不能访问data和methods
            - setup不能是一个saync函数：因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性数据
    - setup参数
        - setup(props, context) / setup(props, {attrs, slots, emit})
        - props: 包含props配置声明且传入了的所有属性的对象
        - attrs: 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
        - slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
        - emit: 用来分发自定义事件的函数, 相当于 this.$emit
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
6. reactive与ref细节
    - 是Vue3的 composition API中2个最重要的响应式API
    - ref 用来处理基本类型数据，reactive是用来处理对象（递归深度响应式）
    - 如果用ref对象/数组，内部会自动将对象/数组转换为reactive的代理对象
    - ref内部：通过给value属性添加getter/setter来实现对数据的劫持
    - reactive内部：通过使用Proxy来实现对对象内部所有数据的劫持，并通过Reflect操作对象内部数据
    - ref的数据操作：在js中要.value，在模板中不需要（内部解析模板是自动添加.value）
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
        - 与computed配置功能一致
    - `watch`函数：
    - `watchEffect`函数

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
    - 使用Vue3的组合API封装的可复用的功能函数
    - 自定义hook的作用类似于vue2中的mixin技术
    - 自定义 Hook 的优势：很清楚复用功能代码的来源，更清楚易懂
    - 需求1：收集用户鼠标垫底的 页面坐标
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
    export default function () {
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
            x, y
        }
    }

    ```

    - 利用TS泛型强化类型检查
    - 需求2：封装发ajax请求的hook函数
    - hooks/useRequest
    ```ts
    import axios from 'axios'
    import { ref } from 'vue'

    export default function useUrlLoader<T>(url: string) {
        // cosnt data = ref(null) // 坑
        const data = ref<T | null>(null); // 可能是数组也可能是对象
        const loading = ref(true);
        const errorMsg = ref(null);

        axios.get(url).then((response) => {
            loading.value = false;
            data.value = response.data
        }).catch(e => {
            loading.value = false;
            errorMsg.value = e.message || '未知错误'

        })


        return {
            data,
            loading,
            errorMsg
        }
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

11. ref获取元素
    - 利用ref函数获取组件中的标签元素
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
    - `shallowRef`：只处理了value的响应式，不进行对象的 reactive 处理
    - 什么时候使用浅响应式呢？
        - 一般情况下使用ref和reactive即可
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
    ```
