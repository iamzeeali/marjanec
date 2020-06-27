import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getExpenses,
    deleteExpense,
    setCurrentExpense
} from "../../_actions/expenseAction";
import moment from 'moment'
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ExpenseMaster = ({
    getExpenses,
    deleteExpense,
    setCurrentExpense,
    expenses,
    filtered,
    loading,
    history
}) => {
    useEffect(() => {
        getExpenses();
        //eslint-disable-next-line
    }, [getExpenses]);

    const onDeleteHandler = id => {
        deleteExpense(id);
    };


    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-12 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> All Expenses </h2>
                                <br />
                                <div className="row">
                                    <table className="table table-hover table-responsive-md mt-2">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Project</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Amount($)</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Purpose</th>
                                                <th scope="col">Recipt</th>
                                                <th scope="col" className="text-right">
                                                    Action
                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {expenses.map(expense => (
                                                <tr key={expense._id}>
                                                    <td>{expense.project.projectName}</td>
                                                    <td>{`${expense.amount} ${expense.currency}`}</td>
                                                    <td>${`${expense.convAmt}`}</td>
                                                    <td>{moment(expense.date).format("DD-MM-YYYY")}</td>
                                                    <td>{`${expense.purpose}`}</td>
                                                    <td><img src={`${process.env.PUBLIC_URL}/uploads/${expense.image}`} alt={expense.image} className="profileImg"></img></td>
                                                    <td className="text-right">
                                                        <Link
                                                            to={`/admin/editExpense/${expense._id}`}
                                                            onClick={() => setCurrentExpense(expense)}
                                                        >
                                                            <i className="fa fa-edit fa-lg mr-4"></i>
                                                        </Link>
                                                        <Link
                                                            title="Delete"
                                                            to="#!"
                                                            onClick={() => onDeleteHandler(expense._id)}
                                                        >
                                                            <i className="fa fa-trash text-danger fa-lg"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div></div></div>
                </section>
            </div>
        </Fragment>
    );
};

ExpenseMaster.propTypes = {
    getExpenses: PropTypes.func.isRequired,
    deleteExpense: PropTypes.func.isRequired,
    setCurrentExpense: PropTypes.func.isRequired,
    expenses: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    expenses: state.expense.expenses,
    filtered: state.expense.filtered,
    loading: state.expense.loading
});
export default connect(
    mapStateToProps,
    { getExpenses, deleteExpense, setCurrentExpense }
)(ExpenseMaster);
