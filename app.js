//app.js
App({
  onLaunch: function () {
    if (wx.canIUse("getUpdateManager")) {
      var e = wx.getUpdateManager();
      e.onCheckForUpdate(function (o) {
        console.log("onCheckForUpdate====", o), o.hasUpdate && (console.log("res.hasUpdate===="),
          e.onUpdateReady(function () {
            wx.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success: function (o) {
                console.log("success====", o), o.confirm && e.applyUpdate();
              }
            });
          }), e.onUpdateFailed(function () {
            wx.showModal({
              title: "已经有新版本了哟~",
              content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
            });
          }));
      });
    }
  },
  globalData: {}
})