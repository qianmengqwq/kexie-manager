// 使用hook的原因：并不想要提供一个完整的Storage类，简单的几个方法就足够了
// https://github.com/kailong321200875/vue-element-plus-admin/blob/master/src/hooks/web/useStorage.ts
// 获取传入的值的类型
// 采用pinia持久化插件默认的localStorage形式，管理一些需要持久化存储的数据
const getValueType = (value: any) => {
  const type = Object.prototype.toString.call(value)
  return type.slice(8, -1)
}

export const useStorage = (
  type: 'sessionStorage' | 'localStorage' = 'localStorage',
) => {
  const setStorage = (key: string, value: any) => {
    const valueType = getValueType(value)
    window[type].setItem(key, JSON.stringify({ type: valueType, value }))
  }

  const getStorage = (key: string) => {
    const value = window[type].getItem(key)
    if (value) {
      const { value: val } = JSON.parse(value)
      return val
    } else {
      return value
    }
  }

  const removeStorage = (key: string) => {
    window[type].removeItem(key)
  }

  const clear = (excludes?: string[]) => {
    // 获取排除项
    const keys = Object.keys(window[type])
    const defaultExcludes = ['dynamicRouter', 'serverDynamicRouter']
    const excludesArr = excludes
      ? [...excludes, ...defaultExcludes]
      : defaultExcludes
    const excludesKeys = excludesArr
      ? keys.filter((key) => !excludesArr.includes(key))
      : keys
    // 排除项不清除
    excludesKeys.forEach((key) => {
      window[type].removeItem(key)
    })
    // window[type].clear()
  }

  return {
    setStorage,
    getStorage,
    removeStorage,
    clear,
  }
}
