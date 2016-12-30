import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Tool } '../Config/tool'

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            if (!this.props.isAuthenticated) {
                let redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(push(null, `/login?next=${redirectAfterLogin}`));
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        token: Tool.localItem("token"),
        userName: Tool.localItem("userName"),
        isAuthenticated: Tool.localItem("isAuthenticated")
    });

    return connect(mapStateToProps)(AuthenticatedComponent);
}