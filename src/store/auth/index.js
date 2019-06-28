import Vue from 'vue'
import Vuex from 'vuex'
import authData from './modules/authData.js'
import { AUTH_NOT } from '@/libs/constans.js'

Vue.use(Vuex)

const state = {
  authStatus: AUTH_NOT,
  authInfo: {}
}
const getters = {
  teacherType (state) {
    return state.authInfo.teachertype_id == 1 ? '独立教师' : '在校大学生'
  }
}
const actions = {
  changeAuthStatus ({ commit, state }, status) {
    commit('setAuthState', status)
  },
  initAuthInfo ({ commit, state }, info) {
    commit('setAuthInfo', info)
  }
}
const mutations = {
  setAuthState (state, status) {
    state.authStatus = status
  },
  setAuthInfo (state, info) {
    state.authInfo = info
  }
}

export default new Vuex.Store({
  modules: {
    authData
  },
  state,
  getters,
  actions,
  mutations
})
