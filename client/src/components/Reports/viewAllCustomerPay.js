import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAllCustomerPays,
} from "../../_actions/customerPayAction.js";
import { getCustomers } from '../../_actions/customerAction'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from 'moment'
import ReactToExcel from "react-html-table-to-excel";


const ViewAllCustomerPay = ({
    getAllCustomerPays,
    allcustomerPay,
    getCustomers,
    customers,

}) => {


    const [formData, setFormData] = useState({
        year: 0,
        id: "",
    });


    useEffect(() => {
        getAllCustomerPays();
        getCustomers();
        //eslint-disable-next-line
    }, [getAllCustomerPays, getCustomers]);



    let customerOption = customers.map(cust => (
        <Link className="dropdown-item" to={`/admin/customerPayment/customersPayment/${cust._id}`} key={cust._id} > {cust.name}</Link>

    ))


    let yearOption = (
        <Fragment>
            <Link className="dropdown-item" to={`/admin/customerPayment/monthInvestment/${2018}`}>2018</Link>
            <Link className="dropdown-item" to={`/admin/customerPayment/monthInvestment/${2019}`}>2019</Link>
            <Link className="dropdown-item" to={`/admin/customerPayment/monthInvestment/${2020}`}>2020</Link>
            <Link className="dropdown-item" to={`/admin/customerPayment/monthInvestment/${2021}`}>2021</Link>
            <Link className="dropdown-item" to={`/admin/customerPayment/monthInvestment/${2022}`}>2022</Link>
            <Link className="dropdown-item" to={`/admin/customerPayment/monthInvestment/${2023}`}>2023</Link>
            <Link className="dropdown-item" to={`/admin/customerPayment/monthInvestment/${2024}`}>2024</Link>
        </Fragment>
    )


    let customerOption2 = customers.map(cust => (
        <option className="dropdown-item" value={cust._id} key={cust._id} > {cust.name}</option>

    ))

    let yearOption2 = (
        <Fragment>
            <option className="dropdown-item" value={2018}>2018</option>
            <option className="dropdown-item" value={2019}>2019</option> <option className="dropdown-item" value={2020}>2020</option> <option className="dropdown-item" value={2021}>2021</option> <option className="dropdown-item" value={2022}>2022</option> <option className="dropdown-item" value={2023}>2023</option> <option className="dropdown-item" value={2024}>2024</option> <option className="dropdown-item" value={2025}>2025</option>
        </Fragment>
    )
    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const { year, id } = formData


    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> View All Customer Payment </h2>

                                <div className="row">
                                    <div className="dropdown show mr-2">
                                        <Link className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Select Customer
                                </Link>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            {customerOption}
                                        </div>
                                    </div>

                                    <div className="dropdown show ml-2">

                                        <Link className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Select Year
                </Link>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            {yearOption}
                                        </div>
                                    </div>

                                    <div className="row border border-dark ml-4">
                                        <select
                                            className="btn btn-secondary btn-sm dropdown-toggle mr-2"
                                            name="year"
                                            value={year}
                                            onChange={e => onChangeHandler(e)} required >
                                            <option>Select Year</option>
                                            {yearOption2}
                                        </select>

                                        <select
                                            className="btn btn-secondary btn-sm dropdown-toggle ml-2"
                                            name="id"
                                            value={id}
                                            onChange={e => onChangeHandler(e)} required>
                                            <option>Select User</option>
                                            {customerOption2}
                                        </select>
                                        <Link className="btn btn-dark" type="submit"
                                            to={`/admin/customerPayment/usermonthInvestment/${year}/${id}`}
                                        >Submit</Link>
                                    </div>
                                </div>


                                <br />
                                <div className="row">
                                    <table className="table table-hover table-responsive-md mt-2" id="table-cust">
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
                                            {allcustomerPay.map(customerPay => (
                                                <tr key={customerPay._id}>
                                                    <td>{customerPay.customer.name}</td>
                                                    <td>{customerPay.project.projectName}</td>
                                                    <td>{customerPay.invoiceNo}</td>
                                                    <td>{`${customerPay.amount} ${customerPay.currency}`}</td>
                                                    <td>${`${customerPay.convAmt}`}</td>
                                                    <td>{moment(customerPay.date).format("DD-MM-YYYY")}</td>
                                                    <td>{customerPay.user.username}</td>


                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <ReactToExcel
                                        className=" btn btn-danger "
                                        table="table-cust" // id of table which you want to export
                                        filename={`cust-${Date.now()}`} // name of the file 
                                        sheet="sheet"
                                        buttonText="Export Table" // button name 
                                    />
                                </div>

                            </div></div></div>
                </section>
            </div>
        </Fragment>
    );
};

ViewAllCustomerPay.propTypes = {
    getAllCustomerPays: PropTypes.func.isRequired,
    allcustomerPay: PropTypes.array.isRequired,
    getCustomers: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    allcustomerPay: state.customerpay.allcustomerPay,
    filtered: state.customerpay.filtered,
    loading: state.customerpay.loading,
    customers: state.customer.customers,

});
export default connect(
    mapStateToProps,
    { getAllCustomerPays, getCustomers }
)(ViewAllCustomerPay);
