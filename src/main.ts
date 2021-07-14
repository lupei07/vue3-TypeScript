/*
 * @Author: lu
 * @Date: 2021-07-14 17:08:24
 * @LastEditTime: 2021-07-14 17:42:51
 * @FilePath: \vue3-typescript\src\main.ts
 * @Description: 
 */
// 程序的主入口文件，ts文件

// 引入createApp函数，创建对应的引用，产生应用的实例对象
import { createApp } from 'vue'
// 引入App组件（所有组件的父级组件）
import App from './App.vue'
// 创建App应用返回对应的实例对象，调用mount方法进行挂载
createApp(App).mount('#app')
