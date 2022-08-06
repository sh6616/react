import React, { Component } from "react";
// antd icon
import { MenuFoldOutlined } from "@ant-design/icons";
//css 
import "./aside.scss";

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: props.collapsed
        };
    }
    // 生命周期，监听父级 props 的值变化
    componentWillReceiveProps({ collapsed }){
        this.setState({
            collapsed
        })
    }
    toggleMenu = () => {
        this.props.toggle();
    }
    logout = () => {
        this.props.actions.logout();
        // 路由跳转
        this.props.history.push('/');
    }
    render(){
        const { collapsed } = this.state;
        return (
            <div className={collapsed ? "collapsed-close" : ""}>
                <h1 className="logo"><span>LOGO</span></h1>
                <div className="header-wrap">
                    <span className="col-left collapsed-icon" onClick={this.toggleMenu}><MenuFoldOutlined /></span>
                    <div className="col-right" onClick={this.logout}>
                        <div className="wrap">
                            <span className="pull-right">退出</span>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Header;