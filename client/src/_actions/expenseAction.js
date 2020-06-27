import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current expense
export const getCurrentExpense = id => async dispatch => {
    try {
        const res = await axios.get(`/api/expense/${id}`);
        console.log(res.data);

        dispatch({
            type: types.GET_EXPENSE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: types.EXPENSE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get User Expenses
export const getExpenses = () => async dispatch => {
    try {
        const res = await axios.get("/api/expense");
        console.log(res.data.data);
        dispatch({
            type: types.GET_EXPENSES,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.EXPENSE_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};



//Get Users Based Expenses
export const userExpense = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/expense/getAll?user[0]._id=${id}`);
        console.log(res.data);
        dispatch({
            type: types.GET_USERS_EXPENSES,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);

    }
};
//Get Users Based Sum Expenses
export const userTotalExpense = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/expense/Usertotal/${id}`);
        console.log(res.data);
        dispatch({
            type: types.GET_USERS_SUM_EXPENSES,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);

    }
};


//Get Mothly Expenses
export const monthlyExpense = (year) => async dispatch => {
    try {
        const res = await axios.get(`/api/expense/monthTotal/${year}`);
        console.log(res.data);
        dispatch({
            type: types.GET_MONTHLY_EXPENSES,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);

    }
};



//Get Mothly Usrs Expenses
export const UsermonthlyExpense = (year, id) => async dispatch => {
    try {
        const res = await axios.get(`/api/expense/usermonthTotal/${year}/${id}`);
        console.log(res.data);
        dispatch({
            type: types.GET_USER_MONTHLY_EXPENSES,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);

    }
};

//Get Sum of Over All EXpenses
export const getOverAllSumExp = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/expense/getOverAllSum`);  // filter from ID 
        console.log(res.data.data);
        dispatch({
            type: types.OVER_ALL_SUM_EXP,
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


//Get Sum Of Project Wise Expenses
export const getTotalExpenses = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/expense/total/${id}`);  // filter from ID 
        //console.log(res.data.data);
        dispatch({
            type: types.GET_TOTALWISE_EXPENSES,
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


////Get Project Wise Expenses Details

export const getProjectExpenses = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/expense/filter/${id}`);  // filter from ID 
        //console.log(res.data.data);
        dispatch({
            type: types.GET_PROJECTWISE_EXPENSES,
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

//Get All Expenses
export const getAllExpenses = () => async dispatch => {
    try {
        const res = await axios.get("/api/expense/getAll");
        //console.log(res.data.data);
        dispatch({
            type: types.GET_ALL_EXPENSES,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.EXPENSE_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

// Add expense
export const addExpense = (formData, history) => async dispatch => {
    try {
        const res = await axios.post("/api/expense", formData);
        dispatch({
            type: types.ADD_EXPENSE,
            payload: res.data
        });
        history.push("/admin/view-expense");

        dispatch(setAlert("Expense Added!", "success"));
    } catch (err) {
        console.log(err.response.data)
        const errors = err.response.data.error;
        console.log(errors);

        if (err.response.status === 400) {
            dispatch(setAlert(`${err.response.data.msg}`, "danger"));
        }
        else if (err.response.status === 500) {
            dispatch(setAlert(`File Too Large or Invalid File Type`, "danger"));
        } else {

            dispatch({
                type: types.INVESTMENT_ERROR,
                payload: { msg: errors, status: err.response.status }
            });
        }
    }
};

// Edit expense
export const editExpense = (formData, history, id) => async dispatch => {
    try {
        const res = await axios.patch(`/api/expense/${id}`, formData);

        dispatch({
            type: types.GET_EXPENSE,
            payload: res.data
        });

        history.push("/admin/view-expense");

        dispatch(setAlert("Expense Updated", "success"));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        if (err.response.status === 400) {
            dispatch(setAlert(`${err.response.data.msg}`, "danger"));
        }
        else if (err.response.status === 500) {
            dispatch(setAlert(`File Too Large or Invalid File Type`, "danger"));
        }
        dispatch({
            type: types.EXPENSE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete expense
export const deleteExpense = id => async dispatch => {
    if (window.confirm("Are you sure?")) {
        try {
            await axios.delete(`/api/expense/${id}`);
            dispatch({
                type: types.DELETE_EXPENSE,
                payload: id
            });
            dispatch(setAlert("Expense Deleted!", "danger"));
        } catch (err) {
            dispatch({
                type: types.EXPENSE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};

//Set Current expense
export const setCurrentExpense = expense => async dispatch => {
    dispatch({
        type: types.SET_CURRENT_EXPENSE,
        payload: expense
    });
};

// Clear expense
export const clearExpense = () => async dispatch => {
    dispatch({ type: types.CLEAR_EXPENSE });
};

//Filter expense
export const filterstate = text => async dispatch => {
    dispatch({ type: types.FILTER_EXPENSE, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
    dispatch({ type: types.CLEAR_FILTER });
};
