export {}

const app = getApp<IAppOption>()

Component({
  data: {
    hasUpload: false,
    imagePath: '',
  },

  lifetimes: {
    attached() {
      const imagePath = app.globalData.selectedImagePath || ''
      this.setData({
        hasUpload: !!imagePath,
        imagePath,
      })
    },
  },

  methods: {
    choosePhoto() {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const imagePath = res.tempFilePaths[0]
          app.globalData.selectedImagePath = imagePath
          app.globalData.generatedImagePath = imagePath
          this.setData({
            hasUpload: true,
            imagePath,
          })

          wx.navigateTo({
            url: '/pages/preview/preview',
          })
        },
      })
    },
  },
})
