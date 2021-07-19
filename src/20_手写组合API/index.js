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
