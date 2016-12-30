import React from 'react'
import { render } from 'react-dom'
import { createHashHistory } from 'history'
import { browserHistory, useRouterHistory } from 'react-router'
// 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件
import { syncHistoryWithStore } from 'react-router-redux'  
import Root from './Container/Root'
import configureStore from './Redux/Store/configureStore'
import './Config/configuration.js'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import './Style/common.scss'
import './Style/head.scss'
import './Style/index.scss'
import './Style/chooseProducts.scss'
import './Style/helpCenter.less'
import './Style/saleRecord.less'
import './Style/allDeposit.less'
import './Style/applyDeposit.less'
import './Style/applyRecord.less'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
// const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
// const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false })
// const history = syncHistoryWithStore(hashHistory, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)