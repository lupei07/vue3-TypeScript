/*
 * @Author: lu
 * @Date: 2021-07-16 11:13:34
 * @LastEditTime: 2021-07-16 13:53:23
 * @FilePath: \vue3-typescript\src\hooks\useRequest.ts
 * @Description: 
 */
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