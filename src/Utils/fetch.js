import 'fetch-ie8'
import 'fetch-detector'
import 'fetch-jsonp'
import 'es6-promise/auto'
import { hashHistory, browserHistory } from 'react-router'
import { message } from 'antd'

export default class Fetch {
  static get (url) {
    return Fetch.connect(url, {
      method: 'get',
      mode: "cors",
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  static post (url, data) {
    return Fetch.connect(url,{
        method: 'post',
        mode: "cors",
        // credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
  }

  static connect (url, body) {
    return fetch(url, body)
      .then(
        (response) => {
          if (response.ok) {
              return response.json();
          } else {
              if (response.status === 404) {
                throw '404'
              } else if (response.status >= 500 && response.status < 600) {
                throw '服务器接口异常'
              }
          }
        },
        () => {
          return {
            success: false,
            msg: '网络连接异常，请重试！'
          }
        }
      )
      .then((res) => {
        if (!res.success) {
          message.error(res.errMsg)
          if (res.statusCode === 102) {
            delete localStorage.token
            // hashHistory.push({pathname: '/login'})
            browserHistory.push({pathname: '/login'})
          }
        }
        return res
      })
      .catch((e) => {
        if (e === '404') {
          return {
            success: false,
            statusCode: 404,
            msg: '接口地址不正确'
          }
        } else if (e === '服务器接口异常') {
          message.error('服务器端接口异常，请联系管理员或按F5刷新重试')
          return {
            success: false,
            statusCode: 500,
            msg: '服务器接口异常'
          }
        }
      })
  }
}