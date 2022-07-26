import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom';
// ANTD
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
// 验证
import { validate_password } from "../../utils/validate";
// 组件
import Code from "../../components/code/index";
// 加密
import CryptoJs from 'crypto-js';
//设置token
import { setToken, setUsername } from '.././../utils/cookies'
//登录 || 注册
import { Login } from '../../api/login'


class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "1145479929@qq.com",
            password: "123321",
            code: "",
            module: "login",
            loading: false
        };
    }
    // 登录
    onFinish = (values) => {
        // const requestData = {
        //     username: this.state.username,
        //     code: this.state.code,
        //     password: CryptoJs.MD5(this.state.password).toString(),
        // }
        // this.setState({
        //     loading: true
        // })
        // console.log(requestData)    
        // 存储token
        // setToken(requestData.username);
        // setUsername(requestData.username);
        // this.props.history.push('/index');

        // this.props.actions.handlerLogin(requestData).then(response => {
        //     this.props.history.push('/index');
        //     // 先调用登录接口 => 调用获取角色接口
        //     // this.props.actions.headnlerUserRole().then(response => {
        //     //     this.props.history.push('/index');
        //     // })
        // }).catch(error => {

        // })
        // return
        const requestData = {
            username: values.username,
            code: '111111',
            password: CryptoJs.MD5(values.password).toString(),
        }

        Login(requestData).then(response => {  // resolves
            this.setState({
                loading: false
            })
            if (response.code === 1) {
                setToken(requestData.username);
                setUsername(requestData.username);
                message.success(response.msg)
                this.props.history.push('/index');
            } else if (response.code === 0) {
                message.error(response.msg)
            }
            // const data = response
            // actions
            // this.props.actions.setToken(data.token);
            // this.props.actions.setUsername(data.username);
            // // 存储token
            // setToken(data.token);
            // setUsername(data.username);
            // // 存储用户角色
            // sessionStorage.setItem("role", data.role);
            // // 路由跳转
            // this.props.history.push('/index');
        }).catch(error => {  // reject
            this.setState({
                loading: false
            })
        })
        // console.log('Received values of form: ', values);
    };

    getVerificatCode = (value) => {
        this.setState({
            code: value
        })
    }
    /** input输入处理 */
    inputChangeUsername = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }
    inputChangePassword = (e) => {
        let value = e.target.value;
        this.setState({
            password: value
        })
    }
    inputChangeCode = (e) => {
        let value = e.target.value;
        this.setState({
            code: value
        })
    }
    toggleForm = () => {
        // 调父级的方法
        this.props.switchForm("register");
    }
    render() {
        const { username, module, loading, code } = this.state;
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toggleForm}>帐号注册</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item name="username" rules={
                            [
                                { required: true, message: "邮箱不能为空" },
                                { type: "email", message: "邮箱格式不正确" }
                            ]
                        }>
                            <Input value={username} onChange={this.inputChangeUsername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password" rules={
                            [
                                { required: true, message: '密码不能为空' },
                                { pattern: validate_password, message: "请输入大于6位小于20位数字+字母" },
                            ]
                        }>
                            <Input type="password" onChange={this.inputChangePassword} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="code" rules={
                            [
                                { message: '验证码不能为空' },
                                { len: 6, message: '请输入长度为6位的验证码' }
                            ]
                        } >
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.inputChangeCode} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" value={code} />
                                </Col>
                                <Col span={9}>
                                    <Code username={username} module={module} getVerificatCode={this.getVerificatCode} />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" loading={loading} htmlType="submit" className="login-form-button" block> 登录 </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(LoginForm);