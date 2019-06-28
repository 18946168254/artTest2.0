import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  lesson: {}
}

const actions = {
  setLession ({ commit, state }, lesson) {
    commit('setLession', lesson)
  }
}
const mutations = {
  setLession (state, lesson) {
    state.lesson = lesson
  }
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
