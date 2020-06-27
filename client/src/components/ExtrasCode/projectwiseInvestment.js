import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
// import {
//     getProjectInvestments,
// } from "../../_actions/investmentAction";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProjectWiseInvestment = ({
    getProjectInvestments,
    projectwiseInvestment,
    filtered,
    loading,
    history
}) => {
    useEffect(() => {
        getProjectInvestments();
        //eslint-disable-next-line
    }, [getProjectInvestments]);

    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> View All Investments </h2>
                                <br />
                                <div className="row">
                                    <table className="table table-hover table-responsive-md mt-2">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Project Name</th>
                                                <th scope="col">Total No Investment</th>
                                                <th scope="col">User Invested</th>
                                                <th scope="col"> Total Amount($)</th>


                                            </tr>
                                        </thead>

                                        <td>
                                            {projectwiseInvestment.map(investment => (

                                                <tr key={investment._id}>

                                                    <td>{investment.projects_docs.map(pd => (
                                                        pd.projectName
                                                    ))}</td>
                                                    <td>{`${investment.no_of_investment}`}</td>
                                                    <td>{investment.users_docs.map(ud => (
                                                        ud.username
                                                    ))}</td>
                                                    <td>${`${(Math.round(investment.totalAmount * 100) / 100)}`}</td>
                                                </tr>
                                            ))}
                                        </td>
                                    </table>
                                </div>

                            </div></div></div>
                </section>
            </div>
        </Fragment>
    );
};

ProjectWiseInvestment.propTypes = {
    getProjectInvestments: PropTypes.func.isRequired,
    projectwiseInvestment: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    projectwiseInvestment: state.investment.projectwiseInvestment,
    filtered: state.investment.filtered,
    loading: state.investment.loading
});
export default connect(
    mapStateToProps,
    { getProjectInvestments, }
)(ProjectWiseInvestment);
