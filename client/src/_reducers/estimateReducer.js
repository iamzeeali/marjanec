import * as types from "./../_actions/types";

const initialEstimate = {
    estimate: null,
    estimates: [],
    allestimates: [],
    sendingLoader: false,
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialEstimate, action) {
    const { type, payload, sendingPayload } = action;

    switch (type) {
        case types.GET_ESTIMATE:
            return {
                ...state,
                estimate: payload,
                loading: false
            };
        case types.GET_ESTIMATES:
            return {
                ...state,
                estimates: payload,
                loading: false
            };
        case types.GET_ALL_ESTIMATES:
            return {
                ...state,
                allestimates: payload,
                loading: false
            };
        case types.ADD_ESTIMATE:
            return {
                ...state,
                estimate: payload,
                sendingLoader: sendingPayload

            };
        case types.SET_CURRENT_ESTIMATE:
            return {
                ...state,
                estimate: action.payload
            };
        case types.CLEAR_ESTIMATE:
            return {
                ...state,
                estimate: null,
                estimates: [],
                loading: false,
                sendingLoader: false,

            };

        // case types.FILTER_STAFF:
        //   return {
        //    ...state,
        //     filtered: estimate.estimates.filter(estimate => {
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
        case types.DELETE_ESTIMATE:
            return {
                ...state,
                estimates: state.estimates.filter(
                    estimate => estimate._id !== action.payload
                ),
                loading: false
            };
        case types.ESTIMATE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
