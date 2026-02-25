/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo
    selectedImagePath: string
    generatedImagePath: string
    selectedSize: string
    selectedBackground: string
    beautyEnabled: boolean
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
}
