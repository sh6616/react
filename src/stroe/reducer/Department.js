import { addDepartmentListData } from "../Type";
const stateData = {
    departmentList: {}
}

const departmentReducer = function (state = stateData, action) {
    switch (action.type) {
        case 'SEARCH_DEPARTMENT_LIST': {
            return {
                ...state,
                departmentList: action
            }
        }
        default:
            return state;
    }


}
export default departmentReducer;