import {format} from 'date-fns'

export const timePre = function (time) {
  return format(time, 'YYYY-MM-DD HH:mm')
}
export const timePreYMD = function (time) {
  return format(time, 'YYYY-MM-DD')
}
export const timeFormmat = function (time) {
  return format(time * 1000, 'YYYY-MM-DD HH:mm')
}
export const timeFormmatYM = function (time) {
  return format(time * 1000, 'YYYY.MM')
}
export const ABeforeBAfter = function (aTime, bTime) {
  if (aTime.getTime() < bTime.getTime())
    return true;
  return false;
}
