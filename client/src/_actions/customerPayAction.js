import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current customerPay
export const getCurrentCustomerPay = id => async dispatch => {
    try {
        const res = await axios.get(`/api/customerpayment/${id}`);
        console.log(res.data);

        dispatch({
            type: types.GET_CUSTOMER_PAY,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: types.CUSTOMER_PAY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get Auth User CustomerPays
export const getCustomerPays = () => async dispatch => {
    try {
        const res = await axios.get("/api/customerpayment");
        console.log(res.data.data);
        dispatch({
            type: types.GET_CUSTOMER_PAYS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.CUSTOMER_PAY_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

//Get All CustomerPays
export const getAllCustomerPays = () => async dispatch => {
    try {
        const res = await axios.get("/api/customerpayment/getAll");
        console.log(res.data.data);
        dispatch({
            type: types.GET_ALL_CUSTOMER_PAYS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.CUSTOMER_PAY_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};


//Get Customer Based payment
export const CustomerBasedPay = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/customerpayment/getAll?customer[0]._id=${id}`);
        console.log(res.data);
        dispatch({
            type: types.CUSTOMER_BASED_PAY,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);

    }
};
//Get Customer Based Total Sum of Payment
export const CustomerTotalPayment = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/customerpayment/custTotal/${id}`);
        console.log(res.data);
        dispatch({
            type: types.CUST_SUM_PAYMENT,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);

    }
};


//Get Mothly CustomPay
export const monthlyCustPay = (year) => async dispatch => {
    try {
        const res = await axios.get(`/api/customerpayment/monthTotal/${year}`);
        console.log(res.data);
        dispatch({
            type: types.GET_MONTHLY_CUSTPAY,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);

    }
};

//Get Mothly User CustomPay
export const UsermonthlyCustPay = (year, id) => async dispatch => {
    try {
        const res = await axios.get(`/api/customerpayment/usermonthTotal/${year}/${id}`);
        dispatch({
            type: types.GET_USER_MONTHLY_CUSTPAY,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);

    }
};



// Add customerPay
export const addCustomerPay = (formData, history) => async dispatch => {
    try {
        const res = await axios.post("/api/customerpayment", formData);
        dispatch({
            type: types.ADD_CUSTOMER_PAY,
            payload: res.data
        });
        history.push("/admin/view-customerPay");

        dispatch(setAlert("CustomerPay Added!", "success"));
    } catch (err) {
        const errors = err.response.data.error;
        console.log(errors);

        if (errors.code === 11000) {
            dispatch(setAlert("CustomerPay already exists!", "danger"));
        }

        dispatch({
            type: types.CUSTOMER_PAY_ERROR,
            payload: { msg: errors, status: err.response.status }
        });
    }
};


//Get Sum of Over All Customer Payment
export const getOverAllSumCustPay = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/customerpayment/getOverAllSum`);  // filter from ID 
        console.log(res.data.data);
        dispatch({
            type: types.OVER_ALL_SUM_CUSTPAY,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.INVESTMENT_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

//Get Sum of Project Wise CustPay
export const getTotalCustPay = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/customerpayment/total/${id}`);  // filter from ID 
        //console.log(res.data.data);
        dispatch({
            type: types.GET_TOTALWISE_CUSTPAY,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.INVESTMENT_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

//Get Project Wise Customer Payment Details
export const getProjectCustPay = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/customerpayment/filter/${id}`);  // filter from ID 
        //console.log(res.data.data);
        dispatch({
            type: types.GET_PROJECTWISE_CUSTPAY,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.INVESTMENT_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};
// Edit customerPay
export const editCustomerPay = (formData, history, id) => async dispatch => {
    try {
        const res = await axios.patch(`/api/customerpayment/${id}`, formData);

        dispatch({
            type: types.GET_CUSTOMER_PAY,
            payload: res.data
        });

        history.push("/admin/view-customerPay");

        dispatch(setAlert("CustomerPay Updated", "success"));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: types.CUSTOMER_PAY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete customerPay
export const deleteCustomerPay = id => async dispatch => {
    if (window.confirm("Are you sure?")) {
        try {
            await axios.delete(`/api/customerpayment/${id}`);
            dispatch({
                type: types.DELETE_CUSTOMER_PAY,
                payload: id
            });
            dispatch(setAlert("CustomerPay Deleted!", "danger"));
        } catch (err) {
            dispatch({
                type: types.CUSTOMER_PAY_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};

//Set Current customerPay
export const setCurrentCustomerPay = customerPay => async dispatch => {
    dispatch({
        type: types.SET_CURRENT_CUSTOMER_PAY,
        payload: customerPay
    });
};

// Clear customerPay
export const clearCustomerPay = () => async dispatch => {
    dispatch({ type: types.CLEAR_CUSTOMER_PAY });
};

//Filter customerPay
export const filterstate = text => async dispatch => {
    dispatch({ type: types.FILTER_CUSTOMER_PAY, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
    dispatch({ type: types.CLEAR_FILTER });
};
