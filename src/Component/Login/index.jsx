import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { URL } from 'src/Constant/interface'
import { Tool } from 'src/Utils/tool'
import Fetch from 'src/Utils/fetch'

import aside from './images/aside.png'
import './less/login.less'
const FormItem = Form.Item

class Login extends React.Component {
  constructor (props) {
    super(props)
    // this.loginable = JSON.parse(localStorage['loginable'] || '{}')
    this.state = {
      loading: false,
      userName: '',
      password: ''
    }
  }
  componentDidMount() {
    // const { userName, password } = localStorage.token
    // if (userName && password) {
    //   this.setState({ userName, password })
    // }
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
      const postData = {
        username: values.userName,
        password: values.password,
        remember: values.remember
      } 

      Fetch.get(URL.LOGIN + Tool.paramType(postData))
        .then(res => {
          console.log(res)
      })
    });
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
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
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

export default Form.create({})(Login)
