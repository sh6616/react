import React, { Component } from "react";
//antd
import { Table } from "antd";
//api
import { GetList} from '@api/department'

class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
        this.loadData();
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

    render() {
        const { columns } = this.props.columns
        return (
            <Table columns={columns}></Table>
        )
    }
}

export default TableComponent;