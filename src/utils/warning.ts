/* eslint-disable no-console */
import universalEnv from '../universalEnv'

// 打印警告信息
const warning = (...messages: any[]): void => {
  if (universalEnv.isDevelopment || universalEnv.isDebugger) {
    console.warn(...messages)
  }
}

export default warning
