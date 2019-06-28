
const state = {
  choosedSchool: {},
  schools: [],
  specialty: [],

  items: [],
  checkoutStatus: null
}

// actions
const actions = {
  choosedSchool ({ commit, state }, school) {
    commit('setChoosedSchool', school)
  },
  initSchools ({ commit, state }, schools) {
    commit('setSchools', schools)
  }
}

// mutations
const mutations = {
  setChoosedSchool (state, school) {
    state.choosedSchool = school
  },
  setSchools (state, schools) {
    state.schools = schools
  },
  setSpecialty (state, specialty) {
    state.specialty = specialty
  }
}

export default {
  state,
  actions,
  mutations
}
