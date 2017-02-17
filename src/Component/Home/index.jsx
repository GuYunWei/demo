import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { hashHistory } from 'react-router'
import { Row, Col } from 'antd'
import './less/home.less'

// components
import Header from '../Header'
import * as actions from 'src/Redux/Action/Index'

const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

class Home extends React.Component {
  getCookie (name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)
    if (arr) {
      return decodeURIComponent(arr[2])
    } else {
      return null
    }
  }

  constructor (props) {
    super(props)
    const userCookie = this.getCookie('user')
  }

  render () {
    return (
      <div className="page">
        <Header logout={this.props.logout} history={this.props.history} />
        <Row>
          <Col span={20} offset={2} className="contain">
            {this.props.children}
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
