import React, { Component, Fragment } from "react";
// 
import { Link } from "react-router-dom";
//antd
import { Button, Switch, message } from "antd";
//api
import { Edit, Status } from '@api/department'
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
                                    <Button onClick={() => this.delete(rowData.id)}>删除</Button>
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
                        optionsKey: "status",
                        options: [
                            { 'value': "true", 'label': '开启' },
                            { 'value': "false", 'label': '禁用' }
                        ]
                    }
                ]
            },
        }
    }

    //编辑
    onHandlerEdit = (data) => {
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
        this.setState({ flag: true })
        Status(requestData).then(response => {
            message.success(response.msg);
            this.setState({ id: "" })
            this.setState({ flag: false })
        }).catch(error => {
            this.setState({ id: "" })
            this.setState({ flag: false })
        })
    }
    //批量删除
    onHandlerDeletesT = () => {
        let ids = [];
        let selectedRowKeysData = this.state.selectedRowKeys;
        if (selectedRowKeysData.length === 0) { return false };
        let dataData = this.state.data;
        for (let i = 0; i < selectedRowKeysData.length; i++) {
            ids.push(dataData[selectedRowKeysData[i]].id)
        };
        this.setState({ visible: true, id: ids });
    }

    // 获取子组件实例
    getChildRef = (ref) => {
        this.tableComponent = ref; // 存储子组件
    }
    /** 删除 */
    delete = (id) => {
        this.tableComponent.onHandlerDelete(id)
    }

    render() {

        return (
            <Fragment>
                <TableComponent onRef={this.getChildRef} batchButton={true} config={this.state.tableConfig} />
            </Fragment>
        )
    }
}


export default DepartmentList;










