/*
 * @Author: lu
 * @Date: 2021-07-16 10:31:16
 * @LastEditTime: 2021-07-16 10:33:28
 * @FilePath: \vue3-typescript\src\hooks\useMousePosition.ts
 * @Description: 
 */
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
