import * as types from "./../_actions/types";

const initialProject = {
    project: null,
    projects: [],
    allprojects: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialProject, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_PROJECT:
            return {
                ...state,
                project: payload,
                loading: false
            };
        case types.GET_PROJECTS:
            return {
                ...state,
                projects: payload,
                loading: false
            };
        case types.GET_ALL_PROJECTS:
            return {
                ...state,
                allprojects: payload,
                loading: false
            };
        case types.ADD_PROJECT:
            return {
                ...state,
                project: payload,
                loading: false
            };
        case types.SET_CURRENT_PROJECT:
            return {
                ...state,
                project: action.payload
            };
        case types.CLEAR_PROJECT:
            return {
                ...state,
                project: null,
                projects: [],
                loading: false
            };

        // case types.FILTER_STAFF:
        //   return {
        //    ...state,
        //     filtered: project.projects.filter(project => {
        //       const regex = new RegExp(`${action.payload}`, "gi");
        //       return (
        //         staff.firstName.match(regex) ||
        //         staff.lastName.match(regex) ||
        //         staff.email.match(regex) ||
        //         staff.mobile.match(regex) ||
        //         staff.username.match(regex)
        //       );
        //     })
        //   };
        case types.CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case types.DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(
                    project => project._id !== action.payload
                ),
                loading: false
            };
        case types.PROJECT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
