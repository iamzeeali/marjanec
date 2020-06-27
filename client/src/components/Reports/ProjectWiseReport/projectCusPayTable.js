import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getProjectCustPay,
} from "../../../_actions/customerPayAction";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProjectWiseCustPay = ({
    getProjectCustPay,
    projectwiseCustPay,
    filtered,
    loading,
    history,
    projectId
}) => {
    useEffect(() => {
        getProjectCustPay(projectId);
        //eslint-disable-next-line
    }, [getProjectCustPay]);

    return (
        <Fragment>
            <div className="container-fluid">


                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Amount($)</th>
                            <th scope="col">Date</th>
                            <th scope="col">Invoice</th>

                        </tr>
                    </thead>

                    <tbody>
                        {projectwiseCustPay.map(custpay => (
                            <tr key={custpay._id}>
                                <td>{`${custpay.user.username}`}</td>
                                <td>{`${custpay.amount} ${custpay.currency}`}</td>
                                <td>${`${custpay.convAmt}`}</td>
                                <td>{`${custpay.date}`}</td>
                                <td>{custpay.invoiceNo}</td>


                            </tr>

                        ))}
                    </tbody>
                </table>


            </div>
        </Fragment>
    );
};

ProjectWiseCustPay.propTypes = {
    getProjectCustPay: PropTypes.func.isRequired,
    projectwiseCustPay: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    projectwiseCustPay: state.customerpay.projectwiseCustPay,
    filtered: state.investment.filtered,
    loading: state.investment.loading
});
export default connect(
    mapStateToProps,
    { getProjectCustPay, }
)(ProjectWiseCustPay);
