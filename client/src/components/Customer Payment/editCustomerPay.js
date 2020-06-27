import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { editCustomerPay, getCurrentCustomerPay } from '../../_actions/customerPayAction'
import { getProjects } from '../../_actions/projectAction'
import { getCustomers } from '../../_actions/customerAction'
import { getCurrencies } from '../../_actions/investmentAction'
import '../UI/Dashboard.css'
import moment from 'moment';

const EditCustomerPay = ({
    customerPay: { customerPay, loading },
    getCurrencies,
    history,
    getProjects,
    getCustomers,
    editCustomerPay,
    projects,
    customers,
    getCurrentCustomerPay,
    match,
    currencies


}) => {

    const [formData, setFormData] = useState({
        project: "",
        projectName: "",
        username: "",
        customer: "",
        amount: "",
        currency: "",
        convAmt: "",
        date: new Date(),
        invoiceNo: ""

    });

    const { project, customer, amount, date, invoiceNo, currency } = formData;

    useEffect(() => {
        getCurrencies();
        getProjects();
        getCustomers();
        getCurrentCustomerPay(match.params.id);
        setFormData({
            amount: loading || !customerPay.amount ? "" : customerPay.amount,
            currency: loading || !customerPay.currency ? "" : customerPay.currency,
            convAmt: loading || !customerPay.convAmt ? "" : customerPay.convAmt,
            // date: loading || !customerPay.date ? "" : moment(customerPay.date).format('YYYY-MM-DD'),
            project: loading || !customerPay.project ? "" : customerPay.project._id,
            customer: loading || !customerPay.customer ? "" : customerPay.customer._id,
            invoiceNo: loading || !customerPay.invoiceNo ? "" : customerPay.invoiceNo
        });
        //eslint-disable-next-line
    }, [loading, getCurrentCustomerPay, getProjects, getCurrencies]);

    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value, convAmt: result, username: usrname[0], projectName: projname[0] });
        //console.log(formData)

    };

    const result = (amount / currencies[currency]).toFixed(2)
    //console.log({ result })

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

    const onSubmitHandler = e => {
        e.preventDefault();
        editCustomerPay(formData, history, match.params.id);
    };


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
                <form onSubmit={e => onSubmitHandler(e)}>
                    <section className="login py-2 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeIn">
                                <div className="col-lg-7 col-md-10 align-item-center">
                                    <div className="bg-light border border-warning">

                                        <div><h3 className="bg-warning text-center p-4"><Link to="/admin/view-customerPay" className="text-white"><i className="fa fa-arrow-left mr-2 float-left"></i></Link> Edit Customer Payment</h3></div>
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
                                                value={usrname}
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
                                                value={projname}
                                            //onChange={e => onProjectHandler2(e)}
                                            />

                                            <select className="border p-3 w-100 my-2"
                                                onChange={e => onChangeHandler(e)}
                                                name="currency"
                                                value={currency}>

                                                <option value="" className="form-control">--Select Currency--</option>
                                                <option value="INR">INR-Indian Rupees</option>
                                                <option value="USD">USD-US DOLLAR</option>
                                                <option value="SAR">SAR-Saudi Riyal</option>
                                                <option value="OMR">OMR-Omani Riyal</option>
                                                <option value="KWD">KWD-Kuwaiti Dinar</option>
                                                <option value="BHD">BHD-Bahraini Dinar</option>
                                                <option value="AED">AED-Emirati Dinar</option>
                                                <option value="QAR">QAR-QATARI Riyal</option>
                                                <option value="GBP">GBP-Great Britain Pound</option>

                                            </select> <br />
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

                                            <input name="invoiceNo"
                                                placeholder="Invoice No."
                                                type="text"
                                                value={invoiceNo}
                                                onChange={e => onChangeHandler(e)}
                                                className="border p-3 w-100 my-2" />

                                            <button type="submit" className="d-block py-3 px-5 bg-warning text-white border-0 rounded font-weight-bold mt-3">Edit</button>

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

EditCustomerPay.propTypes = {
    editCustomerPay: PropTypes.func.isRequired,
    getCurrentCustomerPay: PropTypes.func.isRequired,
    customerPay: PropTypes.object.isRequired,
    getCurrencies: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
    getCustomers: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    projects: state.project.projects,
    customers: state.customer.customers,
    customerPay: state.customerpay,
    currencies: state.investment.currencies

});
export default connect(mapStateToProps, { editCustomerPay, getCurrentCustomerPay, getCurrencies, getProjects, getCustomers })(EditCustomerPay);
