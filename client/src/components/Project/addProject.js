import React, { Fragment, useState, useEffect } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProject } from '../../_actions/projectAction'
import { getCustomers } from '../../_actions/customerAction'


import '../UI/Dashboard.css'

const AddProject = ({
    history,
    addProject,
    getCustomers,
    customers,

}) => {



    const [formData, setFormData] = useState({
        projectName: "",
        customerName: "",
        startDate: "",
        endDate: "",


    });

    const { projectName, customerName, startDate, endDate, } = formData;

    useEffect(() => {
        getCustomers();

        //eslint-disable-next-line
    }, [getCustomers,]);

    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        addProject(formData, history);
    };


    let customerOption = customers.map(customer => (
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
                                    <div className="bg-light border border-primary">
                                        <h3 className="bg-primary text-center text-white p-4">New Project</h3>
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

                                            <button type="submit" className="d-block py-3 px-5 bg-primary text-white border-0 rounded font-weight-bold mt-3">Add</button>

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

AddProject.propTypes = {
    addProject: PropTypes.func.isRequired,
    getCustomers: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    customers: state.customer.customers

});
export default connect(mapStateToProps, { addProject, getCustomers })(AddProject);
