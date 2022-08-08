import React, { Component } from "react";
//antd
import { Form, Input, Button, InputNumber, Radio } from 'antd';
// url
// import requestUrl from "@api/requestUrl";
import { Add } from "@api/department";

class List extends Component {
    constructor() {
        super()
        this.state = {
            fomrLayout: {
                labelCol: { span: 2 },
                wrapperCol: { span: 20 },
            }


        }
    }
    onFinish = (values) => {
        // console.log('Success:', values);
        // let value = values
        // value.table = 'department_add'
        Add(values).then(response => {
            console.log(response.data)
        })
    };

    render() {
        return (
            <Form onFinish={this.onFinish} initialValues={{ status: true, number: 0 }} {...this.state.fomrLayout} >
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
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>

            </Form>
        )
    }
}

export default List;