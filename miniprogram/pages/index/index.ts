export {}

const app = getApp<IAppOption>()

type SizeOption = {
  key: string
  label: string
}

type FeatureOption = {
  key: string
  label: string
  iconSrc: string
  width: number
}

type FlowStep = {
  key: string
  index: string
  label: string
}

const SIZE_OPTIONS: SizeOption[] = [
  { key: 'one', label: '一寸' },
  { key: 'two', label: '二寸' },
  { key: 'passport', label: '护照' },
  { key: 'visa', label: '签证' },
]

const FEATURES: FeatureOption[] = [
  {
    key: 'cutout',
    label: '智能抠图',
    width: 152,
    iconSrc:
      'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 8 8%22%3E%3Cpath d=%22M4 0l1 3 3 1-3 1-1 3-1-3-3-1 3-1z%22 fill=%22%232F7CFF%22/%3E%3C/svg%3E',
  },
  {
    key: 'crop',
    label: '精准裁剪',
    width: 152,
    iconSrc:
      'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 8 8%22%3E%3Cpath d=%22M0 0h3v1.5H1.5v1.5H0V0zm8 0v3H6.5V1.5H5V0h3zM0 8V5h1.5v1.5H3V8H0zm8 0H5V6.5h1.5V5H8v3z%22 fill=%22%238B5CF6%22/%3E%3C/svg%3E',
  },
  {
    key: 'bg',
    label: '快速换底色',
    width: 168,
    iconSrc:
      'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 8 8%22%3E%3Cpath d=%22M4 0c1.8 2 3 3.4 3 5a3 3 0 1 1-6 0c0-1.6 1.2-3 3-5z%22 fill=%22%2310B981%22/%3E%3C/svg%3E',
  },
  {
    key: 'beauty',
    label: '快速美颜',
    width: 152,
    iconSrc:
      'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 8 8%22%3E%3Cpath d=%22M4 0.5l0.8 2.7 2.7 0.8-2.7 0.8-0.8 2.7-0.8-2.7-2.7-0.8 2.7-0.8z%22 fill=%22%23F59E0B%22/%3E%3C/svg%3E',
  },
]

const FLOW_STEPS: FlowStep[] = [
  { key: 'upload', index: '1', label: '上传照片' },
  { key: 'adjust', index: '2', label: '调整尺寸与底色' },
  { key: 'save', index: '3', label: '保存下载' },
]

Component({
  data: {
    sizeOptions: SIZE_OPTIONS,
    selectedSize: 'one',
    features: FEATURES,
    flowSteps: FLOW_STEPS,
  },

  lifetimes: {
    attached() {
      this.setData({
        selectedSize: app.globalData.selectedSize || 'one',
      })
    },
  },

  methods: {
    selectSize(e: WechatMiniprogram.BaseEvent) {
      const { key } = e.currentTarget.dataset as { key: string }
      app.globalData.selectedSize = key
      this.setData({ selectedSize: key })
    },

    choosePhoto() {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const imagePath = res.tempFilePaths[0]
          app.globalData.selectedImagePath = imagePath
          app.globalData.generatedImagePath = imagePath

          wx.navigateTo({
            url: '/pages/preview/preview',
          })
        },
      })
    },
  },
})
