App({
  onLaunch() {
    const history = wx.getStorageSync('fitnessHistory') || []
    this.globalData.history = history
  },
  globalData: {
    userInfo: null,
    history: []
  }
})
