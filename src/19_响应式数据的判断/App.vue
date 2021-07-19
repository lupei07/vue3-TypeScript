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
<style scoped>
</style>