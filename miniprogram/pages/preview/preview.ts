export {}

const app = getApp<IAppOption>()

type SizeOption = {
  key: string
  label: string
  stageClass: string
}

type BackgroundOption = {
  key: string
  label: string
  dotColor: string
  previewColor: string
  strokeColor: string
}

const SIZE_OPTIONS: SizeOption[] = [
  {
    key: 'one',
    label: '一寸',
    stageClass: 'stage-one',
  },
  {
    key: 'two',
    label: '二寸',
    stageClass: 'stage-two',
  },
  {
    key: 'passport',
    label: '护照',
    stageClass: 'stage-passport',
  },
  {
    key: 'visa',
    label: '签证',
    stageClass: 'stage-visa',
  },
]

const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    key: 'white',
    label: '白色',
    dotColor: '#FFFFFF',
    previewColor: '#f8fafc',
    strokeColor: '#d1d5db',
  },
  {
    key: 'blue',
    label: '蓝色',
    dotColor: '#5FA8FF',
    previewColor: '#eff5ff',
    strokeColor: '#1677ff',
  },
  {
    key: 'red',
    label: '红色',
    dotColor: '#F56565',
    previewColor: '#fff1f1',
    strokeColor: '#e35d5d',
  },
]

const DEFAULT_SIZE_KEY = 'one'
const DEFAULT_BACKGROUND_KEY = 'blue'

const getSizeOption = (key: string) =>
  SIZE_OPTIONS.find((item) => item.key === key) || SIZE_OPTIONS[0]

const getBackgroundOption = (key: string) =>
  BACKGROUND_OPTIONS.find((item) => item.key === key) || BACKGROUND_OPTIONS[1]

Component({
  data: {
    imagePath: '',
    sizeOptions: SIZE_OPTIONS,
    backgroundOptions: BACKGROUND_OPTIONS,
    selectedSize: DEFAULT_SIZE_KEY,
    currentLabel: SIZE_OPTIONS[0].label,
    stageClass: SIZE_OPTIONS[0].stageClass,
    selectedBackground: DEFAULT_BACKGROUND_KEY,
    previewColor: BACKGROUND_OPTIONS[1].previewColor,
    showBackgroundSheet: true,
  },

  lifetimes: {
    attached() {
      const imagePath = app.globalData.generatedImagePath || app.globalData.selectedImagePath || ''
      const selectedSize = app.globalData.selectedSize || DEFAULT_SIZE_KEY
      const selectedBackground = app.globalData.selectedBackground || DEFAULT_BACKGROUND_KEY
      const sizeOption = getSizeOption(selectedSize)
      const backgroundOption = getBackgroundOption(selectedBackground)

      this.setData({
        imagePath,
        selectedSize: sizeOption.key,
        currentLabel: sizeOption.label,
        stageClass: sizeOption.stageClass,
        selectedBackground,
        previewColor: backgroundOption.previewColor,
      })
    },
  },

  methods: {
    goBack() {
      wx.navigateBack()
    },

    chooseSize() {
      wx.showActionSheet({
        itemList: SIZE_OPTIONS.map((item) => item.label),
        success: (res) => {
          const nextSize = SIZE_OPTIONS[res.tapIndex]
          if (!nextSize) {
            return
          }

          app.globalData.selectedSize = nextSize.key
          this.setData({
            selectedSize: nextSize.key,
            currentLabel: nextSize.label,
            stageClass: nextSize.stageClass,
          })
        },
      })
    },

    toggleBackgroundSheet() {
      this.setData({
        showBackgroundSheet: !this.data.showBackgroundSheet,
      })
    },

    selectColor(e: WechatMiniprogram.BaseEvent) {
      const { key } = e.currentTarget.dataset as { key: string }
      const backgroundOption = getBackgroundOption(key)

      this.setData({
        selectedBackground: key,
        previewColor: backgroundOption.previewColor,
      })
      app.globalData.selectedBackground = key
    },

    resetAll() {
      const sizeOption = getSizeOption(DEFAULT_SIZE_KEY)
      const backgroundOption = getBackgroundOption(DEFAULT_BACKGROUND_KEY)

      this.setData({
        selectedSize: sizeOption.key,
        currentLabel: sizeOption.label,
        stageClass: sizeOption.stageClass,
        selectedBackground: backgroundOption.key,
        previewColor: backgroundOption.previewColor,
        showBackgroundSheet: true,
      })
      app.globalData.selectedSize = sizeOption.key
      app.globalData.selectedBackground = backgroundOption.key
      wx.showToast({ title: '已重置', icon: 'none' })
    },

    savePhoto() {
      const filePath = this.data.imagePath

      if (!filePath) {
        wx.showToast({ title: '请先上传照片', icon: 'none' })
        return
      }

      wx.saveImageToPhotosAlbum({
        filePath,
        success: () => {
          wx.showToast({ title: '已保存到相册', icon: 'success' })
        },
        fail: () => {
          wx.showToast({ title: '保存失败，请检查相册权限', icon: 'none' })
        },
      })
    },
  },
})
