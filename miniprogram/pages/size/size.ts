export {}

const app = getApp<IAppOption>()

Component({
  data: {
    selectedSize: '',
    sizeOptions: [
      { key: 'passport', label: '护照', icon: '🛂' },
      { key: 'visa', label: '签证', icon: '🧾' },
      { key: 'exam', label: '考试', icon: '🎓' },
      { key: 'resume', label: '简历', icon: '💼' },
      { key: 'custom', label: '自定义', icon: '⚙️' },
    ],
  },

  lifetimes: {
    attached() {
      this.setData({
        selectedSize: app.globalData.selectedSize || '',
      })
    },
  },

  methods: {
    selectSize(e: WechatMiniprogram.BaseEvent) {
      const { key } = e.currentTarget.dataset as { key: string }
      this.setData({ selectedSize: key })
      app.globalData.selectedSize = key
    },

    nextStep() {
      if (!this.data.selectedSize) {
        wx.showToast({
          title: '请选择尺寸',
          icon: 'none',
        })
        return
      }

      wx.navigateTo({
        url: '/pages/background/background',
      })
    },
  },
})
