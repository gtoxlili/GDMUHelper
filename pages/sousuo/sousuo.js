// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value5: "",
    loadmoreshow: false,
    articles: [],
    pages: 0,
    adclose: true,
    pagesxing: false,
    onesuosou: false,
    loaded: false
  },
  bindKeyInput: function(e) {

    this.setData({
      value5: e.detail.detail.value
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData(app.globalData)
    this.setData({
      charuad: Math.ceil(Math.random() * 13 + 6)
    })
  },
  user: function() {
    wx.navigateBack({
      delta: 2
    })
  },
  handleClick: function() {
    if (this.data.value5 ){
    this.setData({
      pages: 0,
      charuad: Math.ceil(Math.random() * 14 + 5),
      loadmoreshow: true,
      articles: [],
      adclose: true
    })
    this.sousuoxx()}
  },
  sousuoxx(x) {
    var that = this
    wx.request({
      method: "POST",
      url: 'https://wechat.juniancc.top/sousuoxs',
      data: {
        mishi: app.md5Ms(),
        sousuo: this.data.value5,
        page: this.data.pages
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          articles: that.data.articles.concat(res.data.result),
          loadmoreshow: false,
          pagesxing: res.data.result.length < 20,
          onesuosou: true,
          loaded: res.data.result.length < 20
        })
      }
    })
  },
  swipertouch(x) {
    console.log(x)
    wx.navigateTo({
      url: "/pages/article/article?links=" + x.currentTarget.id //实际路径要写全
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(x) {
    if (x.from == "button") {
      return {
        title: this.data.articles[x.target.id]["title"],
        path: "/pages/article/article?links=" + this.data.articles[x.target.id]["link"],
        imageUrl: this.data.articles[x.target.id]["media"] ? this.data.articles[x.target.id]["media"] : 'https://wechat.juniancc.top/Sharecover'
      };
    }
  },
  adClose(x) {
    console.log(x)
    this.setData({
      adclose: false
    });
  },
  shenrichud(x) {
    if (!this.data.pagesxing) {
      this.setData({
        pages: this.data.pages + 1,
        pagesxing: true
      });

      this.sousuoxx()

    }
  }
})