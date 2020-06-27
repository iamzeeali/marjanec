import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { addCustomerPay } from '../../_actions/customerPayAction'
import { getProjects } from '../../_actions/projectAction'
import { getCurrencies } from '../../_actions/investmentAction'
import { getCustomers } from '../../_actions/customerAction'

import '../UI/Dashboard.css'

const AddCustomerPay = ({
    getCurrencies,
    history,
    getProjects,
    getCustomers,
    addCustomerPay,
    projects,
    currencies,
    customers,

}) => {


    const [formData, setFormData] = useState({
        project: "",
        customer: "",
        username: "",
        projectName: "",
        amount: "",
        currency: "",
        convAmt: "",
        date: "",
        invoiceNo: ""

    });

    const { project, customer, amount, date, invoiceNo, currency } = formData;

    useEffect(() => {
        getProjects();
        getCustomers();

        //eslint-disable-next-line
    }, [getProjects, getCustomers]);

    useEffect(() => {
        getCurrencies();
        //console.log(currencies[currency]);
        //eslint-disable-next-line
    }, [getCurrencies, currency]);


    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value, convAmt: result, username: usrname[0], projectName: projname[0] });
        //console.log(formData)

    };


    let projDetail = []
    projDetail = projects.filter(x => x._id === project)
    //console.log(projDetail);

    let projname = projDetail.map(nd => (
        nd.projectName

    ))
    // console.log(name[0]);


    let userDetail = []
    userDetail = customers.filter(x => x._id === customer)
    //console.log(userDetail);

    let usrname = userDetail.map(nd => (
        nd.name

    ))
    // console.log(name[0]);

    const onSubmitHandler = e => {
        e.preventDefault();
        addCustomerPay(formData, history);
        console.log(formData)

    };

    const result = (amount / currencies[currency]).toFixed(2)
    //console.log({ result })


    let projectOptn = projects.map(projects => (
        <option key={projects._id} value={projects._id}>
            {projects.projectName}
        </option>
    ));
    let customerOptn = customers.map(customer => (
        <option key={customer._id} value={customer._id}>
            {customer.name}
        </option>
    ));

    return (
        <Fragment>
            <div className="container-fluid">
                <form onSubmit={e => onSubmitHandler(e)} >
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeIn">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-warning">
                                        <div>
                                            <h3 className="bg-warning text-center p-4"><Link to="/dashboard" className="text-white"><i className="fa fa-arrow-left mr-2 float-left"></i></Link> Add Customer Payment</h3></div>
                                        <fieldset className="p-4">

                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="customer"
                                                value={customer}
                                                onChange={e => onChangeHandler(e)} >
                                                <option>Select Customer </option>
                                                {customerOptn}
                                            </select>

                                            <input
                                                name="username"
                                                type="hidden"
                                                value={usrname[0]}
                                            //onChange={e => onProjectHandler2(e)}
                                            />

                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="project"
                                                value={project}
                                                onChange={e => onChangeHandler(e)} >
                                                <option>Select Project</option>
                                                {projectOptn}
                                            </select>

                                            <input
                                                name="projectName"
                                                type="hidden"
                                                value={projname[0]}
                                            //onChange={e => onProjectHandler2(e)}
                                            />

                                            <input name="invoiceNo"
                                                placeholder="Invoice No."
                                                type="text"
                                                value={invoiceNo}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" />


                                            <select className="border p-3 w-100 my-2"
                                                onChange={e => onChangeHandler(e)}
                                                name="currency">
                                                <option value="" className="form-control">--Select Currency--</option>
                                                <option value="INR">INR-Indian Rupees</option>
                                                <option value="OMR" className="form-control">OMR-Omani Riyal</option><br />
                                                <option value="KWD">KWD-Kuwaiti Dinar</option>
                                                <option value="BHD">BHD-Bahraini Dinar</option>
                                                <option value="AED">AED-Emirati Dinar</option>
                                                <option value="GBP">GBP-Great Britain Pound</option>
                                                <option value="SAR">SAR-Saudi Riyal</option>

                                            </select><br />
                                            <p className="ml-4"> <b>1 USD= </b>{currencies[currency]} {currency}</p>


                                            <input name="amount"
                                                placeholder="Amount"
                                                type="number"
                                                value={amount}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" required />


                                            <input name="convAmt"
                                                placeholder="In  $USD "
                                                type="number"
                                                value={result}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" />

                                            <input name="date"
                                                placeholder="Date"
                                                type="date"
                                                value={date}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />


                                            <button type="submit" className="d-block py-3 px-5 bg-warning border-0 rounded font-weight-bold mt-3">Add</button>

                                        </fieldset>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </Fragment>
    )
}

AddCustomerPay.propTypes = {
    getProjects: PropTypes.func.isRequired,
    addCustomerPay: PropTypes.func.isRequired,
    getCurrencies: PropTypes.func.isRequired,
    getCustomers: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    projects: state.project.projects,
    customers: state.customer.customers,
    currencies: state.investment.currencies,



});
export default connect(mapStateToProps, { addCustomerPay, getProjects, getCustomers, getCurrencies })(AddCustomerPay);
