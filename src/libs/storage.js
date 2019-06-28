import { LOCALDATA } from '@/libs/constans.js'

const localStorage = window.localStorage

const getLocalStorage = (constantName) => {
  if (typeof localStorage === 'object') {
    let data = null
    try {
      data = localStorage.getItem(constantName)
    } catch (ex) {
      console.log('Can not use localStorage.getItem: ', ex)
    }
    if (data !== null && data !== undefined && data.length > 0)
      return JSON.parse(data);
  }
  return null;
}

const setLocalStorage = (constantName, data) => {
  if (typeof localStorage === 'object') {
    // iOS 8.3 safari 下 localStorage 的 setItem 有问题
    try {
      if (data) {
        localStorage.setItem(constantName, JSON.stringify(data))
      } else {
        localStorage.removeItem(constantName)
      }
    } catch (ex) {
      console.log('Can not use localStorage.[setItem | removeItem]: ', ex)
    }
  }
}
const remove = (constantName) => {
  setLocalStorage(constantName, null);
}


const getToken = () => {
  return getLocalStorage(LOCALDATA.USER_INFO) || {}
}

const setToken = (token) => {
  setLocalStorage(LOCALDATA.USER_INFO, token)
}
const removeToken = (token) => {
  remove(LOCALDATA.USER_INFO)
}

export default {
  setLocalStorage,
  getLocalStorage,
  removeToken,
  getToken,
  setToken,
  remove
}

