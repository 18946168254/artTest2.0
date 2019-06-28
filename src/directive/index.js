import directvies from './directives.js'

const registDirective = Vue => {
  for (let key of Object.keys(directvies)) {
    Vue.directive(key, directvies[key])
  }
}
export default registDirective
