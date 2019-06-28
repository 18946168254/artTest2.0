import CommentManager from '@/assets/CommentCoreLibrary.js'
const $ = function (a) {
  return document.getElementById(a)
}

export class CommentUtil {
  constructor (dom) {
    this.dom = $(dom)
    this.CM = null
    this.init()
  }

  init () {
    let CM = new CommentManager(this.dom)
    CM.init()
    // 先启用弹幕播放（之后可以停止）
    CM.start()

    this.CM = CM
  }
  static getCmtDataList () {
    var cmtArr = []

    // 可以使用jsonp获取服务器的字幕数据
    /* $.ajax({
     type : 'GET',
     url : 'http://192.168.9.67/test.php',
     dataType : 'jsonp',
     data : {sid : 100},
     success : function(data) {
     cmtArr = data.dataList;

     if (cmtArr && cmtArr.length > 0) {
     sendMsg(cmtArr);
     }
     }
     }); */

    // 测试数据
    return cmtArr = [
      { 'text': '大家期待什么新品啊', 'bgColor': '#424448', 'icon': 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg' },
      { 'text': '会有什么惊喜吗？', 'bgColor': '#424448', 'icon': 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg' },
      { 'text': '等待中。。', 'bgColor': '#23b28b', 'icon': 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg' },
      { 'text': '会有什么新产品呢？', 'bgColor': '#424448', 'icon': 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg' },
      { 'text': '定时执行', 'bgColor': '#23b28b', 'icon': 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg' },
      { 'text': '1123333446红咖喱的非农房价', 'bgColor': '#ec4262', 'icon': 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg' },
      { 'text': '测试接口发评论00', 'bgColor': '#ec4262', 'icon': 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg' },
      { 'text': '测试接口发评论00', 'bgColor': '#3dbbc0', 'icon': 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg' },
      { 'text': '啊啊啊啊啊啊啊哦哦哦诶IEIE恩家报表出具', 'bgColor': '#ec4262', 'icon': 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg' },
      { 'text': '的方式的方法反反复复反复反复', 'bgColor': '#23b28b', 'icon': 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg' }
    ]
  }
  sendMsg (cmtArr) {
    for (var i = 0; i < cmtArr.length; i++) {
      var cmtItem = cmtArr[i]
      var iconStr = ''

      if (cmtItem.icon && cmtItem.icon.length > 0) {
        iconStr = '<span class="icon"><img src="' + cmtItem.icon + '"></span>'
      }

      // 字幕的节点内容
      cmtItem.text = iconStr + cmtItem.text
      cmtItem.mode = 1
      cmtItem.dur = Math.floor(Math.random() * 4000 + 10000)
      this.CM.send(cmtItem)
    }
  }
}
