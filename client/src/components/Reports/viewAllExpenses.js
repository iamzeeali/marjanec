import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllExpenses } from "../../_actions/expenseAction";
import { getAllUsers } from "../../_actions/authAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import ReactToExcel from "react-html-table-to-excel";

const ViewAllExpenses = ({
  getAllExpenses,
  allexpenses,
  getAllUsers,
  users,
}) => {
  const [formData, setFormData] = useState({
    year: 0,
    id: "",
  });

  useEffect(() => {
    getAllExpenses();
    getAllUsers();
    //eslint-disable-next-line
  }, [getAllExpenses, getAllUsers]);

  let userOption = users.map((user) => (
    <Link
      className="dropdown-item"
      to={`/admin/expense/userExpense/${user._id}`}
      key={user._id}
    >
      {" "}
      {user.firstName}
    </Link>
  ));

  let userOption2 = users.map((user) => (
    <option className="dropdown-item" value={user._id} key={user._id}>
      {" "}
      {user.firstName}
    </option>
  ));

  let yearOption2 = (
    <Fragment>
      <option className="dropdown-item" value={2018}>
        2018
      </option>
      <option className="dropdown-item" value={2019}>
        2019
      </option>{" "}
      <option className="dropdown-item" value={2020}>
        2020
      </option>{" "}
      <option className="dropdown-item" value={2021}>
        2021
      </option>{" "}
      <option className="dropdown-item" value={2022}>
        2022
      </option>{" "}
      <option className="dropdown-item" value={2023}>
        2023
      </option>{" "}
      <option className="dropdown-item" value={2024}>
        2024
      </option>{" "}
      <option className="dropdown-item" value={2025}>
        2025
      </option>
    </Fragment>
  );
  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const { year, id } = formData;

  let yearOption = (
    <Fragment>
      <Link
        className="dropdown-item"
        to={`/admin/expenses/monthExpense/${2018}`}
      >
        2018
      </Link>
      <Link
        className="dropdown-item"
        to={`/admin/expenses/monthExpense/${2019}`}
      >
        2019
      </Link>
      <Link
        className="dropdown-item"
        to={`/admin/expenses/monthExpense/${2020}`}
      >
        2020
      </Link>
      <Link
        className="dropdown-item"
        to={`/admin/expenses/monthExpense/${2021}`}
      >
        2021
      </Link>
      <Link
        className="dropdown-item"
        to={`/admin/expenses/monthExpense/${2022}`}
      >
        2022
      </Link>
      <Link
        className="dropdown-item"
        to={`/admin/expenses/monthExpense/${2023}`}
      >
        2023
      </Link>
      <Link
        className="dropdown-item"
        to={`/admin/expenses/monthExpense/${2024}`}
      >
        2024
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="container-fluid">
        <section className="container-fluid mt-4  justify-content-center ">
          <div className="container">
            <div className="row justify-content-center animated fadeIn">
              <div className="col-lg-12 col-md-10 align-item-center">
                <h2 className="text-center pt-2">View All Expenses </h2>

                <div className="row">
                  <div className="dropdown show mr-2">
                    <Link
                      className="btn btn-secondary dropdown-toggle"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Select User
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {userOption}
                    </div>
                  </div>
                  <div className="dropdown show ml-2">
                    <Link
                      className="btn btn-secondary dropdown-toggle"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Select Year
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {yearOption}
                    </div>
                  </div>

                  <div className="row border border-dark ml-4">
                    <select
                      className="btn btn-secondary btn-sm dropdown-toggle mr-2"
                      name="year"
                      value={year}
                      onChange={(e) => onChangeHandler(e)}
                      required
                    >
                      <option>Select Year</option>
                      {yearOption2}
                    </select>

                    <select
                      className="btn btn-secondary btn-sm dropdown-toggle ml-2"
                      name="id"
                      value={id}
                      onChange={(e) => onChangeHandler(e)}
                      required
                    >
                      <option>Select User</option>
                      {userOption2}
                    </select>
                    <Link
                      className="btn btn-dark"
                      type="submit"
                      to={`/admin/expenses/usermonthExpense/${year}/${id}`}
                    >
                      Submit
                    </Link>
                  </div>
                </div>

                <br />
                <div className="row">
                  <table
                    className="table table-hover table-responsive-md mt-2"
                    id="table-exp"
                  >
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Amount($)</th>
                        <th scope="col">Date</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Receipt</th>
                        <th scope="col">Username</th>
                      </tr>
                    </thead>

                    <tbody>
                      {allexpenses.map((expense) => (
                        <tr key={expense._id}>
                          <td>{expense.project.projectName}</td>
                          <td>{`${expense.amount} ${expense.currency}`}</td>
                          <td>${`${expense.convAmt}`}</td>
                          <td>{moment(expense.date).format("DD-MM-YYYY")}</td>
                          <td>{`${expense.purpose}`}</td>
                          <td>
                            <img
                              src={`${process.env.PUBLIC_URL}/uploads/${expense.image}`}
                              alt={expense.image}
                              className="profileImg"
                            ></img>
                          </td>
                          <td>{`${expense.user.username}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ReactToExcel
                    className=" btn btn-danger "
                    table="table-exp" // id of table which you want to export
                    filename={`exp-${Date.now()}`} // name of the file
                    sheet="sheet"
                    buttonText="Export Table" // button name
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

ViewAllExpenses.propTypes = {
  getAllExpenses: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  expenses: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  allexpenses: state.expense.allexpenses,
  filtered: state.expense.filtered,
  loading: state.expense.loading,
  users: state.auth.users,
});
export default connect(mapStateToProps, { getAllExpenses, getAllUsers })(
  ViewAllExpenses
);
