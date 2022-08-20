/* eslint-disable no-undef */
import parseParam from '../utils/parseParam'

declare global {
  const callNative: any;
  const my: any;
  const wx: any;
  const WXEnvironment: any;
  const __kraken__: any;
}

const isUndef = (type: string) => {
  return type === 'undefined'
}

const isWeb = !isUndef(typeof window) && 'onload' in window
const isNode = !isUndef(typeof process) && !!(process.versions && process.versions.node)
const isWeex = !isUndef(typeof WXEnvironment) && WXEnvironment.platform !== 'Web'
const isKraken = !isUndef(typeof __kraken__)
const isMiniApp = !isUndef(typeof my) && my !== null && !isUndef(typeof my.alert)

// In wechat mini program, wx.login is a function
// In wechat mini propgram webview, there is no wx.login, but exist wx.miniProgram
const isWeChatMiniProgram = !isUndef(typeof wx)
  && wx !== null
  && (!isUndef(typeof wx.login) || !isUndef(typeof wx.miniProgram))

const isQuickApp = !isUndef(typeof global)
  && global !== null
  // @ts-ignore
  && !isUndef(typeof global.callNative)
  && !isWeex

// methods
const userAgent = isWeb ? navigator.userAgent : ''
const platform = isWeb ? navigator.platform : ''

const userAgentMatch = (regex: RegExp) => {
  return regex.test(userAgent)
}

const browserVersion = (regex: RegExp) => {
  const match = regex.exec(userAgent)
  return match && match[1]
}

// others
const isDevelopment = (isNode && /development/.test(process.env.NODE_ENV))
const isDebugger = (isWeb && /_debugMode_/i.test(window.location.search))

// parameterMap
const parameters = isWeb
  ? parseParam(window.location.search)
  : {}

const isAndroid = userAgentMatch(/Android/i)
const isIos = userAgentMatch(/iphone|ipad|ipod|ios/i)
const isWeiXin = userAgentMatch(/MicroMessenger/i)
const isChrome = browserVersion(/Chrome\/(\d+)/i)
const isIE = browserVersion(/MSIE (\d+)/)
  || browserVersion(/Trident\/.*; rv:(\d+)/)
  || browserVersion(/(Edge\/\d+)/)

const isFirefox = browserVersion(/Firefox\/(\d+)/)
const isSafari = (browserVersion(/Chrome\/(\d+)/) || browserVersion(/(Edge\/\d+)/))
  ? null
  : browserVersion(/Version\/([\d.]+)( Mobile\/.+?)? Safari\/\d+/)

const isWindows = /^Win/i.test(platform)
const isMac = /^Mac/i.test(platform)
const isWiFi = () => {
  const n = (global as any).navigator
  const connection = n.connection || n.mozConnection || n.webkitConnection
  if (connection) {
    return connection.type !== 'cellular'
  } else if (isWeiXin) {
    return /NetType\/WIFI/.test(navigator.userAgent)
  } else {
    return undefined
  }
}

export default {
  isWeb,
  isNode,
  isWeex,
  isKraken,
  isMiniApp,
  isWeChatMiniProgram,
  isQuickApp,
  isDevelopment,
  isDebugger,
  isAndroid,
  isIos,
  isWiFi,
  isWindows,
  isMac,
  isChrome,
  isSafari,
  isIE,
  isFirefox,
  parameters,
}
