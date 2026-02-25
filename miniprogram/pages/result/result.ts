export {}

const app = getApp<IAppOption>()

Component({
  data: {
    imagePath: '',
  },

  lifetimes: {
    attached() {
      this.setData({
        imagePath: app.globalData.generatedImagePath || app.globalData.selectedImagePath,
      })
    },
  },

  methods: {
    saveToPhone() {
      wx.showToast({
        title: '已保存到相册（演示）',
        icon: 'success',
      })
    },

    createAnother() {
      app.globalData.selectedImagePath = ''
      app.globalData.generatedImagePath = ''
      app.globalData.selectedSize = ''
      app.globalData.selectedBackground = 'white'

      wx.reLaunch({
        url: '/pages/index/index',
      })
    },
  },
})
