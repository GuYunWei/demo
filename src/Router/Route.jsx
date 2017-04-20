import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute } from 'react-router';
import Login from '../Component/Login';

class App extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const Home = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/Home').default)
    },'home')
}

function ErrorPage() {
  return <h1>Oh no! Your auth failed!</h1>
}

const Logout = React.createClass({
  componentDidMount() {
    // auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

  function requireAuth(nextState, replace) {
    if (!localStorage.userdata) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

  function redirectToHome(nextState, replace) {
    if (localStorage.userdata && localStorage.userdata.remember) {
      replace('/home')
    }
  }

const RouteConfig = (
    <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <Route path="login" component={Login} onEnter={redirectToHome}/>
        <Route path="logout" component={Logout} />
        <Route path="/home" getComponent={Home} onEnter={requireAuth}/>
        <Route path="error" component={ErrorPage}/>
        <Redirect from='*' to='/' />
    </Route>
);

export default RouteConfig;