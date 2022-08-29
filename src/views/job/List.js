import React, { Component, Fragment } from "react";
// 
import { Link } from "react-router-dom";
//antd
import { Form, Input, Button,  Switch, message, Modal } from "antd";
//api
import { GetList, Delete, Edit, Status } from '@api/department'
// table 组件
import TableComponent from "@c/tableData/Index";

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
            //禁启用
            flag: false,
            //表格加载
            loadingTable: false,
            visible: false,
            //表头
            columns: [
                {
                    title: '部门名称',
                    dataIndex: 'name',
                    key: 'name',
                    align: 'center',
                    editable: true,
                },
                {
                    title: '禁启用',
                    dataIndex: 'status',
                    key: 'status',
                    align: 'center',
                    render: (res, rowData) => {
                        return <Switch onChange={() => this.onHandlerSwitch(rowData)} loading={rowData.id === this.state.id} checkedChildren="开启" unCheckedChildren="禁用" defaultChecked={rowData.status === "1" ? true : false} />
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
                    render: (res, rowData) => {
                        return (
                            <div className="inline-button">
                                <Button type="primary" >
                                    <Link to={{ pathname: '/index/job/add', state: { id: rowData.id } }}>编辑</Link>
                                </Button>
                                <Button onClick={() => this.onHandlerDelete(rowData.id)}>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            //表数据
            data: [],

             // 表头
             tableConfig: {
                url: "departmentList",
                method: 'post',
                checkbox: true,
                batchButton: true,
                thead: [
                    {
                        title: '部门名称',
                        dataIndex: 'name',
                        key: 'name',
                        align: 'center',
                        editable: true,
                    },
                    {
                        title: '禁启用',
                        dataIndex: 'status',
                        key: 'status',
                        align: 'center',
                        render: (res, rowData) => {
                            return <Switch onChange={() => this.onHandlerSwitch(rowData)} loading={rowData.id === this.state.id} checkedChildren="开启" unCheckedChildren="禁用" defaultChecked={rowData.status === "1" ? true : false} />
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
                        render: (res, rowData) => {
                            return (
                                <div className="inline-button">
                                    <Button type="primary" >
                                        <Link to={{ pathname: '/index/job/add', state: { id: rowData.id } }}>编辑</Link>
                                    </Button>
                                    <Button onClick={() => this.onHandlerDelete(rowData.id)}>删除</Button>
                                </div>
                            )
                        }
                    }
                ],
                formItem: [
                    {
                        type: "Input",
                        label: "部门名称",
                        name: "name",
                        placeholder: "请输入部门名称"
                    },
                    {
                        type: "Select",
                        label: "禁启用",
                        name: "status",
                        placeholder: "请选择",
                        style: { width: "100px" },
                        optionsKey: "status"
                    },
                ]
            },
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
        this.setState({ loadingTable: true })
        GetList(requestData).then(response => {
            response.data.forEach(function (item, index) {
                item.key = index
            });
            this.setState({
                data: response.data
            })
            this.setState({ loadingTable: false })
        }).catch(error => {
            this.setState({ loadingTable: false })
        })
    }
    //搜索
    onFinish = (value) => {
        if (this.state.loadingTable) { return false }
        this.loadData()
    }
    //模态框  删除  确认按钮
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
    //模态框  删除  取消按钮
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    //编辑
    onHandlerEdit = (data) => {

        // let requestData = 
        Edit(data).then(response => {
            if (response.data.code === 1) {
                message.success(response.data.msg)
            }
        })

    }
    /** 禁启用 */
    onHandlerSwitch(data) {
        if (this.state.flag) { return false; }
        const requestData = {
            id: data.id,
            status: data.status === "1" ? false : true
        }
        // 第一种做法，用组件本身异步
        this.setState({ id: data.id, })
        // 第二种做法，自己做的开关
        // this.setState({flag: true}) 
        Status(requestData).then(response => {
            message.info(response.data.msg);
            this.setState({ id: "" })
            // this.setState({flag: false}) 
        }).catch(error => {
            this.setState({ id: "" })
            // this.setState({flag: false}) 
        })
    }
    //删除
    onHandlerDelete = (id) => {
        if (!id) { return false }
        this.setState({ visible: true, id })
    }
    //批量删除
    onHandlerDeletesT = () => {
        let ids = []
        let selectedRowKeysData = this.state.selectedRowKeys;
        if (selectedRowKeysData.length === 0) { return false }
        let dataData = this.state.data;
        for (let i = 0; i < selectedRowKeysData.length; i++) {
            ids.push(dataData[selectedRowKeysData[i]].id)
        }
        this.setState({ visible: true, id: ids })
    }

    render() {

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
                    <TableComponent batchButton={true} config={this.state.tableConfig} />
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










