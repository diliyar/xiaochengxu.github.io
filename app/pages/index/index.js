Page({
  data: {
    height: '',
    weight: '',
    age: '',
    frequencies: ['从不运动', '1-2次/周', '3-4次/周', '5-6次/周', '每天'],
    frequenciesValue: [0, 1.5, 3.5, 5.5, 7],
    frequencyIndex: null,
    durations: ['30分钟以内', '30-60分钟', '60-90分钟', '90分钟以上'],
    durationsValue: [0.5, 1, 1.5, 2],
    durationIndex: null,
    intensities: ['低强度', '中等强度', '高强度'],
    intensitiesValue: [0.6, 0.8, 1],
    intensityIndex: null
  },

  bindFrequencyChange(e) {
    this.setData({ frequencyIndex: e.detail.value })
  },

  bindDurationChange(e) {
    this.setData({ durationIndex: e.detail.value })
  },

  bindIntensityChange(e) {
    this.setData({ intensityIndex: e.detail.value })
  },

  submitForm(e) {
    const formData = e.detail.value
    const { height, weight, age, gender, heartRate, systolic, diastolic } = formData
    
    if (!height || !weight || !age) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    if (this.data.frequencyIndex === null || this.data.durationIndex === null || this.data.intensityIndex === null) {
      wx.showToast({
        title: '请选择运动信息',
        icon: 'none'
      })
      return
    }

    const data = {
      ...formData,
      height: parseFloat(height),
      weight: parseFloat(weight),
      age: parseInt(age),
      gender: gender || 'male',
      heartRate: heartRate ? parseInt(heartRate) : null,
      systolic: systolic ? parseInt(systolic) : null,
      diastolic: diastolic ? parseInt(diastolic) : null,
      frequency: this.data.frequenciesValue[this.data.frequencyIndex],
      duration: this.data.durationsValue[this.data.durationIndex],
      intensity: this.data.intensitiesValue[this.data.intensityIndex],
      bmi: (weight / ((height / 100) ** 2)).toFixed(1),
      createTime: new Date().toLocaleString()
    }

    wx.setStorageSync('currentTest', data)
    
    wx.navigateTo({
      url: '/pages/result/result'
    })
  }
})
