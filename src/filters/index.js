import filters from './filters.js'

const registFilter = Vue => {
  for (let key of Object.keys(filters)) {
    Vue.filter(key, filters[key])
  }
}
export default registFilter
