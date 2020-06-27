import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getEstimates,
    deleteEstimate,
    setCurrentEstimate
} from "../../_actions/estimateAction";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewEstimate = ({
    getEstimates,
    deleteEstimate,
    setCurrentEstimate,
    estimates,
    filtered,
    loading,
    history
}) => {
    useEffect(() => {
        getEstimates();
        //eslint-disable-next-line
    }, [getEstimates]);

    const onDeleteHandler = id => {
        deleteEstimate(id);
    };


    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-12 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> All Estimates </h2>
                                <br />
                                <div className="row">
                                    <table className="table table-hover table-responsive-md mt-2">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Project</th>
                                                <th scope="col">Estimate Amount($)</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Last Date</th>
                                                <th scope="col" className="text-right">
                                                    Action
                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {estimates.map(estimate => (
                                                <tr key={estimate._id}>
                                                    <td>{estimate.project.projectName}</td>
                                                    <td>${`${estimate.estimated_amount}`}</td>
                                                    <td>{`${estimate.desc}`}</td>
                                                    <td>{`${estimate.date}`}</td>
                                                    <td className="text-right">
                                                        <Link
                                                            to={`/admin/editEstimate/${estimate._id}`}
                                                            onClick={() => setCurrentEstimate(estimate)}
                                                        >
                                                            <i className="fa fa-edit fa-lg mr-4"></i>
                                                        </Link>
                                                        <Link
                                                            title="Delete"
                                                            to="#!"
                                                            onClick={() => onDeleteHandler(estimate._id)}
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

ViewEstimate.propTypes = {
    getEstimates: PropTypes.func.isRequired,
    deleteEstimate: PropTypes.func.isRequired,
    setCurrentEstimate: PropTypes.func.isRequired,
    estimates: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    estimates: state.estimate.estimates,
    filtered: state.estimate.filtered,
    loading: state.estimate.loading
});
export default connect(
    mapStateToProps,
    { getEstimates, deleteEstimate, setCurrentEstimate }
)(ViewEstimate);
