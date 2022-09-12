import React, { Component } from "react";
//API
import { requestData } from '@api/common'
//url
import requestUrl from '@api/requestUrl.js'
// antd
import { Form, Input, Button, Select, InputNumber, Radio, message } from "antd";
const { Option } = Select;

class FormCom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            mesPreix: {
                "Input": "请输入",
                "Editor": "请输入",
                "Radio": "请选择",
                "Select": "请选择",
                "SelectComponent": "请选择",
                "Date": "请选择",
                "Upload": "请上传"
            }
        }
    }

    // 校验规则 
    rules = (item) => {

        // state
        const { mesPreix } = this.state;
        let rules = [];
        // 是否必填
        if (item.required) {
            let message = item.message || `${mesPreix[item.type]}${item.label}`; // 请输入xxxxx，请选择xxxxxx
            rules.push({ required: true, message })
        }

        if (item.rules && item.rules.length > 0) {
            rules = rules.concat(item.rules)
        }
        return rules;
    }

    // radio
    radioElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Radio.Group>
                    {
                        item.options && item.options.map(elem => {
                            return <Radio value={elem.value} key={elem.value}>{elem.label}</Radio>
                        })
                    }
                </Radio.Group>
            </Form.Item>
        )
    }
    // input
    inputElem = (item) => {
        const rules = this.rules(item);

        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input style={item.style} placeholder={item.placeholder} />
            </Form.Item>
        )
    }
    // inputNumber
    inputNumberElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <InputNumber min={item.min} max={item.max} />
            </Form.Item>
        )
    }
    // select
    selectElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Select style={item.style} placeholder={item.placeholder}>
                    {
                        item.options && item.options.map(elem => {
                            return <Option value={elem.value} key={elem.value}>{elem.label}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        )
    }

    // 初始化
    initFormItem = () => {
        const { formItem } = this.props;
        // 检测是否存在 formItem
        if (!formItem || (formItem && formItem.length === 0)) { return false; }
        // 循环处理
        const formList = []
        for (let i = 0; i < formItem.length; i++) {
            if (formItem[i].type === "Input") {
                formList.push(this.inputElem(formItem[i]))
            }
            if (formItem[i].type === "Select") {
                formList.push(this.selectElem(formItem[i]))
            }
            if (formItem[i].type === "InputNumber") {
                formList.push(this.inputNumberElem(formItem[i]))
            }
            if (formItem[i].type === "Radio") {
                formList.push(this.radioElem(formItem[i]))
            }
        }
        return formList
    }


    onSubmit = (values) => {
        const data = {
            url: requestUrl[this.props.formConfig.url],
            method: 'post',
            data: values
        }
        this.setState({
            loading: true
        })
        requestData(data).then(response => {
            if (response.code === 1) {
                message.success(response.msg)
            }
            this.setState({
                loading: false
            })
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    };

    render() {
        return (
            <Form onFinish={this.onSubmit} initialValues={{ status: true, number: 0 }} {...this.props.fomrLayout} ref='form'>
                {this.initFormItem()}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        )
    }

}

export default FormCom;