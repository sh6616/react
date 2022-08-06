import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// 引用组件
import Login from './views/login/index';
import Index from './views/index/Index';
// 私有组件方法
import PrivateRouter from "./components/privateRouter/Index";





class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact render={() => <Login />} path='/'></Route>
          <PrivateRouter component={Index}  path='/index'></PrivateRouter>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
