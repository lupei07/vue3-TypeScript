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

// ======================================

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

// ==========================================================
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

// ==========================================================

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
