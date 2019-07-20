//index.js
//获取应用实例
const app = getApp()

//index.js
Page({
  data: {
    swipernr: [],
    articles: [],
    current: 'tab1',
    currentbt: 'tab1',
    chaxun: ["0", "1"],
    multiArray: [],
    loadmore: ["正在加载", true],
    loadmoreshow: true,
    indexs: [],
    shenrilist: [],
    visible2: false,
    visible1: false,
    visibshow: false,
    pagesx: 0,
    pagesxing: false,
    pagesxed: false,
    adclose: true,
    actionshow: {
      "kemu": "",
      "kaosxz": "",
      "kch": "",
      "xuef": "",
      "xues": "",
      "cj": "",
      "paim": "",
      "paimbf": "30"
    },
    actions2: [{
      name: '分享',
      icon: 'share',
      openType: 'share'
    }],
    actions1: [{
      name: '前往登录',
      color: '#ed3f14'
    }]
  },
  shenrichud(x) {
    if (!this.data.pagesxing) {
      this.setData({
        pagesx: this.data.pagesx + 1,
        pagesxing: true
      });
      if (this.data.current == "tab1") {
        this.wenzhang()
      } else {
        this.shengri(this.data.currentbt)
      }
    }

  },
  swipertouch(x){
    console.log(x)
    wx.navigateTo({
      url: "/pages/article/article?links=" + x.currentTarget.id //实际路径要写全
    })
  },
  wenzhang: function() {
    var that = this
    wx.request({
      method: "POST",
      url: 'https://wechat.juniancc.top/articles',
      data: {
        mishi: app.md5Ms(),
        page: this.data.pagesx
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          articles: that.data.articles.concat(res.data.result),
          swipernr: that.data.pagesx ? that.data.swipernr : res.data.swipers,
          loadmoreshow: false,
          pagesxing: false,
        })
      }
    })
  },
  adClose(x) {
    console.log(x)
    this.setData({
      adclose: false
    });

  },
  handleOpen2(x) {
    this.setData({
      visible2: true,
      visibshow: true
    });
    var that = this;
    wx.request({
      method: "POST",
      url: 'https://wechat.juniancc.top/Ranking',
      data: {
        chenj: this.data.indexs[x.target.id]["总评成绩"] ? this.data.indexs[x.target.id]["总评成绩"] : "0",
        kch: this.data.indexs[x.target.id]["课程号"],
        semester: this.data.multiArray[1][this.data.chaxun[1]] == "第一学期" ? 0 : 1,
        schoolyear: this.data.multiArray[0][this.data.chaxun[0]].slice(0, 4) / 1,
        mishi: app.md5Ms()
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        that.setData({
          actionshow: {
            "kemu": that.data.indexs[x.target.id]["课程名称"],
            "kaosxz": that.data.indexs[x.target.id]["考试性质"],
            "kch": that.data.indexs[x.target.id]["课程号"],
            "xuef": that.data.indexs[x.target.id]["学分"],
            "xues": that.data.indexs[x.target.id]["学时"],
            "cj": that.data.indexs[x.target.id]["总评成绩"],
            "paim": res.data.paiming,
            "paimbf": res.data.chaoyue
          },
          visibshow: false,
        });

      }
    })

  },
  bottomChange({
    detail
  }) {
    this.setData({
      loadmore: ["正在加载", true],
      loadmoreshow: true,
      currentbt: detail.key,
      shenrilist: [],
      pagesx: 0,
      pagesxing: false,
      pagesxed: false
    })
    console.log(detail.key)
    this.shengri(detail.key)
  },
  handleCancel1() {
    this.setData({
      visible1: false
    });
  },
  handleCancel2() {
    this.setData({
      visible2: false
    });
  },
  onLoad: function(options) {
    var nowYear = new Date().getFullYear()
    var nowMonth = new Date().getMonth()
    this.setData({
      multiArray: [
        ["", "", "", ""].map((x, y) => nowYear - y + "学年"), ['第一学期', '第二学期']
      ],
      chaxun: ["0", nowMonth <= 6 ? 1 : 0],
      charuad: Math.ceil(Math.random() * 13 + 6)
    });
    this.setData(app.globalData)
    // Do some initialize when page load.
  },
  onReady: function() {
    this.wenzhang()
    // Do something when page ready.
  },
  onShow: function() {

    // Do something when page show.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function(x) {
    if (x.from == "menu") {
      return {
        title: "各位爷快里面请",
        imageUrl: 'https://wechat.juniancc.top/Sharecover'
      };
    } else if (x.from == "button") {
      return {
        title: this.data.articles[x.target.id]["title"],
        path: "/pages/article/article?links=" + this.data.articles[x.target.id]["link"],
        imageUrl: this.data.articles[x.target.id]["media"] ? this.data.articles[x.target.id]["media"] : 'https://wechat.juniancc.top/Sharecover'
      };
    } else {
      return {
        title: '我的' + this.data.actionshow.kemu + "超越了" + this.data.actionshow.paimbf + "%的同学，你呢?",
        imageUrl: 'https://wechat.juniancc.top/Sharecover'
      };
    }
    // return custom share data when user share.
  },
  onPageScroll: function() {
    // Do something when page scroll
  },
  onResize: function() {
    // Do something when page resize
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  user: function() {

    wx.navigateTo({
      url: '/pages/user/user' //实际路径要写全
    })
  },
  sousuo: function() {

    wx.navigateTo({
      url: '/pages/sousuo/sousuo' //实际路径要写全
    })
  },
  handleClickItem1: function() {
    this.setData({
      visible1: false
    });
    wx.navigateTo({
      url: '/pages/user/user' //实际路径要写全
    })
  },
  bindMultiPickerChange: function(x) {
    this.setData({
      loadmore: ["正在加载", true],
      loadmoreshow: true,
      chaxun: x.detail.value
    })
    this.chaxuncj()
  },
  chaxuncj: function() {
    var that = this
    wx.request({
      method: "POST",
      url: 'https://wechat.juniancc.top/inquirychenj',
      data: {
        studentID: wx.getStorageSync('usermessage')["学号"],
        semester: this.data.multiArray[1][this.data.chaxun[1]] == "第一学期" ? 0 : 1,
        schoolyear: this.data.multiArray[0][this.data.chaxun[0]].slice(0, 4) / 1,
        mishi: app.md5Ms()
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        if (res.data.result == "失败") {
          that.setData({
            indexs: res.data.result,
            loadmore: ["暂无数据", false],
            loadmoreshow: true
          })
        } else {
          that.setData({
            indexs: res.data.result,
            loadmoreshow: false
          })
        }

      }
    })
  },
  shengri: function(xsd) {
    var that = this
    wx.request({
      method: "POST",
      url: 'https://wechat.juniancc.top/birthdays',
      data: {
        number: wx.getStorageSync('usermessage')["学号"],
        mishi: app.md5Ms(),
        ban: xsd,
        page: this.data.pagesx
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          shenrilist: that.data.shenrilist.concat(res.data),
          loadmoreshow: false,
          pagesxing: res.data.length < 10 ? true : false,
          pagesxed: res.data.length < 10 ? true : false,
          adclose: true
        })

      }
    })
  },
  // Event handler.
  handleChange({
    detail
  }) {


    if (detail.key != this.data.current) {
      if (detail.key == "tab3" || detail.key == "tab2") {
        var userms = wx.getStorageSync('usermessage')
        if (userms) {
          this.setData({
            current: detail.key,
            loadmore: ["正在加载", true],
            loadmoreshow: true,
            pagesx: 0,
            shenrilist: []
          });
          if (detail.key == "tab2") {
            this.shengri("tab1")
          } else {
            this.chaxuncj()
          }

        } else {
          this.setData({
            visible1: true
          });
        }
      } else {

        this.setData({
          current: detail.key,
          loadmore: ["正在加载", true],
          loadmoreshow: true,
          swipernr: [],
          articles: [],
          pagesx: 0,
          adclose: true
        });
        this.wenzhang()
      }
    }

  },
})