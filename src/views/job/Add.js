import React, { Component } from "react";
//antd
import { Form, Input, Button, InputNumber, Radio, message } from 'antd';
// url
// import requestUrl from "@api/requestUrl";
import { Add } from "@api/department";

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            fomrLayout: {
                labelCol: { span: 2 },
                wrapperCol: { span: 20 },
            }
        }
    }
    onFinish = (values) => {
        if (!values.name) {
            message.error("部门名称不能为空")
            return
        } else if (!values.number || values.number === 0) {
            message.error("人员数量不能为0")
            return
        } else if (!values.content) {
            message.error("描述内容不能为空")
            return
        }
        this.setState({
            loading: true
        })
        Add(values).then(response => {
            this.setState({
                loading: false
            })
            if (response.code === 1) {
                message.success(response.msg)
                this.refs.form.resetFields();
            }
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    };

    render() {
        return (
            <Form onFinish={this.onFinish} initialValues={{ status: true, number: 0 }} {...this.state.fomrLayout} ref='form'>
                <Form.Item label="部门名称" name="name">
                    <Input></Input>
                </Form.Item>
                <Form.Item label="人员数量" name="number">
                    <InputNumber min={0} max={100}></InputNumber>
                </Form.Item>
                <Form.Item label="禁启标志" name="status">
                    <Radio.Group >
                        <Radio value={false}>禁用</Radio>
                        <Radio value={true}>启用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="描述" name="content">
                    <Input></Input>
                </Form.Item>
                <Button loading={this.state.loading} type="primary" htmlType="submit">
                    Submit
                </Button>

            </Form>
        )
    }
}

export default List;