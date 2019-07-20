// pages/article/article.js
const app = getApp()
var WxParse = require('../../static/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    adclose:true,
  },
  wxParseTagATap(x){
    
  },
  adClose(x) {
    
    this.setData({
      adclose: false
    });
  },
  loadarticle(links) {
    var that = this
    wx.request({
      method: "POST",
      url: 'https://wechat.juniancc.top/articneir',
      data: {
        mishi: app.md5Ms(),
        link: links
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        WxParse.wxParse('article', 'html', res.data[0]["desc"].replace(/data-src/g, "src"), that, 36);
        that.setData({
          articneir:res.data[0],
          loading:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(app.globalData)
    this.loadarticle(options.links)
  },
  userxsd: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.articneir.title,
      path: "/pages/article/article?links=" + this.data.articneir.link,
      imageUrl: 'https://wechat.juniancc.top/Sharecover'
    };
  }
})