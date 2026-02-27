export {}

const app = getApp<IAppOption>()

const COLOR_MAP: Record<string, string> = {
  white: '#f4f4f4',
  blue: '#4f90db',
  red: '#e74b4b',
}

Component({
  data: {
    imagePath: '',
    selectedBackground: 'white',
    previewColor: '#f4f4f4',
    currentSizeTab: 'one',
  },

  lifetimes: {
    attached() {
      const imagePath = app.globalData.generatedImagePath || app.globalData.selectedImagePath || ''
      const selectedBackground = app.globalData.selectedBackground || 'white'
      this.setData({
        imagePath,
        selectedBackground,
        previewColor: COLOR_MAP[selectedBackground] || '#f4f4f4',
      })
    },
  },

  methods: {
    goBack() {
      wx.navigateBack()
    },

    switchSizeTab(e: WechatMiniprogram.BaseEvent) {
      const { key } = e.currentTarget.dataset as { key: string }
      this.setData({ currentSizeTab: key })
    },

    selectColor(e: WechatMiniprogram.BaseEvent) {
      const { key } = e.currentTarget.dataset as { key: string }
      this.setData({
        selectedBackground: key,
        previewColor: COLOR_MAP[key] || '#f4f4f4',
      })
      app.globalData.selectedBackground = key
    },

    resetAll() {
      this.setData({
        currentSizeTab: 'one',
        selectedBackground: 'white',
        previewColor: '#f4f4f4',
      })
      app.globalData.selectedBackground = 'white'
      wx.showToast({ title: '已重置', icon: 'none' })
    },

    savePhoto() {
      wx.showToast({ title: '保存成功', icon: 'success' })
    },
  },
})
