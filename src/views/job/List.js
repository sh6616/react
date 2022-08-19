import React, { Component, Fragment } from "react";
//antd
import { Form, Input, Button, Table } from "antd";
//api
import { GetList } from '@api/department'
class DepartmentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //请求参数
            pageNumber: 1,
            pageSize: 10,
            //表头
            columns: [
                {
                    title: '部门名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '禁启用',
                    dataIndex: 'status',
                    key: 'status',
                },
                {
                    title: '人员数量',
                    dataIndex: 'number',
                    key: 'number',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                }
            ],
            //表数据
            data: []
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData = () => {
        const requestData = {
            value: this.refs.getDepartValue.props.value == undefined ? '' : this.refs.getDepartValue.props.value,
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }
        console.log(requestData)
        GetList(requestData).then(response => {
            response.data.forEach(function (item, index) {
                item.key = index
            });
            this.setState({
                data: response.data
            })
        })
    }
    //搜索
    onFinish = (value) => {
        this.loadData()
    }
    render() {
        const { columns, data } = this.state
        return (
            <Fragment>
                <Form layout="inline" onFinish={this.onFinish}>
                    <Form.Item label="部门名称" name="username">
                        <Input ref='getDepartValue' placeholder="请输入部门名称"></Input>
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
                <Table columns={columns} dataSource={data} bordered>

                </Table>
            </Fragment>
        )
    }
}


export default DepartmentList;










