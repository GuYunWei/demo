import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as actions from 'src/Redux/Action'
import { bindActionCreators } from 'redux'
import { URL } from 'src/Constant/interface'
import { connect } from 'react-redux'
import { Tool } from 'src/Utils/tool'
import Fetch from 'src/Utils/fetch'

import aside from './images/aside.png'
import './less/login.less'
const FormItem = Form.Item

const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

class Login extends React.Component {
  constructor (props) {
    super(props)
    const userdata = JSON.parse(localStorage.userdata || '{}')
    this.state = {
      loading: false,
      userdata: userdata
    }
  }
  componentDidMount() {
    if (this.state.userdata.remember) {
      this.login(this.state.userdata)
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err)
        return false
      }
      // 表单验证通过
      this.setState({loading: true})
      this.login({
        username: values.username,
        password: values.password,
        remember: values.remember
      })
    });
  }
  login(user) {
    Fetch.get(URL.LOGIN + Tool.paramType(user))
      .then(res => {
        this.setState({loading: false})
        this.props.setUser(res);
        localStorage.userdata = JSON.stringify(user)
        this.context.router.push({
          pathname: this.props.location.query.direct || '/home',
          query: JSON.parse(this.props.location.query.params || '{}')
        })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-body">
        <div className="login-main">
          <img src={aside} className="img-aside" />
          <section>
            <h4 className="login-title" >React Demo中后台开发框架</h4>
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                  initialValue: this.state.userdata.username
                })(
                  <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                  initialValue: this.state.userdata.password
                })(
                  <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: this.state.userdata.remember,
                })(
                  <Checkbox>自动登录</Checkbox>
                )}
                <a className="login-form-forgot">忘记密码</a>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.load}>
                  {this.state.loading ? '登录中...' : '登录'}
                </Button>
                <a className="pull-left">立即注册</a>
              </FormItem>
            </Form>
          </section>
        </div>
        <p className="copyright">Copyright©Guyw</p>
      </div>
    );
  }
};

Login.contextTypes = {
  router: React.PropTypes.object
}

export default Form.create({})(connect(mapStateToProps, mapDispatchToProps)(Login))
