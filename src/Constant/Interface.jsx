const base = 'http://rap.taobao.org/mockjsdata/12923'

const URL = {
  LOGIN: `${base}/login`,
  CFG_INIT: `${base}config/getConfig`    // 获取配置信息
}

Object.freeze(URL)

export {URL}
