export const setPmIds = (vm, pmKey, ids) => {
  let str = ''
  ids.forEach(item => str += item.id + ',')
  vm.pm[pmKey] = str.substring(0, str.length - 1)
}
export const setPmStrs = (vm, pmKey, strs) => {
  let str = ''
  strs.forEach(item => str += item + '/')
  vm.pm[pmKey] = str.substring(0, str.length - 1)
}
export const setPmTime = (vm, pmKey, time) => {
  vm.pm[pmKey] = parseInt(time.getTime() / 1000)
}
export const initPdTags = (vm, pdKey, tags) => {
  vm.pd[pdKey] = tags.split('/')
}
/**
 * 得到 数组的选中项
 * @param vm
 * @param pdKey
 * @param choosedIds  形如 1,2,3
 * @param allIds      形如 [{id: 1, title: 11}, {id: 2, title: 22}]
 */
export const initPdIds = (vm, pdKey, choosedIds, allIds) => {
  let res = []
  let chooseds = choosedIds.split(',')
  chooseds.forEach(item => {
    res.push(allIds.find((cur) => cur.id == item))
  })
  vm.pd[pdKey] = res
}
