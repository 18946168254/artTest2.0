export const getYears = (start, end) => {
  let arr = []; let endYear = end || new Date().getFullYear()
  for (let i = 0; i <= endYear - start; i++) { arr.push(start + i) }
  return arr
}
export const getMonths = (end = 12) => {
  let arr = []
  for (let i = 1; i <= end; i++) { arr.push(i) }
  return arr
}
