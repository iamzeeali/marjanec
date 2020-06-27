import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current customer
export const getCurrentCustomer = id => async dispatch => {
    try {
        const res = await axios.get(`/api/customer/${id}`);
        console.log(res.data);

        dispatch({
            type: types.GET_CUSTOMER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: types.CUSTOMER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get Auth User Customers
export const getCustomers = () => async dispatch => {
    try {
        const res = await axios.get("/api/customer");
        //console.log(res.data.data);
        dispatch({
            type: types.GET_CUSTOMERS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.CUSTOMER_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};


//Get All Customers
export const getAllCustomers = () => async dispatch => {
    try {
        const res = await axios.get("/api/customer/getAll");
        console.log(res.data.data);
        dispatch({
            type: types.GET_ALL_CUSTOMERS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.CUSTOMER_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

// Add customer
export const addCustomer = (formData, history) => async dispatch => {

    try {
        const res = await axios.post("/api/customer", formData);
        dispatch({
            type: types.ADD_CUSTOMER,
            payload: res.data
        });

        history.push("/admin/viewcustomer");

        dispatch(setAlert("Customer Added!", "success"));
    } catch (err) {
        const errors = err.response.data.error;
        console.log(errors);

        if (errors.code === 11000) {
            dispatch(setAlert("Customer already exists!", "danger"));
        }

        if (err.response.status === 400) {
            dispatch(setAlert(`${err.response.data.msg}`, "danger"));
        }
        else if (err.response.status === 500) {
            dispatch(setAlert(`File Too Large or Invalid File Type`, "danger"));
        }

        dispatch({
            type: types.CUSTOMER_ERROR,
            payload: { msg: errors, status: err.response.status }
        });
    }
};

// Edit customer
export const editCustomer = (formData, history, id) => async dispatch => {
    try {
        const res = await axios.patch(`/api/customer/${id}`, formData);

        dispatch({
            type: types.GET_CUSTOMER,
            payload: res.data
        });

        history.push("/admin/viewcustomer");

        dispatch(setAlert("Customer Updated", "success"));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: types.CUSTOMER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete customer
export const deleteCustomer = id => async dispatch => {
    if (window.confirm("Are you sure?")) {
        try {
            await axios.delete(`/api/customer/${id}`);
            dispatch({
                type: types.DELETE_CUSTOMER,
                payload: id
            });
            dispatch(setAlert("Customer Deleted!", "danger"));
        } catch (err) {
            dispatch({
                type: types.CUSTOMER_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};

//Set Current customer
export const setCurrentCustomer = customer => async dispatch => {
    dispatch({
        type: types.SET_CURRENT_CUSTOMER,
        payload: customer
    });
};

// Clear customer
export const clearCustomer = () => async dispatch => {
    dispatch({ type: types.CLEAR_CUSTOMER });
};

//Filter customer
export const filterstate = text => async dispatch => {
    dispatch({ type: types.FILTER_CUSTOMER, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
    dispatch({ type: types.CLEAR_FILTER });
};
