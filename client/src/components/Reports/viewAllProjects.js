import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getAllProjects,
    setCurrentProject
} from "../../_actions/projectAction";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewAllProjects = ({
    getAllProjects,
    allprojects,
    setCurrentProject,
    filtered,
    loading,
    history
}) => {
    useEffect(() => {
        getAllProjects();
        //eslint-disable-next-line
    }, [getAllProjects]);

    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> View All Projects </h2>
                                <br />
                                <div className="row">
                                    <table className="table table-hover table-responsive-md mt-2">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Project Name</th>
                                                <th scope="col">Customer Name</th>
                                                <th scope="col">Start Date </th>
                                                <th scope="col">End Date </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {allprojects.map(project => (
                                                <tr key={project._id}>
                                                    <td><Link to={`/admin/investment/projectwiseinvestment/${project._id}`}>{project.projectName}</Link></td>
                                                    <td>{project.customerName.name}</td>
                                                    <td>{project.startDate}</td>
                                                    <td>{project.endDate}</td>
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

ViewAllProjects.propTypes = {
    getAllProjects: PropTypes.func.isRequired,
    allprojects: PropTypes.array.isRequired,
    setCurrentProject: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    allprojects: state.project.allprojects,
    filtered: state.project.filtered,
    loading: state.project.loading
});
export default connect(
    mapStateToProps,
    { getAllProjects, setCurrentProject }
)(ViewAllProjects);
