import React, { Component, Fragment } from "react";
//antd
import { Form, Input, Button, Table, Switch, message, Modal } from "antd";
//api
import { GetList, Delete } from '@api/department'
class DepartmentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //请求参数
            pageNumber: 1,
            pageSize: 10,
            //选中table中的行
            selectedRowKeys: [],
            //模态框
            id: '',
            visible: false,
            //表头
            columns: [
                {
                    title: '部门名称',
                    dataIndex: 'name',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '禁启用',
                    dataIndex: 'status',
                    key: 'status',
                    align: 'center',
                    render: (res, rowdata) => {
                        return <Switch checkedChildren="开启" unCheckedChildren="禁用" defaultChecked={rowdata.status === "1" ? true : false} />
                    }
                },
                {
                    title: '人员数量',
                    dataIndex: 'number',
                    key: 'number',
                    align: 'center'
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    align: 'center',
                    render: (res, rowdata) => {
                        return (
                            <div className="inline-button">
                                <Button type="primary">编辑</Button>
                                <Button onClick={() => this.onHandlerDelete(rowdata.id)}>删除</Button>
                            </div>
                        )
                    }
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
            value: this.refs.getDepartValue.props.value === undefined ? '' : this.refs.getDepartValue.props.value,
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }
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
    //模态框
    handleOk = e => {
        let requestData = { id: this.state.id }
        Delete(requestData).then(response => {
            message.success(response.msg)
            this.setState({
                visible: false,
            });
            this.loadData()
        })
    }
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    //删除
    onHandlerDelete = (id) => {
        this.setState({ visible: true, id })
    }
    //复选框
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys: selectedRowKeys });
    };
    render() {
        const { columns, data } = this.state
        //复选框
        const rowSelection = {
            onChange: this.onSelectChange,
        };
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
                <div className="table-wrap">
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered></Table>
                </div>
                <Modal
                    title="Tip"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>确定要删除么？</p>
                </Modal>
            </Fragment>
        )
    }
}


export default DepartmentList;










