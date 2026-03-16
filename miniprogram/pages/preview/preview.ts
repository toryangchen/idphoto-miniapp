export {}

const app = getApp<IAppOption>()

type SizeOption = {
  key: string
  label: string
  spec: string
  stageClass: string
}

type BackgroundOption = {
  key: string
  label: string
  dotColor: string
  previewColor: string
  strokeColor: string
  statusLabel: string
}

const SIZE_OPTIONS: SizeOption[] = [
  { key: 'one', label: '一寸', spec: '295×413px', stageClass: 'stage-one' },
  { key: 'two', label: '二寸', spec: '413×579px', stageClass: 'stage-two' },
  { key: 'passport', label: '护照', spec: '390×567px', stageClass: 'stage-passport' },
  { key: 'visa', label: '签证', spec: '413×531px', stageClass: 'stage-visa' },
]

const BACKGROUND_OPTIONS: BackgroundOption[] = [
  { key: 'white', label: '白色', dotColor: '#FFFFFF', previewColor: '#FFFFFF', strokeColor: '#D1D5DB', statusLabel: '白底' },
  { key: 'blue', label: '蓝色', dotColor: '#5FA8FF', previewColor: '#5FA8FF', strokeColor: '#1677FF', statusLabel: '蓝底' },
  { key: 'red', label: '红色', dotColor: '#F56565', previewColor: '#F56565', strokeColor: '#E35D5D', statusLabel: '红底' },
]

const DEFAULT_SIZE_KEY = 'one'
const DEFAULT_BACKGROUND_KEY = 'blue'
const DEFAULT_PREVIEW_IMAGE = '/assets/design/preview-cutout.png'

const getSizeOption = (key: string) =>
  SIZE_OPTIONS.find((item) => item.key === key) || SIZE_OPTIONS[0]

const getBackgroundOption = (key: string) =>
  BACKGROUND_OPTIONS.find((item) => item.key === key) || BACKGROUND_OPTIONS[1]

Component({
  data: {
    imagePath: DEFAULT_PREVIEW_IMAGE,
    sizeOptions: SIZE_OPTIONS,
    backgroundOptions: BACKGROUND_OPTIONS,
    selectedSize: DEFAULT_SIZE_KEY,
    currentLabel: SIZE_OPTIONS[0].label,
    currentSpec: SIZE_OPTIONS[0].spec,
    stageClass: SIZE_OPTIONS[0].stageClass,
    selectedBackground: DEFAULT_BACKGROUND_KEY,
    previewColor: BACKGROUND_OPTIONS[1].previewColor,
    currentBgLabel: BACKGROUND_OPTIONS[1].statusLabel,
  },

  lifetimes: {
    attached() {
      const sizeOption = getSizeOption(app.globalData.selectedSize || DEFAULT_SIZE_KEY)
      const backgroundOption = getBackgroundOption(app.globalData.selectedBackground || DEFAULT_BACKGROUND_KEY)
      const imagePath = app.globalData.generatedImagePath || app.globalData.selectedImagePath || DEFAULT_PREVIEW_IMAGE

      this.setData({
        imagePath,
        selectedSize: sizeOption.key,
        currentLabel: sizeOption.label,
        currentSpec: sizeOption.spec,
        stageClass: sizeOption.stageClass,
        selectedBackground: backgroundOption.key,
        previewColor: backgroundOption.previewColor,
        currentBgLabel: backgroundOption.statusLabel,
      })
    },
  },

  methods: {
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
            currentSpec: nextSize.spec,
            stageClass: nextSize.stageClass,
          })
        },
      })
    },

    selectSize(e: WechatMiniprogram.BaseEvent) {
      const { key } = e.currentTarget.dataset as { key: string }
      const nextSize = getSizeOption(key)
      app.globalData.selectedSize = nextSize.key
      this.setData({
        selectedSize: nextSize.key,
        currentLabel: nextSize.label,
        currentSpec: nextSize.spec,
        stageClass: nextSize.stageClass,
      })
    },

    selectColor(e: WechatMiniprogram.BaseEvent) {
      const { key } = e.currentTarget.dataset as { key: string }
      const backgroundOption = getBackgroundOption(key)
      app.globalData.selectedBackground = backgroundOption.key
      this.setData({
        selectedBackground: backgroundOption.key,
        previewColor: backgroundOption.previewColor,
        currentBgLabel: backgroundOption.statusLabel,
      })
    },

    autoCenter() {
      wx.showToast({ title: '已自动居中', icon: 'none' })
    },

    resetAll() {
      const sizeOption = getSizeOption(DEFAULT_SIZE_KEY)
      const backgroundOption = getBackgroundOption(DEFAULT_BACKGROUND_KEY)
      const imagePath = app.globalData.generatedImagePath || app.globalData.selectedImagePath || DEFAULT_PREVIEW_IMAGE

      app.globalData.selectedSize = sizeOption.key
      app.globalData.selectedBackground = backgroundOption.key

      this.setData({
        imagePath,
        selectedSize: sizeOption.key,
        currentLabel: sizeOption.label,
        currentSpec: sizeOption.spec,
        stageClass: sizeOption.stageClass,
        selectedBackground: backgroundOption.key,
        previewColor: backgroundOption.previewColor,
        currentBgLabel: backgroundOption.statusLabel,
      })

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
        success: () => wx.showToast({ title: '已保存到相册', icon: 'success' }),
        fail: () => wx.showToast({ title: '保存失败，请检查相册权限', icon: 'none' }),
      })
    },
  },
})
