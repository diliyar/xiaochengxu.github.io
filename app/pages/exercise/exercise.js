Page({
  data: {
    currentTab: 0,
    tabs: ['力量训练', '有氧运动', '柔韧性', '爆发力'],
    
    strengthExercises: [
      {
        id: 'squat',
        title: '深蹲',
        difficulty: '初级',
        difficultyClass: 'beginner',
        duration: '15-20次 x 3组',
        description: '深蹲是锻炼下肢力量的经典动作，主要刺激股四头肌、臀大肌和腘绳肌。',
        steps: [
          '双脚与肩同宽站立，脚尖微微外展',
          '双手向前平举或交叉抱于胸前',
          '保持背部挺直，缓慢下蹲',
          '蹲至大腿与地面平行或略低',
          '爆发性站起，回到起始位置'
        ],
        tips: '膝盖不要超过脚尖太多；保持核心收紧；下蹲时吸气，起身时呼气',
        muscles: ['股四头肌', '臀大肌', '腘绳肌']
      },
      {
        id: 'pushup',
        title: '俯卧撑',
        difficulty: '初级',
        difficultyClass: 'beginner',
        duration: '10-15次 x 3组',
        description: '俯卧撑是锻炼上肢推力肌群的基础动作，主要刺激胸大肌、三角肌和肱三头肌。',
        steps: [
          '双手略宽于肩支撑地面',
          '双脚并拢，身体呈一条直线',
          '弯曲肘部，缓慢下降身体',
          '胸部接近地面时停止',
          '推起身体回到起始位置'
        ],
        tips: '收紧核心，不要塌腰；下降时控制速度；新手可以从跪姿开始',
        muscles: ['胸大肌', '肱三头肌', '三角肌']
      },
      {
        id: 'plank',
        title: '平板支撑',
        difficulty: '初级',
        difficultyClass: 'beginner',
        duration: '30-60秒 x 3组',
        description: '平板支撑是锻炼核心稳定性的经典动作，能够有效强化腹部、背部和肩部肌肉。',
        steps: [
          '俯卧，用肘部和脚尖支撑身体',
          '肘部在肩膀正下方',
          '身体从头到脚成一条直线',
          '收紧腹部和臀部',
          '保持姿势，不要憋气'
        ],
        tips: '不要翘臀或塌腰；保持自然呼吸；初学者可以从膝撑开始',
        muscles: ['腹横肌', '腹直肌', '肩袖肌群']
      },
      {
        id: 'deadlift',
        title: '硬拉',
        difficulty: '中级',
        difficultyClass: 'intermediate',
        duration: '8-12次 x 3组',
        description: '硬拉是全身复合动作，主要锻炼臀部、腿部和下背部，同时强化核心力量。',
        steps: [
          '双脚与髋同宽，站在杠铃前方',
          '俯身握住杠铃，保持背部平直',
          '双脚蹬地，同时髋膝伸直',
          '站直身体，保持杠铃贴近身体',
          '缓慢放下杠铃，回到起始位置'
        ],
        tips: '全程保持背部平直；用腿部发力而非背部；保持杠铃贴近身体',
        muscles: ['臀大肌', '腘绳肌', '下背部', '核心']
      },
      {
        id: 'lunge',
        title: '弓步蹲',
        difficulty: '初级',
        difficultyClass: 'beginner',
        duration: '每侧10-12次 x 3组',
        description: '弓步蹲是单腿训练动作，能够有效改善平衡能力和下肢力量。',
        steps: [
          '双脚并拢站立',
          '向前迈出一大步',
          '后膝下沉至接近地面',
          '前膝弯曲约90度',
          '推起身体，回到起始位置'
        ],
        tips: '前膝不要超过脚尖；保持躯干直立；可以负重增加难度',
        muscles: ['股四头肌', '臀大肌', '腘绳肌']
      }
    ],
    
    cardioExercises: [
      {
        id: 'running',
        title: '跑步',
        difficulty: '初级',
        difficultyClass: 'beginner',
        duration: '20-40分钟',
        description: '跑步是最常见的有氧运动，能够有效提升心肺功能，燃烧脂肪。',
        steps: [
          '选择合适的跑鞋和场地',
          '开始前进行5分钟热身',
          '保持稳定的速度和节奏',
          '注意呼吸节奏，一般三步一吸两步一呼',
          '结束后进行5-10分钟拉伸'
        ],
        tips: '初学者可以从快走开始；保持正确跑姿；循序渐进增加距离',
        benefits: ['提升心肺功能', '燃烧脂肪', '增强耐力']
      },
      {
        id: 'swimming',
        title: '游泳',
        difficulty: '中级',
        difficultyClass: 'intermediate',
        duration: '30-45分钟',
        description: '游泳是全身性有氧运动，对关节压力小，适合各类人群。',
        steps: [
          '下水前进行充分热身',
          '学习正确的呼吸节奏',
          '保持流线型身体姿势',
          '划水要有力且有节奏',
          '结束前逐渐降低强度'
        ],
        tips: '初学者可以从蛙泳开始；保持规律呼吸；注意安全',
        benefits: ['全身锻炼', '关节友好', '提升肺活量']
      },
      {
        id: 'cycling',
        title: '骑行',
        difficulty: '初级',
        difficultyClass: 'beginner',
        duration: '30-60分钟',
        description: '骑行是一种低冲击有氧运动，对膝关节友好，同时能锻炼下肢力量。',
        steps: [
          '调整座椅高度至合适位置',
          '开始以低阻力热身10分钟',
          '保持稳定踏频（80-100rpm）',
          '适时调整阻力增加难度',
          '结束后进行拉伸放松'
        ],
        tips: '保持正确骑行姿势；注意补水；选择安全路线',
        benefits: ['保护膝盖', '增强下肢力量', '改善心血管健康']
      },
      {
        id: 'hiit',
        title: 'HIIT间歇训练',
        difficulty: '高级',
        difficultyClass: 'advanced',
        duration: '20-30分钟',
        description: '高强度间歇训练在短时间内能够达到极佳的燃脂效果。',
        steps: [
          '选择3-4个动作组成训练循环',
          '高强度运动20秒，休息10秒',
          '重复6-8个循环',
          '动作要保持标准和有力',
          '结束后进行全身拉伸'
        ],
        tips: '初学者可降低强度延长时间；注意动作质量；保证充足休息',
        benefits: ['高效燃脂', '提升代谢', '节省时间']
      }
    ],
    
    flexibilityExercises: [
      {
        id: 'stretch',
        title: '全身拉伸',
        difficulty: '初级',
        difficultyClass: 'beginner',
        duration: '10-15分钟',
        description: '拉伸能够改善肌肉柔韧性，缓解肌肉紧张，预防运动损伤。',
        steps: [
          '颈部两侧各拉伸15-30秒',
          '肩部环绕和拉伸各方向',
          '胸部打开拉伸30秒',
          '腿部前后侧分别拉伸',
          '背部前屈保持30秒'
        ],
        tips: '拉伸时保持自然呼吸；不要弹震；感到轻微拉伸感即可',
        benefits: ['改善柔韧性', '缓解肌肉紧张', '预防损伤']
      },
      {
        id: 'yoga',
        title: '瑜伽基础',
        difficulty: '初级',
        difficultyClass: 'beginner',
        duration: '20-30分钟',
        description: '瑜伽结合身体姿势、呼吸控制和冥想，全面提升身心状态。',
        steps: [
          '从简单的体式开始（如山式）',
          '逐步过渡到站立平衡体式',
          '进入前屈和扭转体式',
          '最后以放松体式结束',
          '配合深呼吸和冥想'
        ],
        tips: '不要强迫身体进入体式；保持专注和放松；坚持练习',
        benefits: ['提升柔韧性', '增强平衡', '减压放松']
      },
      {
        id: 'hamstring',
        title: '腘绳肌拉伸',
        difficulty: '初级',
        difficultyClass: 'beginner',
        duration: '每侧30秒 x 2组',
        description: '腘绳肌紧张是导致下背部问题和运动损伤的常见原因。',
        steps: [
          '坐姿单腿前屈',
          '保持背部平直向前倾',
          '双手尽量触碰脚尖',
          '感到大腿后侧有拉伸感',
          '换另一侧腿重复'
        ],
        tips: '不要弓背；感到拉伸即可不要弹震；膝盖可微屈',
        benefits: ['改善腘绳肌柔韧性', '缓解下背部紧张', '预防腿筋撕裂']
      }
    ],
    
    powerExercises: [
      {
        id: 'jump',
        title: '跳绳',
        difficulty: '初级',
        difficultyClass: 'beginner',
        duration: '5-10分钟',
        description: '跳绳是经典的爆发力训练，能够提升协调性和心肺功能。',
        steps: [
          '双手握住跳绳，手腕高度与腰部齐平',
          '用前脚掌着地，跳起约5-10厘米',
          '手腕画小圆圈转动跳绳',
          '保持节奏稳定',
          '循序渐进增加时间'
        ],
        tips: '不要跳太高；用手腕而非手臂转动；初学者可以慢速开始',
        benefits: ['提升爆发力', '增强协调性', '燃脂效果好']
      },
      {
        id: 'boxjump',
        title: '箱跳',
        difficulty: '中级',
        difficultyClass: 'intermediate',
        duration: '8-10次 x 3组',
        description: '箱跳是训练爆发力的经典动作，增强下肢快速发力能力。',
        steps: [
          '站在稳固的跳箱前',
          '双脚与肩同宽',
          '屈髋屈膝蓄力',
          '爆发性跳上跳箱',
          '站稳后跳下或走下'
        ],
        tips: '选择合适高度的跳箱（30-50厘米）；落地时屈膝缓冲；保持核心稳定',
        benefits: ['增强爆发力', '提升垂直跳能力', '改善运动表现']
      },
      {
        id: 'burpee',
        title: '波比跳',
        difficulty: '高级',
        difficultyClass: 'advanced',
        duration: '10-15次 x 3组',
        description: '波比跳是全身高强度复合动作，能够快速提升心肺和爆发力。',
        steps: [
          '站立开始，下蹲双手撑地',
          '双脚向后跳成俯卧撑姿势',
          '完成一个俯卧撑',
          '双脚跳回双手位置',
          '爆发性跳起并击掌'
        ],
        tips: '初学者可以去掉俯卧撑环节；保持核心稳定；注意落地缓冲',
        benefits: ['全身燃脂', '提升爆发力', '增强耐力']
      },
      {
        id: 'medicineball',
        title: '药球训练',
        difficulty: '中级',
        difficultyClass: 'intermediate',
        duration: '12-15次 x 3组',
        description: '药球训练能够发展旋转爆发力和核心力量。',
        steps: [
          '双脚与肩同宽，双手持球',
          '身体转向一侧',
          '旋转躯干并将球抛出',
          '接住弹回的球',
          '换另一侧重复'
        ],
        tips: '从轻重量开始；用躯干发力而非手臂；保持双脚稳定',
        benefits: ['提升旋转爆发力', '强化核心', '改善运动表现']
      }
    ],
    
    exerciseDetail: null
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index
    this.setData({ 
      currentTab: index,
      exerciseDetail: null
    })
  },

  showExerciseDetail(e) {
    const category = ['strengthExercises', 'cardioExercises', 'flexibilityExercises', 'powerExercises'][this.data.currentTab]
    const index = e.currentTarget.dataset.index
    const exercise = this.data[category][index]
    
    this.setData({ exerciseDetail: exercise })
  },

  closeDetail() {
    this.setData({ exerciseDetail: null })
  },

  goToVideo(e) {
    const videoId = e.currentTarget.dataset.id
    wx.showToast({
      title: '即将推出教学视频',
      icon: 'none'
    })
  }
})
