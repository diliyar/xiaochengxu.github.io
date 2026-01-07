Page({
  data: {
    overallScore: 0,
    healthLevel: '',
    bmi: 0,
    bmiStatus: { text: '', color: '' },
    heartRate: '--',
    heartRateStatus: { text: '', color: '' },
    bloodPressure: '--',
    bpStatus: { text: '', color: '' },
    strengthScore: 0,
    strengthAdvice: '',
    enduranceScore: 0,
    enduranceAdvice: '',
    flexibilityScore: 0,
    flexibilityAdvice: '',
    powerScore: 0,
    powerAdvice: '',
    recommendation: {
      frequency: '',
      duration: '',
      types: [],
      tips: ''
    },
    weeklyPlan: []
  },

  onLoad() {
    const data = wx.getStorageSync('currentTest')
    if (!data) {
      wx.navigateBack()
      return
    }
    this.analyzeData(data)
  },

  analyzeData(data) {
    let bmi = data.bmi
    let heartRate = data.heartRate || 75
    let systolic = data.systolic || 120
    let diastolic = data.diastolic || 80
    let age = data.age
    let gender = data.gender
    let frequency = data.frequency
    let duration = data.duration
    let intensity = data.intensity

    let bmiStatus = this.getBMIStatus(bmi)
    let heartRateStatus = this.getHeartRateStatus(heartRate)
    let bpStatus = this.getBPStatus(systolic, diastolic)

    let strengthScore = this.calculateStrengthScore(data, bmiStatus, frequency, intensity)
    let enduranceScore = this.calculateEnduranceScore(frequency, duration, heartRateStatus)
    let flexibilityScore = this.calculateFlexibilityScore(frequency, age)
    let powerScore = this.calculatePowerScore(data, bmiStatus, frequency, intensity)

    let overallScore = Math.round((strengthScore + enduranceScore + flexibilityScore + powerScore) / 4)
    let healthLevel = this.getHealthLevel(overallScore)

    let recommendation = this.getRecommendation(data, bmiStatus, heartRateStatus, bpStatus, frequency, duration, intensity, age, gender)
    let weeklyPlan = this.getWeeklyPlan(data, bmiStatus, recommendation)

    this.setData({
      overallScore,
      healthLevel,
      bmi,
      bmiStatus,
      heartRate,
      heartRateStatus,
      bloodPressure: `${systolic}/${diastolic}`,
      bpStatus,
      strengthScore,
      strengthAdvice: this.getStrengthAdvice(strengthScore, bmiStatus),
      enduranceScore,
      enduranceAdvice: this.getEnduranceAdvice(enduranceScore, heartRateStatus),
      flexibilityScore,
      flexibilityAdvice: this.getFlexibilityAdvice(flexibilityScore, age),
      powerScore,
      powerAdvice: this.getPowerAdvice(powerScore, bmiStatus),
      recommendation,
      weeklyPlan
    })
  },

  getBMIStatus(bmi) {
    if (bmi < 18.5) return { text: '偏瘦', color: 'poor' }
    if (bmi < 24) return { text: '正常', color: 'good' }
    if (bmi < 28) return { text: '偏胖', color: 'normal' }
    return { text: '肥胖', color: 'poor' }
  },

  getHeartRateStatus(hr) {
    if (hr < 60) return { text: '偏低', color: 'normal' }
    if (hr <= 100) return { text: '正常', color: 'good' }
    return { text: '偏高', color: 'poor' }
  },

  getBPStatus(systolic, diastolic) {
    if (systolic < 90 || diastolic < 60) return { text: '偏低', color: 'normal' }
    if (systolic <= 140 && diastolic <= 90) return { text: '正常', color: 'good' }
    return { text: '偏高', color: 'poor' }
  },

  calculateStrengthScore(data, bmiStatus, frequency, intensity) {
    let score = 50
    if (bmiStatus.color === 'good') score += 10
    else if (bmiStatus.color === 'poor') score -= 10
    score += frequency * 3
    score += intensity * 10
    return Math.min(100, Math.max(0, score))
  },

  calculateEnduranceScore(frequency, duration, heartRateStatus) {
    let score = 50
    if (heartRateStatus.color === 'good') score += 15
    else if (heartRateStatus.color === 'poor') score -= 10
    score += frequency * 4
    score += duration * 5
    return Math.min(100, Math.max(0, score))
  },

  calculateFlexibilityScore(frequency, age) {
    let score = 60
    score -= (age - 20) * 0.5
    score += frequency * 3
    return Math.min(100, Math.max(0, score))
  },

  calculatePowerScore(data, bmiStatus, frequency, intensity) {
    let score = 55
    if (bmiStatus.color === 'good') score += 10
    else if (bmiStatus.color === 'poor') score -= 5
    score += frequency * 3
    score += intensity * 12
    return Math.min(100, Math.max(0, score))
  },

  getHealthLevel(score) {
    if (score >= 80) return '优秀'
    if (score >= 60) return '良好'
    if (score >= 40) return '一般'
    return '需加强'
  },

  getStrengthAdvice(score, bmiStatus) {
    if (bmiStatus.text === '偏瘦') return '建议增加力量训练，配合高蛋白饮食，逐步增加肌肉量。'
    if (bmiStatus.text === '肥胖') return '建议先进行有氧减脂，再逐步加入力量训练。'
    if (score >= 70) return '您的力量素质不错，可以尝试更高强度的训练。'
    return '建议每周安排2-3次力量训练，重点锻炼大肌群。'
  },

  getEnduranceAdvice(score, heartRateStatus) {
    if (heartRateStatus.text === '偏高') return '建议先从低强度有氧开始，逐步提升心肺功能。'
    if (score >= 70) return '心肺耐力良好，建议尝试长跑或HIIT训练。'
    return '建议增加有氧运动，如快走、慢跑、游泳等。'
  },

  getFlexibilityAdvice(score, age) {
    if (age > 35 && score < 60) return '年龄增长会降低柔韧性，建议每天拉伸。'
    if (score >= 70) return '柔韧性不错，保持常规拉伸习惯即可。'
    return '建议每次运动后进行10-15分钟拉伸练习。'
  },

  getPowerAdvice(score, bmiStatus) {
    if (bmiStatus.text === '肥胖') return '建议先减重，再进行爆发力训练。'
    if (score >= 70) return '爆发力不错，可以尝试高强度间歇训练。'
    return '建议加入跳绳、敏捷梯等爆发力训练。'
  },

  getRecommendation(data, bmiStatus, heartRateStatus, bpStatus, frequency, duration, intensity, age, gender) {
    let rec = {
      frequency: '',
      duration: '',
      types: [],
      tips: ''
    }

    let targetFreq = 4
    let targetDur = 60
    let targetInt = 0.8

    if (bmiStatus.text === '肥胖') {
      targetFreq = 5
      targetInt = 0.6
      rec.frequency = '每周4-5次'
      rec.duration = '每次45-60分钟'
      rec.types = ['快走', '慢跑', '游泳', '骑行', '椭圆机']
      rec.tips = '以有氧运动为主，配合饮食控制，逐步减脂。'
    } else if (bmiStatus.text === '偏瘦') {
      targetFreq = 4
      targetInt = 0.9
      rec.frequency = '每周3-4次'
      rec.duration = '每次60-90分钟'
      rec.types = ['力量训练', '深蹲', '硬拉', '卧推', '引体向上']
      rec.tips = '以力量训练为主，补充蛋白质，促进肌肉生长。'
    } else if (heartRateStatus.text === '偏高' || bpStatus.text === '偏高') {
      rec.frequency = '每周3-4次'
      rec.duration = '每次30-45分钟'
      rec.types = ['快走', '瑜伽', '太极', '游泳']
      rec.tips = '避免剧烈运动，以低强度有氧和放松性运动为主。'
    } else {
      rec.frequency = '每周4-5次'
      rec.duration = '每次45-60分钟'
      rec.types = ['跑步', '游泳', '健身', '球类运动', ' HIIT']
      rec.tips = '全面发展各项体能，保持运动习惯。'
    }

    if (age > 50) {
      rec.tips += ' 注意保护关节，避免过度负重。'
    }

    return rec
  },

  getWeeklyPlan(data, bmiStatus, recommendation) {
    let plan = []
    let days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

    if (bmiStatus.text === '肥胖') {
      plan = [
        { day: '周一', workout: '快走 40分钟 + 拉伸', duration: '45分钟' },
        { day: '周二', workout: '游泳 30分钟', duration: '35分钟' },
        { day: '周三', workout: '快走 45分钟 + 核心训练', duration: '50分钟' },
        { day: '周四', workout: '骑行 40分钟', duration: '45分钟' },
        { day: '周五', workout: '快走 50分钟', duration: '55分钟' },
        { day: '周六', workout: '球类运动 60分钟', duration: '65分钟' },
        { day: '周日', workout: '休息或轻松散步', duration: '30分钟' }
      ]
    } else if (bmiStatus.text === '偏瘦') {
      plan = [
        { day: '周一', workout: '力量训练：胸+三头', duration: '60分钟' },
        { day: '周二', workout: '有氧：跑步机 30分钟', duration: '35分钟' },
        { day: '周三', workout: '力量训练：背+二头', duration: '60分钟' },
        { day: '周四', workout: '休息或拉伸', duration: '20分钟' },
        { day: '周五', workout: '力量训练：腿+肩膀', duration: '65分钟' },
        { day: '周六', workout: '有氧+核心训练', duration: '45分钟' },
        { day: '周日', workout: '完全休息', duration: '0分钟' }
      ]
    } else {
      plan = [
        { day: '周一', workout: '跑步 30分钟 + 力量训练', duration: '50分钟' },
        { day: '周二', workout: '游泳 45分钟', duration: '50分钟' },
        { day: '周三', workout: 'HIIT训练 30分钟', duration: '35分钟' },
        { day: '周四', workout: '力量训练 45分钟', duration: '50分钟' },
        { day: '周五', workout: '跑步 40分钟 + 拉伸', duration: '45分钟' },
        { day: '周六', workout: '球类运动或登山', duration: '90分钟' },
        { day: '周日', workout: '瑜伽或拉伸放松', duration: '40分钟' }
      ]
    }

    return plan
  },

  saveResult() {
    const data = wx.getStorageSync('currentTest')
    const result = {
      ...data,
      overallScore: this.data.overallScore,
      healthLevel: this.data.healthLevel,
      bmi: this.data.bmi,
      saveTime: new Date().toLocaleString()
    }

    let history = wx.getStorageSync('fitnessHistory') || []
    history.unshift(result)
    if (history.length > 20) history = history.slice(0, 20)
    wx.setStorageSync('fitnessHistory', history)

    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
  },

  goBack() {
    wx.navigateBack()
  },

  goToExercise() {
    wx.switchTab({
      url: '/pages/exercise/exercise'
    })
  }
})
