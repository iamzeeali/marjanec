import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import error from './errorsReducer'
import expense from './expenseReducer'
import project from './projectReducer'
import investment from './investmentReducer'
import customerpay from './customerPayReducer'
import customer from './customerReducer'
import estimate from './estimateReducer'



export default combineReducers({
    auth,
    alert,
    error,
    expense,
    project,
    investment,
    customerpay,
    customer,
    estimate,

})