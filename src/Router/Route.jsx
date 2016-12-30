import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute } from 'react-router';
import auth from '../Utils/auth.js';

import Login from '../Component/Login/index.jsx';

class App extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const chooseProducts = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/chooseProducts').default)
    },'chooseProducts')
}

const helpCenter = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/helpCenter').default)
    },'helpCenter')
}

const saleRecord = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/saleRecord').default)
    },'saleRecord')
}

const allDeposit = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/allDeposit').default)
    },'allDeposit')
}

const applyRecord = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/applyRecord').default)
    },'applyRecord')
}

const applyDeposit = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/applyDeposit').default)
    },'applyDeposit')
}

function Home() {
  return <h1>Hey, I see you are authenticated. Welcome!</h1>
}

function ErrorPage() {
  return <h1>Oh no! Your auth failed!</h1>
}

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

  function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

  function redirectToHome(nextState, replace) {
    if (auth.loggedIn()) {
      replace('/home')
    }
  }

const RouteConfig = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} onEnter={requireAuth}/>
        <Route path="login" component={Login} onEnter={redirectToHome}/>
        <Route path="logout" component={Logout} />
        <Route path="home" getComponent={Home} />
        <Route path="helpCenter" getComponent={helpCenter} />
        <Route path="saleRecord" getComponent={saleRecord} />
        <Route path="chooseProducts" getComponent={chooseProducts} />
        <Route path="allDeposit" getComponent={allDeposit} />
        <Route path="applyDeposit" getComponent={applyDeposit} />
        <Route path="applyRecord" getComponent={applyRecord} />
        <Route path="error" component={ErrorPage}/>
        <Redirect from='*' to='/' />
    </Route>
);

export default RouteConfig;