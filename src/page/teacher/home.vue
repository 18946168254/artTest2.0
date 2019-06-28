<template>
  <div>
    <mt-navbar v-model="selected" ref="navbar">
      <mt-tab-item id="1">待处理</mt-tab-item>
      <mt-tab-item id="2">已完成</mt-tab-item>
    </mt-navbar>
    <mt-tab-container swipeable v-model="selected">
      <mt-tab-container-item id="1">
        <div class="tab-container-item-base" :style="{height: pd.loadMoreH}">
          <mt-loadmore :top-method="loadTop1" :autoFill="autoFill" :bottom-method="loadBottom1" :bottom-all-loaded="pageMore1.allLoaded" bottomPullText="上拉加载更多" ref="loadmore1">
            <ul :style="{minHeight: pd.loadMoreH}">
              <li v-for="item in pageMore1.pageList" @click="goMessage(item)">{{ item }}</li>
              <by-no-data v-show="!pageMore1.pageList.length"></by-no-data>
            </ul>
          </mt-loadmore>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="tab-container-item-base" :style="{height: pd.loadMoreH}">
          <mt-loadmore :top-method="loadTop2" :autoFill="autoFill" :bottom-method="loadBottom2" :bottom-all-loaded="pageMore2.allLoaded" bottomPullText="上拉加载更多" ref="loadmore2">
            <ul :style="{minHeight: pd.loadMoreH}">
              <li v-for="item in pageMore2.pageList">{{ item }}</li>
              <by-no-data v-show="!pageMore2.pageList.length"></by-no-data>
            </ul>
          </mt-loadmore>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import { messagePageList } from "@/api/index.js"
  import { getClientH, getPosForView } from '@/libs/DOMUtil.js'
  import LoadMore from '@/service/loadMore.js'

  export default {
    name: 'Home',
    components: {
    },
    data () {
      return {
        selected: '1',
        pd: {
          loadMoreH: '1px',
        },

        pageMore1: {
          pageList:[],
          allLoaded: false,
        },
        pageMore2: {
          pageList:[],
          allLoaded: false,
        },
        autoFill: false,
      }
    },
    mounted () {
      this.pd.loadMoreH = (getClientH() - getPosForView(this.$refs.loadmore1.$el).top) + 'px'
      this.loadTop1();
    },
    computed: {
    },
    methods: {
      loadTop1 () { //组件提供的下拉触发方法
        //下拉加载
        this.loadMore1.loadTop(this);
      },
      loadBottom1 () {
        // 上拉加载
        this.loadMore1.loadBottom(this);// 上拉触发的分页查询
      },
      loadTop2 () {
        this.loadMore2.loadTop(this);
      },
      loadBottom2 () {
        this.loadMore2.loadBottom(this);
      },
      goMessage (item) {
        this.$router.push(`message/${item.appraisalusrs_id}`)
      }
    },
    created () {
      this.loadMore1 = new LoadMore('loadmore1', 'pageMore1', messagePageList, {appraisaltype_id: 0})
      this.loadMore2 = new LoadMore('loadmore2', 'pageMore2', messagePageList, {appraisaltype_id: 1})
    },
    watch: {
      'selected' (n, o) {
        if (n === '2' && !this.loadmore2Inited){
          this.loadmore2Inited = true
          this.loadTop2();
        }
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  li {
    height: 200px;
  }
  .tab-container-item-base {
    background: #f5f5f5;
    overflow: scroll;
  }
</style>
