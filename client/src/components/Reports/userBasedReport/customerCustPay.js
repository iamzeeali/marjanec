import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomerBasedPay, CustomerTotalPayment } from "../../../_actions/customerPayAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewUsersCustomerPay = ({

    CustomerBasedPay,
    customerbasedPayments,
    CustomerTotalPayment,
    custSumPayment,
    CustName,
    loading,
    history,
    match
}) => {
    useEffect(() => {
        CustomerBasedPay(match.params.id);
        CustomerTotalPayment(match.params.id)
        //eslint-disable-next-line
    }, [CustomerBasedPay, CustomerTotalPayment]);

    let CustBasedSum = custSumPayment.map(user => (
        // Math.round((user.totalAmount * 100) / 10)
        user.totalAmount
    ))
    console.log(CustBasedSum)
    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <div class="row">
                                    <div className="col-sm-2"> <Link to="/admin/customerPayment/viewAllcustomerPayment" className="btn btn-primary"><i className="fa fa-arrow-left mr-2"></i>Back</Link></div>
                                    <div className="col-sm-6"> <h2 className="pt-2">{CustName} payments </h2></div>
                                    <div className="col-sm-4"> <Link className="btn btn-success btn-block">Total Sum: <i className="fa fa-usd"> </i> {parseFloat(CustBasedSum).toFixed(2)} </Link></div>
                                </div>





                                <br />
                                <div className="row">
                                    <table className="table table-hover table-responsive-md mt-2">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Customer</th>
                                                <th scope="col">Project</th>
                                                <th scope="col">Invoice </th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Amount($)</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Username</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {customerbasedPayments.map(customerPay => (
                                                <tr key={customerPay._id}>
                                                    <td>{customerPay.customer.name}</td>
                                                    <td>{customerPay.project.projectName}</td>
                                                    <td>{customerPay.invoiceNo}</td>
                                                    <td>{`${customerPay.amount} ${customerPay.currency}`}</td>
                                                    <td>${`${customerPay.convAmt}`}</td>
                                                    <td>{`${customerPay.date}`}</td>
                                                    <td>{customerPay.user.username}</td>


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


ViewUsersCustomerPay.propTypes = {
    CustomerBasedPay: PropTypes.func.isRequired,
    CustomerTotalPayment: PropTypes.func.isRequired,
    // custSumPayment: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    loading: state.customerpay.loading,
    customerbasedPayments: state.customerpay.customerbasedPayments,
    custSumPayment: state.customerpay.custSumPayment,
    CustName: state.customerpay.CustName
});
export default connect(
    mapStateToProps,
    { CustomerBasedPay, CustomerTotalPayment }
)(ViewUsersCustomerPay);
