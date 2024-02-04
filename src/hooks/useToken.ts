// 使用cookies主要是与后端的sa-token配合，token是存在cookies里的

import Cookies from 'js-cookie'

const TokenKey = 'kexie'

// 前端设置-3天过期
// 后端设置：未活跃3.5天过期，活跃7天过期
const TokenExpireTime = 60 * 1000 * 60 * 24 * 3

export const useCookies = () => {
  const getToken = () => {
    return Cookies.get(TokenKey)
  }
  const setToken = (token: string) => {
    return Cookies.set(TokenKey, token, { expires: TokenExpireTime })
  }
  const removeToken = () => {
    return Cookies.remove(TokenKey)
  }

  return {
    getToken,
    setToken,
    removeToken,
  }
}
