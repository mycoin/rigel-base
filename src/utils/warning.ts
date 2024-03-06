import universalEnv from '../universalEnv'

/**
 * print warning message
 *
 * @param messages
 */
export default (...messages: any[]): void => {
  if (universalEnv.isDevelopment || universalEnv.isDebugger) {
    console.warn(...messages)
  }
}
