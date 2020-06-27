import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current estimate
export const getCurrentEstimate = id => async dispatch => {
    try {
        const res = await axios.get(`/api/estimate/${id}`);
        console.log(res.data);

        dispatch({
            type: types.GET_ESTIMATE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: types.ESTIMATE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get User Estimates
export const getEstimates = () => async dispatch => {
    try {
        const res = await axios.get("/api/estimate");
        console.log(res.data.data);
        dispatch({
            type: types.GET_ESTIMATES,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.ESTIMATE_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

//Get All Estimates
export const getAllEstimates = () => async dispatch => {
    try {
        const res = await axios.get("/api/estimate/getAll");
        console.log(res.data.data);
        dispatch({
            type: types.GET_ALL_ESTIMATES,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.ESTIMATE_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

// Add estimate
export const addEstimate = (formData, history) => async dispatch => {
    console.log(formData);

    try {

        dispatch({
            type: types.ADD_ESTIMATE,
            sendingPayload: true
        });
        const res = await axios.post("/api/estimate", formData);
        dispatch({
            type: types.ADD_ESTIMATE,
            payload: res.data,
            sendingPayload: false

        });

        dispatch(setAlert("Estimate Added!", "success"));
        history.push("/admin/view-estimate");

    } catch (err) {
        // const errors = err.response.data.errors;

        if (err) {
            dispatch(setAlert("Something went wrong, try again", "danger"));
        }

        dispatch({
            type: types.ESTIMATE_ERROR
        });
    }
};

// Edit estimate
export const editEstimate = (formData, history, id) => async dispatch => {
    try {
        const res = await axios.patch(`/api/estimate/${id}`, formData);

        dispatch({
            type: types.GET_ESTIMATE,
            payload: res.data
        });

        history.push("/admin/view-estimate");

        dispatch(setAlert("Estimate Updated", "success"));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: types.ESTIMATE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete estimate
export const deleteEstimate = id => async dispatch => {
    if (window.confirm("Are you sure?")) {
        try {
            await axios.delete(`/api/estimate/${id}`);
            dispatch({
                type: types.DELETE_ESTIMATE,
                payload: id
            });
            dispatch(setAlert("Estimate Deleted!", "danger"));
        } catch (err) {
            dispatch({
                type: types.ESTIMATE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};

//Set Current estimate
export const setCurrentEstimate = estimate => async dispatch => {
    dispatch({
        type: types.SET_CURRENT_ESTIMATE,
        payload: estimate
    });
};

// Clear estimate
export const clearEstimate = () => async dispatch => {
    dispatch({ type: types.CLEAR_ESTIMATE });
};

//Filter estimate
export const filterstate = text => async dispatch => {
    dispatch({ type: types.FILTER_ESTIMATE, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
    dispatch({ type: types.CLEAR_FILTER });
};
