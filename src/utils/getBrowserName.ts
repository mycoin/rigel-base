export default (userAgentStr?: string) => {
  let clientName: any = null

  const userAgent = userAgentStr || navigator.userAgent || ''
  const userAgentMatchs = [
    [/Alipay/i, 'Alipay'],
    [/Baiduspider/i, 'Baiduspider'],
    [/Bytespider/i, 'Bytespider'],
    [/bingpreview/i, 'bingspider'],
    [
      /MQQBrowser/i,
      () => {
        if (/ QQ/i.test(userAgent)) {
          return 'QQ'
        }
        if (/MicroMessenger/i.test(userAgent)) {
          return 'Weixin'
        }
        return 'Mobile'
      },
    ],
    [/(BaiduboxApp|SearchCraft)/i, 'BaiduApp'],
    [/weibo/i, 'Weibo'],
    [/haokan/i, 'HaokanApp'],
    [/qukan/i, 'QukanApp'],
    [
      /AliApp/i,
      () => {
        const execResult = /AliApp\(([^\/]*)/.exec(userAgent) // eslint-disable-line
        const aliAgentMatchs = [
          [/microsupply/i, 'MicroSupply'],
          [/(UCBrowser|AliBaichuan)/i, 'UCBrowser'],
          [/TB/i, 'TaobaoApp'],
          [/QN/i, 'Qianniu'],
          [/NAPOS/i, 'Napos'],
          [/Aliexpress/i, 'AliExpress'],
          [/1688/i, 'Alibaba'],
          [/WX/i, 'Wangwin'],
        ]
        if (execResult && execResult[1]) {
          for (let index = 0; index < aliAgentMatchs.length; index++) {
            const currentMatch = aliAgentMatchs[index] as any
            if (currentMatch[0].test(execResult[1]) && currentMatch[1]) {
              return currentMatch[1]
            }
          }
        }
        return null
      },
    ],
    [/(NewsArticle|News)/i, 'ToutiaoApp'],
    [/(CloudMusic|NeteaseMusic)/i, 'NeteaseMusic'],
    [/kaolaAppSpring/i, 'Kaola'],
    [/UCBrowser/i, 'UCBrowser'],
    [/ZhihuHybrid/i, 'Zhihu'],
    [
      /\w/i,
      () => {
        if (/IEMobile/i.test(userAgent)) {
          return 'WindowsPhone'
        }
        if (/Windows\W(NT)/i.test(userAgent)) {
          return 'Desktop'
        }
        if (/Macintosh/i.test(userAgent)) {
          return 'Mac'
        }
        if (/iPhone OS/i.test(userAgent) && /like Mac/i.test(userAgent)) {
          return 'iPhone'
        }
        if (/iPad/i.test(userAgent)) {
          return 'iPad'
        }
        const execResult = /(Huawei|Qihoo|MZ|Oppo|Miui|SogouMobile|360|QQ|Vivo|Baidu|WK|Samsung)Browser/i.exec(userAgent)
        if (execResult && execResult[1]) {
          return 'Mobile'
        }
        return null
      },
    ],
  ]
  userAgentMatchs.forEach((item: any) => {
    if (!clientName && item[0].exec(userAgent)) {
      if (typeof item[1] === 'function') {
        clientName = item[1](userAgent)
      } else if (item[1]) {
        clientName = item[1]
      }
    }
  })
  return clientName || null
}
