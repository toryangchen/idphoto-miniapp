export {}

const app = getApp<IAppOption>()

Component({
  data: {
    status: 'loading',
  },

  pageLifetimes: {
    show() {
      this.startProcess()
    },
  },

  methods: {
    startProcess() {
      this.setData({ status: 'loading' })

      setTimeout(() => {
        const hasInput = !!app.globalData.selectedImagePath

        if (!hasInput) {
          this.setData({ status: 'fail' })
          return
        }

        app.globalData.generatedImagePath = app.globalData.selectedImagePath
        wx.redirectTo({
          url: '/pages/size/size',
        })
      }, 1500)
    },

    retry() {
      this.startProcess()
    },

    reupload() {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    },
  },
})
