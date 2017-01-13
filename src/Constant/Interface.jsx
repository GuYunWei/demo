
const base = 'http://rap.taobao.org/mockjs/12923'
const remoteUrl = {
  LOGIN: `${base}/login`,
  CFG_INIT: `${base}config/getConfig`    // 获取配置信息
}

Object.freeze(remoteUrl)

export {remoteUrl}
