import React, { Component } from "react";
// asideMenu
import AsideMenu from "../../../components/asideMneu/Index";

import Router from "../../../router/index"
class Aside extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <AsideMenu  routers= {Router}/>
            // <div>645645</div>
        )
    }
}

export default Aside;