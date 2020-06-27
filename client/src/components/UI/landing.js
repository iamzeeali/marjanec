import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner mx-auto">
                    <h3 className="display-4 text-white pt-4">Globus Labs Investor Portal</h3>

                    <p className="lead">
                        Invest Your Capital
          </p>
                    <div className="col-sm-5 mt-4">
                        <Link className="btn btn-primary btn-block btn-lg" to="/login">
                            Log In
            </Link>
                    </div>
                    <small className="py-3">
                        Powered By{" "}
                        <a
                            href="https://www.globuslabs.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Globus Labs
            </a>
                    </small>
                </div>
            </div>
        </section>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
