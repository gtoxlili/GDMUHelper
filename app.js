const md5 = require('/static/md5/MD5.js');
App({
  onLaunch(options) {
    var that = this,
      sysinfo = wx.getSystemInfoSync(),
      statusHeight = sysinfo.statusBarHeight,
      isiOS = sysinfo.system.indexOf('iOS') > -1,
      navHeight;
    if (!isiOS) {
      navHeight = 48;
    } else {
      navHeight = 44;
    }
    that.globalData={
      status: statusHeight,
      navHeight: navHeight
    }
    // Do some initialize when page load.
    console.log(options)
    // Do something initial when launch.
  },
  onShow(options) {
    // Do something when show.
  },
  onHide() {
    // Do something when hide.
  },
  onError(msg) {
    console.log(msg)
  },
  md5Ms: function(){
      return md5.Misix()
  },
  globalData: {}
})