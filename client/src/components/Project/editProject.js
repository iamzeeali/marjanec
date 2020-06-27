import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { editProject, getCurrentProject } from '../../_actions/projectAction'
import { getCustomers } from '../../_actions/customerAction'

import '../UI/Dashboard.css'

const EditProject = ({
    project: { project, loading },
    history,
    editProject,
    customers,
    getCustomers,
    getCurrentProject,
    match

}) => {

    const [formData, setFormData] = useState({
        projectName: "",
        customerName: "",
        startDate: "",
        endDate: "",
    });

    const { projectName, customerName, startDate, endDate, } = formData;

    useEffect(() => {
        getCurrentProject(match.params.id);
        getCustomers();
        setFormData({
            projectName: loading || !project.projectName ? "" : project.projectName,
            customerName: loading || !project.customerName ? "" : project.customerName,
            startDate: loading || !project.startDate ? "" : project.startDate,
            endDate: loading || !project.endDate ? "" : project.endDate
        });
        //eslint-disable-next-line
    }, [loading, getCurrentProject, getCustomers]);

    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        editProject(formData, history, match.params.id);
    };


    let customerOption = customers.map(customer => (
        <option key={customer._id} value={customer._id} selected={customerName === customer.name}>
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
                                    <div className="bg-light border border-primary">
                                        <div>
                                            <h3 className="bg-primary text-center text-white p-4"><Link to="/admin/viewproject" className="text-white"><i className="fa fa-arrow-left mr-2 float-left"></i></Link> Edit Project</h3></div>
                                        <fieldset className="p-4">

                                            <input name="projectName"
                                                placeholder="Project Name"
                                                type="text"
                                                value={projectName}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />

                                            <select
                                                className="border p-3 w-100 my-2"
                                                name="customerName"
                                                value={customerName}
                                                //defaultValue={{ label: "Select Project", value: 0 }}
                                                onChange={e => onChangeHandler(e)} >
                                                <option>Select Customer</option>
                                                {customerOption}
                                            </select>

                                            <input name="startDate"
                                                placeholder="Start Date"
                                                type="date"
                                                value={startDate}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />
                                            <input name="endDate"
                                                placeholder="End Date"
                                                type="date"
                                                value={endDate}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />

                                            <button type="submit" className="d-block py-3 px-5 bg-primary text-white border-0 rounded font-weight-bold mt-3">Edit</button>

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

EditProject.propTypes = {
    editProject: PropTypes.func.isRequired,
    getCurrentProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    getCustomers: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    project: state.project,
    customers: state.customer.customers

});
export default connect(mapStateToProps, { editProject, getCurrentProject, getCustomers })(EditProject);
