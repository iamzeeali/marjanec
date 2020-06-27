import * as types from "./../_actions/types";

const initialCustomer = {
    customer: null,
    customers: [],
    allcustomers: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialCustomer, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_CUSTOMER:
            return {
                ...state,
                customer: payload,
                loading: false
            };
        case types.GET_CUSTOMERS:
            return {
                ...state,
                customers: payload,
                loading: false
            };
        case types.GET_ALL_CUSTOMERS:
            return {
                ...state,
                allcustomers: payload,
                loading: false
            };
        case types.ADD_CUSTOMER:
            return {
                ...state,
                customer: payload,
                loading: false
            };
        case types.SET_CURRENT_CUSTOMER:
            return {
                ...state,
                customer: action.payload
            };
        case types.CLEAR_CUSTOMER:
            return {
                ...state,
                customer: null,
                customers: [],
                loading: false
            };

        // case types.FILTER_STAFF:
        //   return {
        //    ...state,
        //     filtered: customer.customers.filter(customer => {
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
        case types.DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter(
                    customer => customer._id !== action.payload
                ),
                loading: false
            };
        case types.CUSTOMER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
