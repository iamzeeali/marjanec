import * as types from "./../_actions/types";

const initialExpense = {
    expense: null,
    expenses: [],
    allexpenses: [],

    //---Total Sum---
    projectwiseExpense: [],
    UserName: '',
    totalExpenses: [],
    overAllExpenses: [],
    usersExpenses: [],
    usersSumExp: [],

    //--month---
    monthlyExpenses: [],
    usermonthlyExpenses: [],
    year: [],
    month: [],
    expenDoc: [],
    username2: [],

    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialExpense, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_EXPENSE:
            return {
                ...state,
                expense: payload,
                loading: false
            };
        case types.GET_EXPENSES:
            return {
                ...state,
                expenses: payload,
                loading: false
            };
        case types.GET_ALL_EXPENSES:
            return {
                ...state,
                allexpenses: payload,
                loading: false
            };
        case types.OVER_ALL_SUM_EXP:
            return {
                ...state,
                overAllExpenses: payload

            }
        case types.GET_USERS_EXPENSES:
            return {
                ...state,
                usersExpenses: payload,
                UserName: payload[0].user.firstName,
                loading: false
            };

        case types.GET_MONTHLY_EXPENSES:
            return {
                ...state,
                monthlyExpenses: payload,
                year: payload.map(y => (y._id.year)),
                month: payload.map(m => (m._id.month)),
                expenDoc: payload.map(doc => (doc.expense_docs)),
                loading: false
            };
        case types.GET_USER_MONTHLY_EXPENSES:
            return {
                ...state,
                usermonthlyExpenses: payload,
                username2: payload.map(doc => (doc.expense_docs[0].username)),
                loading: false
            };

        case types.GET_USERS_SUM_EXPENSES:
            return {
                ...state,
                usersSumExp: payload,
                loading: false
            };
        case types.GET_PROJECTWISE_EXPENSES:
            return {
                ...state,
                projectwiseExpense: payload,
                loading: false
            };
        case types.GET_TOTALWISE_EXPENSES:
            return {
                ...state,
                totalExpenses: payload,
                loading: false
            };
        case types.ADD_EXPENSE:
            return {
                ...state,
                expense: payload,
                loading: false
            };
        case types.SET_CURRENT_EXPENSE:
            return {
                ...state,
                expense: action.payload
            };
        case types.CLEAR_EXPENSE:
            return {
                ...state,
                expense: null,
                expenses: [],
                loading: false
            };

        // case types.FILTER_STAFF:
        //   return {
        //    ...state,
        //     filtered: expense.expenses.filter(expense => {
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
        case types.DELETE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.filter(
                    expense => expense._id !== action.payload
                ),
                loading: false
            };
        case types.EXPENSE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
