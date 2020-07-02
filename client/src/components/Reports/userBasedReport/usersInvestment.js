import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  userInvestment,
  userTotalInvestment,
} from "../../../_actions/investmentAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewUsersInvestment = ({
  userInvestment,
  usersInvestments,
  userTotalInvestment,
  usersSumInv,
  firstName,
  loading,
  history,
  match,
}) => {
  useEffect(() => {
    userInvestment(match.params.id);
    userTotalInvestment(match.params.id);
    //eslint-disable-next-line
  }, [userInvestment, userTotalInvestment]);

  let UserSumTotal = usersSumInv.map(
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
                      to="/admin/investment/viewAllinvestment"
                      className="btn btn-primary"
                    >
                      <i className="fa fa-arrow-left mr-2"></i>Back
                    </Link>
                  </div>
                  <div className="col-sm-6">
                    {" "}
                    <h2 className="pt-2">
                      {usersInvestments.map((ui) => ui.firstName)}'s all
                      investments{" "}
                    </h2>
                  </div>
                  <div className="col-sm-4">
                    {" "}
                    <Link className="btn btn-success btn-block">
                      Total Sum: <i className="fa fa-usd"> </i>{" "}
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
                      {usersInvestments.map((investment) => (
                        <tr key={investment._id}>
                          <td>{investment.project.projectName}</td>
                          <td>{`${investment.amount} ${investment.currency}`}</td>
                          <td>${`${investment.convAmt}`}</td>
                          <td>{`${investment.date}`}</td>
                          <td>
                            <img
                              src={`${process.env.PUBLIC_URL}/uploads/${investment.image}`}
                              alt={investment.image}
                              className="profileImg"
                            ></img>
                          </td>
                          <td>{`${investment.user.firstName}`}</td>
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

ViewUsersInvestment.propTypes = {
  userInvestment: PropTypes.func.isRequired,
  usersInvestments: PropTypes.array.isRequired,
  userTotalInvestment: PropTypes.func.isRequired,
  //usersSumInv: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  filtered: state.investment.filtered,
  loading: state.investment.loading,
  usersInvestments: state.investment.usersInvestments,
  usersSumInv: state.investment.usersSumInv,
});
export default connect(mapStateToProps, {
  userInvestment,
  userTotalInvestment,
})(ViewUsersInvestment);
