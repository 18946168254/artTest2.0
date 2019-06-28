import axios from 'axios'
import { IMG_TEMP_PRE, IMG_REAL_PRE } from '@/libs/constans.js'

const config = {
  isMockApi: true,
  isMockWeChat: true,
  isMockApp: false,
  //todo 测试
  // requestUrl: 'http://qiniu.eightyin.cn/institutiontest.json',
  requestUrl: 'http://qiniu.eightyin.cn/institution.json',
  baseUrl: {
    dev: '/api/',
    pro: 'http://bayin888.mycwgs.com/'
  },
  img: {
    domain: 'http://bayin888.mycwgs.com/',
    [IMG_TEMP_PRE]: 'temp/',
    [IMG_REAL_PRE]: 'imgs/'
  },
  downLoadUrl: {
    android: 'http://server.eightyin.cn/download/bayin.apk',
    ios: 'https://itunes.apple.com/cn/app/id1394379121?mt=8'
  },
  uuid: Math.random().toString(36).substring(3, 20),
  requestRemoteIp: () => {
    return new Promise((resolve, reject) => {
      axios.get(config.requestUrl).then(response => {
        // todo 测试
        // config.baseUrl.pro = 'http://bayin3.mycwgs.com/'
        config.baseUrl.pro = response.data.data.path;
        config.img.domain = config.baseUrl.pro// 注：此处没有用 响应结果里的image 属性，因为该值已经将域名与 前缀拼接；处理缓存图片 会出现问题。
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  html5EditorOptions: ({ url, headers, callback }) => {
    return {
      // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
      name: 'vue-html5-editor',
      // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
      showModuleName: true,
      // 自定义各个图标的class，默认使用的是font-awesome提供的图标
      icons: {
        text: 'fa fa-pencil',
        color: 'fa fa-paint-brush',
        font: 'fa fa-font',
        align: 'fa fa-align-justify',
        list: 'fa fa-list',
        link: 'fa fa-chain',
        unlink: 'fa fa-chain-broken',
        tabulation: 'fa fa-table',
        image: 'fa fa-file-image-o',
        hr: 'fa fa-minus',
        eraser: 'fa fa-eraser',
        undo: 'fa-undo fa',
        'full-screen': 'fa fa-arrows-alt',
        info: 'fa fa-info'
      },
      // 配置图片模块
      image: {
        // 文件最大体积，单位字节
        sizeLimit: 512 * 1024 * 10,
        // 上传参数,默认把图片转为base64而不上传
        // upload config,default null and convert image to base64
        upload: {
          // url: '/api/apiins/Lesson/imagesUpload',
          url,
          headers,
          params: {},
          fieldName: 'upfile'
        },
        // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
        // width和height是文件的最大宽高
        compress: {
          width: 600,
          height: 600,
          quality: 80
        },
        // 响应数据处理,最终返回图片链接
        uploadHandler (responseText) {
          //      default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
          var json = JSON.parse(responseText)
          return callback(json)
        }
      },
      // 语言，内建的有英文（en-us）和中文（zh-cn）
      language: 'zh-cn',
      // 自定义语言
      i18n: {
        'zh-cn': {
          'align': '对齐方式',
          'image': '图片',
          'list': '列表',
          'link': '链接',
          'unlink': '去除链接',
          'table': '表格',
          'font': '文字',
          'full screen': '全屏',
          'text': '排版',
          'eraser': '格式清除',
          'info': '关于',
          'color': '颜色',
          'please enter a url': '请输入地址',
          'create link': '创建链接',
          'bold': '加粗',
          'italic': '倾斜',
          'underline': '下划线',
          'strike through': '删除线',
          'subscript': '上标',
          'superscript': '下标',
          'heading': '标题',
          'font name': '字体',
          'font size': '文字大小',
          'left justify': '左对齐',
          'center justify': '居中',
          'right justify': '右对齐',
          'ordered list': '有序列表',
          'unordered list': '无序列表',
          'fore color': '前景色',
          'background color': '背景色',
          'row count': '行数',
          'column count': '列数',
          'save': '确定',
          'upload': '上传',
          'progress': '进度',
          'unknown': '未知',
          'please wait': '请稍等',
          'error': '错误',
          'abort': '中断',
          'reset': '重置'
        }
      },
      // 隐藏不想要显示出来的模块
      hiddenModules: [],
      // 自定义要显示的模块，并控制顺序
      visibleModules: [
        //    "text",
        //    "color",
        'font',
        'align',
        //    "list",
        //    "link",
        //    "unlink",
        //    "tabulation",
        'image',
        //    "hr",
        //    "eraser",
        'undo',
        'full-screen'
        //    "info",
      ],
      // 扩展模块，具体可以参考examples或查看源码
      // extended modules
      modules: {
        // omit,reference to source code of build-in modules
      }
    }
  }
}

export default config
