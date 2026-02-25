export {}

const app = getApp<IAppOption>()

const COLOR_MAP: Record<string, string> = {
  white: '#fefefe',
  blue: '#3a7ef5',
  red: '#d94141',
  custom: '#9aa7c7',
}

Component({
  data: {
    imagePath: '',
    selectedBackground: 'white',
    previewColor: '#fefefe',
    customColor: '#00A0FF',
    colors: [
      { key: 'white', label: '白色', value: '#fefefe' },
      { key: 'blue', label: '蓝色', value: '#3a7ef5' },
      { key: 'red', label: '红色', value: '#d94141' },
      { key: 'custom', label: '自定义', value: '#9aa7c7' },
    ],
  },

  lifetimes: {
    attached() {
      const selectedBackground = app.globalData.selectedBackground || 'white'
      this.setData({
        imagePath: app.globalData.generatedImagePath || app.globalData.selectedImagePath,
        selectedBackground,
        previewColor: COLOR_MAP[selectedBackground] || '#fefefe',
      })
    },
  },

  methods: {
    selectColor(e: WechatMiniprogram.BaseEvent) {
      const { key } = e.currentTarget.dataset as { key: string }
      const previewColor = key === 'custom' ? this.data.customColor : COLOR_MAP[key]
      this.setData({
        selectedBackground: key,
        previewColor,
      })
      app.globalData.selectedBackground = key
    },

    onCustomInput(e: any) {
      const customColor = e.detail.value
      const isHex = /^#([\da-fA-F]{6})$/.test(customColor)
      this.setData({ customColor })

      if (this.data.selectedBackground === 'custom' && isHex) {
        this.setData({ previewColor: customColor })
      }
    },

    nextStep() {
      if (this.data.selectedBackground === 'custom') {
        const isHex = /^#([\da-fA-F]{6})$/.test(this.data.customColor)
        if (!isHex) {
          wx.showToast({ title: '请输入正确色值', icon: 'none' })
          return
        }
      }

      wx.navigateTo({
        url: '/pages/preview/preview',
      })
    },
  },
})
