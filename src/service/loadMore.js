/**
 * 针对mintui loadmore 分页组件的共用代码
 *
 */

export default class LoadMore {
  /**
   * 构造器
   * @param dom 分页组件 ref 名
   * @param container 分页数据容器（通过容器，操作页面数据）
   * container: {
   *       pageList:[],       // 数据集合
   *       allLoaded: false,  // 是否已全部加载完毕
   *    },
   * @param loadMoreApi 接口api
   * @param extraCondition  接口请求时 其他参数
   */
  constructor(dom, container, loadMoreApi, extraCondition={}) {
    this.searchCondition = Object.assign({fenyePage: 1}, extraCondition)
    this.$el = dom
    this.container = container
    this.loadMoreApi = loadMoreApi
  }

  loadTop(vm) { //组件提供的下拉触发方法
    //下拉加载
    this.loadInit(vm);
    vm.$refs[this.$el].onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
  }

  loadBottom(vm) {
    // 上拉加载
    this.loadMore(vm);// 上拉触发的分页查询
    vm.$refs[this.$el].onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
  }

  loadInit(vm) {
    // 查询数据
    this.searchCondition.fenyePage = 1
    this.loadMoreApi(this.searchCondition).then(data => {
      // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
      this.isHaveMore(vm, data.current_page, data.last_page)
      vm[this.container].pageList = data.data;
      /*vm.$nextTick(function () {
       // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
       // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
       // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
       vm.scrollMode = "touch";
       });*/
    });
  }

  loadMore(vm) {
    // 分页查询
    this.searchCondition.fenyePage++
    this.loadMoreApi(this.searchCondition).then(data=> {
      vm[this.container].pageList = vm[this.container].pageList.concat(data.data);
      this.isHaveMore(vm, data.current_page, data.last_page);
    });
  }

  isHaveMore(vm, current_page, last_page) {
    // 是否还有下一页，如果没有就禁止上拉刷新
    vm[this.container].allLoaded = true; //true是禁止上拉加载
    if (current_page < last_page) {
      vm[this.container].allLoaded = false;
    }
  }
}
