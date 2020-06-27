import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getCustomerPays,
    deleteCustomerPay,
    setCurrentCustomerPay
} from "../../_actions/customerPayAction.js";
import moment from 'moment'

import PropTypes from "prop-types";
import { connect } from "react-redux";

const CustomerPayMaster = ({
    getCustomerPays,
    deleteCustomerPay,
    setCurrentCustomerPay,
    customerPays,
    filtered,
    loading,
    history
}) => {
    useEffect(() => {
        getCustomerPays();
        //eslint-disable-next-line
    }, [getCustomerPays]);

    const onDeleteHandler = id => {
        deleteCustomerPay(id);
    };


    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2">Your's Customer Payment </h2>
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
                                                <th scope="col" className="text-right">
                                                    Action
                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {customerPays.map(customerPay => (
                                                <tr key={customerPay._id}>
                                                    <td>{customerPay.customer.name}</td>
                                                    <td>{customerPay.project.projectName}</td>
                                                    <td>{customerPay.invoiceNo}</td>
                                                    <td>{`${customerPay.amount} ${customerPay.currency}`}</td>
                                                    <td>${`${customerPay.convAmt}`}</td>
                                                    <td>{moment(customerPay.date).format("DD-MM-YYYY")}</td>

                                                    <td className="text-right">
                                                        <Link
                                                            to={`/admin/editCustomerPay/${customerPay._id}`}
                                                            onClick={() => setCurrentCustomerPay(customerPay)}
                                                        >
                                                            <i className="fa fa-edit fa-lg mr-4"></i>
                                                        </Link>
                                                        <Link
                                                            title="Delete"
                                                            to="#!"
                                                            onClick={() => onDeleteHandler(customerPay._id)}
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

CustomerPayMaster.propTypes = {
    getCustomerPays: PropTypes.func.isRequired,
    deleteCustomerPay: PropTypes.func.isRequired,
    setCurrentCustomerPay: PropTypes.func.isRequired,
    customerPays: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    customerPays: state.customerpay.customerPays,
    filtered: state.customerpay.filtered,
    loading: state.customerpay.loading
});
export default connect(
    mapStateToProps,
    { getCustomerPays, deleteCustomerPay, setCurrentCustomerPay }
)(CustomerPayMaster);
