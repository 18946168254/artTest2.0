const regValidate = (originStr='', pattern, flag) => {
  var reg = new RegExp(pattern, flag)
  return reg.test(originStr)
}
export const cellPhoneValidate = (phone) => {
  return regValidate(phone, '^(13[0-9]|14[5|7|9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\\d{8}$', 'g')
}
export const numberValidate = (str) => {
  return regValidate(str, '^[0-9]*$', 'g')
}
export const emailValidate = (str) => {
  return regValidate(str, '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$', 'g')
}
