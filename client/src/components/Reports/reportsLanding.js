import React, { Fragment, useEffect } from 'react'

import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import Spinner from "../UI/Spinner";
import { connect } from 'react-redux';
import './reports.css'
import { logout } from '../../_actions/authAction';

const ReportLanding = ({
    loading,
    logout

}) => {



    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                    <div>
                        <div>
                            <div className="container">
                                <div className="row mb-1  animated fadeIn">
                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/project/viewAllproject" style={{ textDecoration: "none" }}>
                                            <div className="card bg-primary text-white h-100">
                                                <div className="card-body bg-primary">
                                                    <div className="rotate">
                                                        <i className="fa fa-file-code-o fa-4x"></i>
                                                    </div>
                                                    <h3 className="text-uppercase">Total Projects</h3>
                                                    <small>View Total No of Projects</small>

                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/investment/viewAllinvestment" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-success h-100">
                                                <div className="card-body bg-success">
                                                    <div className="rotate">
                                                        <i className="fa fa-money fa-4x"></i>
                                                    </div>
                                                    <h3 className="text-uppercase">Total Investment</h3>
                                                    <small>View Total investment on All Projects</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/expenses/viewAllexpenses" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-info h-100">
                                                <div className="card-body bg-info">
                                                    <div className="rotate">
                                                        <i className="fa fa-shopping-cart fa-4x"></i>
                                                    </div>
                                                    <h3 className="text-uppercase">Total Expenses</h3>
                                                    <small>View All Expenses on Projects</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 py-2">
                                        <Link to="/admin/customerPayment/viewAllcustomerPayment" style={{ textDecoration: "none" }}>
                                            <div className="card text-white bg-warning h-100">
                                                <div className="card-body bg-warning">
                                                    <div className="rotate">
                                                        <i className="fa fa-credit-card fa-4x"></i>
                                                    </div>
                                                    <h3 className="text-uppercase">Total Customer Pyament</h3>
                                                    <small> View All Customer Payment Details</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <br />


                                </div>


                            </div>
                        </div>

                    </div>

                )}

        </Fragment>
    );
}
ReportLanding.propTypes = {
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.auth.loading,

});
export default connect(mapStateToProps, { logout })(withRouter(ReportLanding));


// <div className="col-xl-3 col-sm-6 py-2">
// <Link to="/admin/investment/projectwiseinvestment" style={{ textDecoration: "none" }}>
//     <div className="card text-white bg-success h-100">
//         <div className="card-body bg-success">
//             <div className="rotate">
//                 <i className="fa fa-money fa-4x"></i>
//             </div>
//             <h3 className="text-uppercase">Prject Wise Investment</h3>
//             <small>View Total investment on Each Projects</small>
//         </div>
//     </div>
// </Link>
// </div>