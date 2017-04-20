import React from 'react'
import { render } from 'react-dom'
import { createHashHistory } from 'history'
import { browserHistory, useRouterHistory } from 'react-router'
// 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件
import { syncHistoryWithStore } from 'react-router-redux'  
import Root from './Container/Root'
import Store from './Redux/Store'
// import './Config/configuration.js'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const store = Store()
const history = syncHistoryWithStore(browserHistory, store)
// const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
// const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false })
// const history = syncHistoryWithStore(hashHistory, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)