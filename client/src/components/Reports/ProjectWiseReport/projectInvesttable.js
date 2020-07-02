import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProjectInvestments } from "../../../_actions/investmentAction";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const PRojectWiseInvest = ({
  getProjectInvestments,
  projectwiseInvestment,
  filtered,
  loading,
  history,
  projectId,
}) => {
  useEffect(() => {
    getProjectInvestments(projectId);
    //eslint-disable-next-line
  }, [getProjectInvestments]);

  return (
    <Fragment>
      <div className="container-fluid">
        <table className="table table-hover ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Amount</th>
              <th scope="col">Amount($)</th>
              <th scope="col">Date</th>
              <th scope="col">Receipt</th>
            </tr>
          </thead>

          <tbody>
            {projectwiseInvestment.map((investment) => (
              <tr key={investment._id}>
                <td>{`${investment.user.username}`}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

PRojectWiseInvest.propTypes = {
  getProjectInvestments: PropTypes.func.isRequired,
  projectwiseInvestment: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  projectwiseInvestment: state.investment.projectwiseInvestment,
  filtered: state.investment.filtered,
  loading: state.investment.loading,
});
export default connect(mapStateToProps, { getProjectInvestments })(
  PRojectWiseInvest
);
