import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../UI/Spinner";
import "react-datepicker/dist/react-datepicker.css";
import { addEstimate } from '../../_actions/estimateAction'
import { getProjects } from '../../_actions/projectAction'
import '../UI/Dashboard.css'

const AddEstimate = ({
    history,
    getProjects,
    addEstimate,
    projects,
    sendingLoader

}) => {

    const [formData, setFormData] = useState({
        project: "",
        estimated_amount: "",
        date: '',
        desc: "",

    });

    const { project, estimated_amount, desc, date, } = formData;


    useEffect(() => {
        getProjects();
        //eslint-disable-next-line
    }, [getProjects]);



    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
        //console.log(formData)

    };


    const onSubmitHandler = e => {
        e.preventDefault();
        addEstimate(formData, history);
        console.log(formData)

    };

    let projectOptn = projects.map(projects => (
        <option key={projects._id} value={projects._id}>
            {projects.projectName}
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
                                    <div className="bg-light border border-light">
                                        <h3 className="bg-light text-center p-4">New Estimate</h3>

                                        {sendingLoader ? (
                                            <Spinner />
                                        ) : (
                                                <fieldset className="p-4">


                                                    <select
                                                        className="border p-3 w-100 my-2"
                                                        name="project"
                                                        value={project}
                                                        onChange={e => onChangeHandler(e)} >
                                                        <option>Select Project</option>
                                                        {projectOptn}
                                                    </select>

                                                    <input name="estimated_amount"
                                                        placeholder="Estimated Amount in $"
                                                        type="number"
                                                        value={estimated_amount}
                                                        onChange={e => onChangeHandler(e)}
                                                        className="border p-3 w-100 my-2" required />

                                                    <input name="date"
                                                        placeholder="End Date"
                                                        type="date"
                                                        value={date}
                                                        onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />

                                                    <input name="desc"
                                                        placeholder="Description"
                                                        type="text"
                                                        value={desc}
                                                        onChange={e => onChangeHandler(e)}
                                                        className="border p-3 w-100 my-2" required />

                                                    <button type="submit" className="d-block py-3 px-5 bg-grey border-0 rounded font-weight-bold mt-3">Add</button>

                                                </fieldset>
                                            )}
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

AddEstimate.propTypes = {
    getProjects: PropTypes.func.isRequired,
    addEstimate: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    projects: state.project.projects,
    sendingLoader: state.estimate.sendingLoader
});
export default connect(mapStateToProps, { addEstimate, getProjects })(AddEstimate);
