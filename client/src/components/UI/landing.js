import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="">
      <div className="">
        <div className="landing-inner mx-auto py-5">
          <h3 className="display-4">Marjan Engineering & Construction</h3>

          <p className="lead">Track investments and expenses on the go.</p>
          <div className="col-sm-5 mt-4">
            <Link className="btn btn-primary btn-block btn-lg" to="/login">
              Log In
            </Link>
          </div>
          <small className="py-5 text-dark">
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
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
