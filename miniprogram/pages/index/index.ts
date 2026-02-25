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
          this.setData({
            hasUpload: true,
            imagePath,
          })
        },
      })
    },

    startMagic() {
      if (!this.data.hasUpload) {
        wx.showToast({
          title: '请先上传照片',
          icon: 'none',
        })
        return
      }

      wx.navigateTo({
        url: '/pages/processing/processing',
      })
    },

    showTips() {
      wx.showModal({
        title: '拍照建议',
        content: '1. 正脸直视镜头\n2. 光线均匀\n3. 避免遮挡五官\n4. 背景尽量简洁',
        showCancel: false,
      })
    },
  },
})
