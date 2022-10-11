import React, { Component, Fragment } from "react";
// propTypes
import PropTypes from 'prop-types';
//antd
import { Table, Row, Col, Pagination, Button } from "antd";
//connect
import { connect } from "react-redux"

class TableBasis extends Component {
    render() {
        const { columns, dataSource, total, changePageCurrent, changePageSize, batchButton, handlerDeletesT, rowSelection } = this.props
        return (
            <Fragment>
                <Table pagination={false} columns={columns} rowSelection={rowSelection} dataSource={this.props.list} bordered></Table>
                <Row>
                    <Col span={8}>
                        {batchButton && <Button onClick={handlerDeletesT}>批量删除</Button>}
                    </Col>
                    <Col span={16}>
                        <Pagination
                            defaultCurrent={1}
                            onChange={changePageCurrent}
                            onShowSizeChange={changePageSize}
                            className="pull-right"
                            total={total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `Total  ${total} items`}
                        ></Pagination>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
// 校验数据类型
TableBasis.propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    // total: PropTypes.number,
    changePageCurrent: PropTypes.func,
    changePageSize: PropTypes.func,
    batchButton: PropTypes.bool,
    rowSelection: PropTypes.object,
    rowkey: PropTypes.string
}
// 默认
TableBasis.defaultProps = {
    column: [],
    dataSource: [],
    // total: 0,
    batchButton: true,
    rowkey: "id"
}

//把store中的数据映射到这个组件映射到这个组件变成props
const mapStateToProps = (state) => {
    console.log('777')
    console.log(state.department.departmentList.payload)
    console.log(state.department.departmentList.payload == undefined)

    if (state.department.departmentList.payload == undefined) {
        return {
            list: ''
        }
    } else {
        let data = state.department.departmentList.payload.data
        for (let i = 0; i < data.length; i++) {
            data[i]['key'] = data[i]['id']
        }



        return {
            list: data
        }
    }


}

const mapDispatchToProps = (dispatch) => {
    return {
        search: (params) => {
            dispatch({
                type: "aaaa",
                payload: {}
            })
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableBasis);
