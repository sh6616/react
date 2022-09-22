import React, { Component, Fragment } from "react";
// propTypes
import PropTypes from 'prop-types';

import { TableList } from '@api/common'
//url
import requestUrl from '@api/requestUrl.js'

//antd
import { message, Modal } from "antd";

//api
import { Delete } from '@api/department'
//ui容器
import TableBasis from "@c/tableData/Table";
import FormSearch from "@c/formSearch/Index";

class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //删除id
            id: '',
            //请求参数
            pageNumber: 1,
            pageSize: 10,
            searchData: '',
            total: 0,
            //表数据
            data: [],
            //表格加载
            loadingTable: false,
            visible: false,
            //复选框
            selectedRowKeys: []
        }
    }

    componentDidMount() {
        this.loadDada();
        // 返回子组件实例
        this.props.onRef(this);  // 子组件调用父组件方法，并把子组件实例传回给父组件
    }

    loadDada = (value) => {
        const requestData = {
            url: requestUrl[this.props.config.url],
            method: this.props.config.method,
            data: {
                value: this.state.searchData === undefined ? '' : this.state.searchData,
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize,
            }
        }
        this.setState({ loadingTable: true })
        TableList(requestData).then(response => {
            response.data.forEach(function (item, index) {
                item.key = index
            });
            this.setState({ data: [] })
            this.setState({
                data: response.data,
                total: response.total
            })
            this.setState({ loadingTable: false })
        }).catch(error => {
            this.setState({ loadingTable: false })
        })

    }

    //复选框
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys: selectedRowKeys });
    };
    //当前页码
    onChangeCurrentPage = (value) => {
        this.setState({
            pageNumber: value
        }, () => {
            this.loadDada();
        });
    }
    //下拉页码
    onChangeSizePage = (value, page) => {
        this.setState({
            pageNumber: 1,
            pageSize: page
        }, () => {
            this.loadDada();
        });
    }
    //模态框  删除  确认按钮
    handleOk = e => {
        let requestData = { id: this.state.id }
        Delete(requestData).then(response => {
            message.success(response.msg);
            this.setState({
                visible: false,
            });
            this.loadDada()
        })
    }
    //模态框  删除  取消按钮
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    //删除
    onHandlerDelete = (id) => {
        if (!id) { return false };
        this.setState({ visible: true, id });
    }
    //批量删除
    onHandlerDeletesT = () => {
        let ids = [];
        let selectedRowKeysData = this.state.selectedRowKeys;
        if (selectedRowKeysData.length === 0) { return false };
        let dataData = this.state.data;
        for (let i = 0; i < selectedRowKeysData.length; i++) {
            ids.push(dataData[selectedRowKeysData[i]].id)
        }
        this.setState({ visible: true, id: ids });
    }
    search = (searchData) => {
        this.setState({
            pageNumber: 1,
            pageSize: 10,
            searchData: searchData.name
        }, () => {
            this.loadDada();
        })
    }

    render() {
        const { data } = this.state
        const { checkbox, thead, formItem, } = this.props.config
        //复选框
        const rowSelection = {
            onChange: this.onSelectChange,
        };
        return (
            <Fragment>
                {/* 搜索 */}
                <FormSearch formItem={formItem} search={this.search} />
                <div className="table-wrap">
                    <TableBasis
                        columns={thead}
                        dataSource={data}
                        total={this.state.total}
                        changePageCurrent={this.onChangeCurrentPage}
                        changePageSize={this.onChangeSizePage}
                        batchButton={true}
                        handlerDeletesT={this.onHandlerDeletesT}
                        rowSelection={checkbox ? rowSelection : null}
                    ></TableBasis>
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
// 校验数据类型
TableComponent.propTypes = {
    config: PropTypes.object
}
//默认值
// 默认
TableComponent.defaultProps = {
    batchButton: false
}
export default TableComponent;