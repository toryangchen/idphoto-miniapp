export {}

const app = getApp<IAppOption>()

const SIZE_LABELS: Record<string, string> = {
  passport: '护照',
  visa: '签证',
  exam: '考试',
  resume: '简历',
  custom: '自定义',
}

const BG_LABELS: Record<string, string> = {
  white: '白色',
  blue: '蓝色',
  red: '红色',
  custom: '自定义',
}

Component({
  data: {
    imagePath: '',
    selectedSizeText: '未选择',
    selectedBackgroundText: '白色',
    beautyEnabled: true,
  },

  lifetimes: {
    attached() {
      const sizeKey = app.globalData.selectedSize
      const bgKey = app.globalData.selectedBackground

      this.setData({
        imagePath: app.globalData.generatedImagePath || app.globalData.selectedImagePath,
        selectedSizeText: SIZE_LABELS[sizeKey] || '未选择',
        selectedBackgroundText: BG_LABELS[bgKey] || '白色',
        beautyEnabled: app.globalData.beautyEnabled,
      })
    },
  },

  methods: {
    onCrop() {
      wx.showToast({ title: '裁剪能力下一步接入', icon: 'none' })
    },

    onReposition() {
      wx.showToast({ title: '移动能力下一步接入', icon: 'none' })
    },

    toggleBeauty(e: any) {
      const beautyEnabled = e.detail.value
      app.globalData.beautyEnabled = beautyEnabled
      this.setData({ beautyEnabled })
    },

    regenerate() {
      wx.redirectTo({
        url: '/pages/processing/processing',
      })
    },

    download() {
      wx.navigateTo({
        url: '/pages/result/result',
      })
    },
  },
})
