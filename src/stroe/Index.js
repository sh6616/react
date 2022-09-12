import { createStore, combineReducers } from "redux";

import department from "./reducer/Department";
import job from "./reducer/Job";
import config from "./reducer/Config";

//全局配置
// Reducer


const allReducer = {
  config:config,
  department: department,
  job:job
}

const rootReducer = combineReducers(allReducer)



const store = createStore(rootReducer);

export default store;
