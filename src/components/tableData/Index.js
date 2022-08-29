import React, { Component, Fragment } from "react";
// propTypes
import PropTypes from 'prop-types';

import { TableList } from '@api/common'
//url
import requestUrl from '@api/requestUrl.js'

import TableBasis from "@c/tableData/Table";

class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //请求参数
            pageNumber: 1,
            pageSize: 10,
            total: 0,
            //表数据
            data: [],
            //表格加载
            loadingTable: false,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {

        // const requestData = {
        //     value: this.refs.getDepartValue.props.value === undefined ? '' : this.refs.getDepartValue.props.value,
        //     pageNumber: this.state.pageNumber,
        //     pageSize: this.state.pageSize
        // }
        const requestData = {
            url: requestUrl[this.props.config.url],
            method: this.props.config.method,
            data: {
                value: '',
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize,
            }
        }
        this.setState({ loadingTable: true })
        TableList(requestData).then(response => {
            response.data.forEach(function (item, index) {
                item.key = index
            });
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
        console.log(value)
        this.setState({
            pageNumber: value
        }, () => {
            this.loadData();
        });
    }
    //下拉页码
    onChangeSizePage = (value, page) => {
        // console.log(page)
        this.setState({
            pageNumber: 1,
            pageSize: page
        }, () => {
            console.log(this.state.pageNumber)
            this.loadData();
        });
    }
    //批量删除
    onHandlerDeletesT = () => {
        // let ids = []
        // let selectedRowKeysData = this.state.selectedRowKeys;
        // if (selectedRowKeysData.length === 0) { return false }
        // let dataData = this.state.data;
        // for (let i = 0; i < selectedRowKeysData.length; i++) {
        //     ids.push(dataData[selectedRowKeysData[i]].id)
        // }
        // this.setState({ visible: true, id: ids })
    }
    render() {
        const { loadingTable, data } = this.state
        const { checkbox, thead, batchButton } = this.props.config
        //复选框
        const rowSelection = {
            onChange: this.onSelectChange,
        };
        return (
            <Fragment>
                <TableBasis
                    columns={thead}
                    dataSource={data}
                    total={this.state.total}
                    changePageCurrent={this.onChangeCurrentPage}
                    changePageSize={this.onChangeSizePage}
                    batchButton = {true}
                    handlerDeletesT = {this.onHandlerDeletesT}
                    rowSelection={checkbox ? rowSelection : null}
                ></TableBasis>
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