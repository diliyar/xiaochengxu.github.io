Page({
  data: {
    history: []
  },

  onShow() {
    const history = wx.getStorageSync('fitnessHistory') || []
    this.setData({ history })
  },

  viewDetail(e) {
    const index = e.currentTarget.dataset.index
    const data = this.data.history[index]
    wx.setStorageSync('currentTest', data)
    wx.navigateTo({
      url: '/pages/result/result'
    })
  },

  goToTest() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
