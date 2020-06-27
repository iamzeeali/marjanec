import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    GET_USERS,
    EMAIL_SENT,
} from "../_actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    role: null,
    firstName: null,
    lastName: null,
    username: null,
    loading: true,
    user: {},
    users: [],
    emailsent: ''
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                _id: payload.data._id,
                user: payload.data,
                role: payload.data.role,
                firstName: payload.data.firstName,
                lastName: payload.data.lastName,
                username: payload.data.username,


            };
        case GET_USERS:
            return {
                ...state,
                users: payload,
                loading: false
            };
        case EMAIL_SENT:
            return {
                ...state,
                emailsent: payload,
                loading: false
            };

        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };

        default:
            return state;
    }
}
