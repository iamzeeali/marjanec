import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current project
export const getCurrentProject = id => async dispatch => {
    try {
        const res = await axios.get(`/api/project/${id}`);
        console.log(res.data);

        dispatch({
            type: types.GET_PROJECT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: types.PROJECT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get User Projects
export const getProjects = () => async dispatch => {
    try {
        const res = await axios.get("/api/project");
        //console.log(res.data.data);
        dispatch({
            type: types.GET_PROJECTS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.PROJECT_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};


//Get All Projects
export const getAllProjects = () => async dispatch => {
    try {
        const res = await axios.get("/api/project/getAll");
        //console.log(res.data.data);
        dispatch({
            type: types.GET_ALL_PROJECTS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.PROJECT_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

// Add project
export const addProject = (formData, history) => async dispatch => {

    try {
        const res = await axios.post("/api/project", formData);
        dispatch({
            type: types.ADD_PROJECT,
            payload: res.data
        });

        history.push("/admin/viewproject");

        dispatch(setAlert("Project Added!", "success"));
    } catch (err) {
        const errors = err.response.data.error;
        console.log(errors);

        if (errors.code === 11000) {
            dispatch(setAlert("Project already exists!", "danger"));
        }

        dispatch({
            type: types.PROJECT_ERROR,
            payload: { msg: errors, status: err.response.status }
        });
    }
};

// Edit project
export const editProject = (formData, history, id) => async dispatch => {
    try {
        const res = await axios.patch(`/api/project/${id}`, formData);

        dispatch({
            type: types.GET_PROJECT,
            payload: res.data
        });

        history.push("/admin/viewproject");

        dispatch(setAlert("Project Updated", "success"));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: types.PROJECT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete project
export const deleteProject = id => async dispatch => {
    if (window.confirm("Are you sure?")) {
        try {
            await axios.delete(`/api/project/${id}`);
            dispatch({
                type: types.DELETE_PROJECT,
                payload: id
            });
            dispatch(setAlert("Project Deleted!", "danger"));
        } catch (err) {
            dispatch({
                type: types.PROJECT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};

//Set Current project
export const setCurrentProject = project => async dispatch => {
    dispatch({
        type: types.SET_CURRENT_PROJECT,
        payload: project
    });
};

// Clear project
export const clearProject = () => async dispatch => {
    dispatch({ type: types.CLEAR_PROJECT });
};

//Filter project
export const filterstate = text => async dispatch => {
    dispatch({ type: types.FILTER_PROJECT, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
    dispatch({ type: types.CLEAR_FILTER });
};
