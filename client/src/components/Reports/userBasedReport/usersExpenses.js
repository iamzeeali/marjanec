import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { userExpense, userTotalExpense } from "../../../_actions/expenseAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewUsersExpense = ({
  userExpense,
  usersExpenses,
  userTotalExpense,
  usersSumExp,
  firstName,
  loading,
  history,
  match,
}) => {
  useEffect(() => {
    userExpense(match.params.id);
    userTotalExpense(match.params.id);
    //eslint-disable-next-line
  }, [userExpense, userTotalExpense]);

  let UserSumTotal = usersSumExp.map(
    (user) =>
      // Math.round((user.totalAmount * 100) / 10)
      user.totalAmount
  );
  console.log(UserSumTotal);
  return (
    <Fragment>
      <div className="container-fluid">
        <section className="container-fluid mt-4  justify-content-center ">
          <div className="container">
            <div className="row justify-content-center animated fadeIn">
              <div className="col-lg-10 col-md-10 align-item-center">
                <div class="row">
                  <div className="col-sm-2">
                    {" "}
                    <Link
                      to="/admin/expenses/viewAllexpenses"
                      className="btn btn-primary"
                    >
                      <i className="fa fa-arrow-left mr-2"></i>Back
                    </Link>
                  </div>
                  <div className="col-sm-6">
                    {" "}
                    <h2 className="pt-2">
                      {" "}
                      {usersExpenses.map((ue) => ue.firstName)}'s all expenses{" "}
                    </h2>
                  </div>
                  <div className="col-sm-4">
                    {" "}
                    <Link className="btn btn-info btn-block">
                      Total Exp: <i className="fa fa-usd"> </i>{" "}
                      {parseFloat(UserSumTotal).toFixed(2)}{" "}
                    </Link>
                  </div>
                </div>

                <br />
                <div className="row">
                  <table className="table table-hover table-responsive-md mt-2">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Amount($)</th>
                        <th scope="col">Date</th>
                        <th scope="col">Receipt</th>
                        <th scope="col">User</th>
                      </tr>
                    </thead>

                    <tbody>
                      {usersExpenses.map((expense) => (
                        <tr key={expense._id}>
                          <td>{expense.project.projectName}</td>
                          <td>{`${expense.amount} ${expense.currency}`}</td>
                          <td>${`${expense.convAmt}`}</td>
                          <td>{`${expense.date}`}</td>
                          <td>
                            <img
                              src={`${process.env.PUBLIC_URL}/uploads/${expense.image}`}
                              alt={expense.image}
                              className="profileImg"
                            ></img>
                          </td>
                          <td>{`${expense.user && expense.user.firstName}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

ViewUsersExpense.propTypes = {
  userExpense: PropTypes.func.isRequired,
  usersExpenses: PropTypes.array.isRequired,
  userTotalExpense: PropTypes.func.isRequired,
  usersSumExp: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  filtered: state.expense.filtered,
  loading: state.expense.loading,
  usersExpenses: state.expense.usersExpenses,
  usersSumExp: state.expense.usersSumExp,
});
export default connect(mapStateToProps, { userExpense, userTotalExpense })(
  ViewUsersExpense
);
