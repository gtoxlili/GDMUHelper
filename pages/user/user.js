// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: "",
    value2: "",
    islogin: true,
    alertsx: ["error", "登录失败", "请填写有效的账号与密码"],
    tieshow: false,
    usmessage: wx.getStorageSync('usermessage')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data.islogin)
    this.setData({
      islogin: !Boolean(wx.getStorageSync('usermessage')),
      usmessage: wx.getStorageSync('usermessage')
    })
    this.setData(app.globalData)
  },
  dashangClick: function(e){
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path: 'pages/apps/largess/detail?id=cMO8fhba9Ns%3D',
      success(res) {
        // 打开成功
        console.log(res)
      }
    })
  },
  bindKeyInput: function(e) {
    if (e.target.id == "user") {
      this.setData({
        value1: e.detail.detail.value
      })
    } else {
      this.setData({
        value2: e.detail.detail.value
      })
    }

  },
  user: function() {
    wx.navigateBack({
      delta: 2
    })
  },
  dropoutClick: function() {
    wx.removeStorageSync('usermessage')
    this.setData({
      usmessage: "",
      value1: "",
      value2: "",
      islogin: true
    })
  },
  handleClick: function() {
    var that = this
    if (this.data.value1 && this.data.value2) {
      wx.request({
        url: 'https://wechat.juniancc.top/login', //仅为示例，并非真实的接口地址
        data: {
          username: this.data.value1,
          password: this.data.value2
        },
        success(res) {
          if (res.data.result) {
            wx.vibrateShort()
            that.setData({
              alertsx: ["success", "登录成功", "正在跳转至用户信息页面"],
              tieshow: true
            })

            setTimeout(function() {
              that.setData({
                tieshow: false
              })
            }, 2000)

            wx.request({
              method: "POST",
              url: 'https://wechat.juniancc.top/gdmulogin',
              data: {
                number: that.data.value1,
                mishi: app.md5Ms()
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                if (res.statusCode == 500) {
                  wx.setStorage({
                    key: "usermessage",
                    data: {
                      姓名: "***",
                      学号: that.data.value1,
                      学院: "***",
                      所在年级: "****",
                      身份证号: "******************"
                    }
                  })
                  that.setData({
                    usmessage: {
                      姓名: "***",
                      学号: that.data.value1,
                      学院: "***",
                      所在年级: "****",
                      身份证号: "******************"
                    },
                    islogin: false
                  })
                } else {
                  wx.setStorage({
                    key: "usermessage",
                    data: res.data[0]
                  })
                  that.setData({
                    usmessage: res.data[0],
                    islogin: false
                  })
                }
              }
            })

          } else {
            that.setData({
              alertsx: ["error", "登录失败", "学号与密码不符"],
              tieshow: true
            })
            setTimeout(function() {
              that.setData({
                tieshow: false
              })
            }, 2000)
          }
        }
      })
    } else {
      that.setData({
        alertsx: ["error", "登录失败", "请填写有效的学号与密码"],
        tieshow: true
      })
      setTimeout(function() {
        that.setData({
          tieshow: false
        })
      }, 2000)
    }
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
  onShareAppMessage: function() {
    return {
      title: "各位爷快里面请",
      imageUrl: 'https://wechat.juniancc.top/Sharecover'
    };
  }
})