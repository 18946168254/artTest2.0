/**
 * mock 数据
 * 应按需导入；
 * 支持传递参数（返回动态值）
 */
import RemoteUrls from '@/libs/constantRemoteUrl.js'

export default {
  [RemoteUrls.CODE_LOGIN]: { telephone: '18946168254', openid: '' },
  [RemoteUrls.GET_OPENID]: {openid: '2343244234'},
  [RemoteUrls.GET_SIGN]: {openid: '2343244234'},
  [RemoteUrls.MESSAGE_LIST]: function (pm) {
    if (pm.appraisaltype_id === 1)
      return {data: ['a','b','c','d'], current_page: pm.fenyePage, last_page: 3}
    return {data: [1,2,3,4], current_page: pm.fenyePage, last_page: 3}
  },
  [RemoteUrls.MESSAGE_DETAIL]: {
    "appraisalusrs_id": 2,
    "create_time": "2019-06-26 11:25",
    "update_time": "2019-06-27 11:02",
    "title": "18522284660",
    "sex": 1,
    "age": 12,
    "remaks": "beizhu",  //备注
    "is_base": 0,
    "appraisaltype_id": "待处理",
    "appraisalcat_id": "音乐",
    "id": null  //有值为 已提交
  },
  [RemoteUrls.MESSAGE_DETAIL]: [{appraisalcat_id: 1, title: "音乐"}, {appraisalcat_id: 2, title: "体育"}]
}
