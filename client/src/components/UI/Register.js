import React, { Fragment, useState } from "react";
import "./Dashboard.css";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../_actions/authAction";

const Register = ({ register, isAuthenticated, history }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    lastName: "",
    password: "",
    phone: "",
    passwordConfirm: "",
  });

  const {
    firstName,
    email,
    lastName,
    password,
    phone,
    passwordConfirm,
  } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    e.preventDefault();
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    register(formData, history);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <section className="container-fluid animated fadeIn ">
        {/*-- Modal Body Starts  -*/}

        <div className="container bg-light animated fadeIn py-4">
          <form encType="multipart/form-data" onSubmit={onSubmitHandler}>
            <h2 className="bg-dark text-center text-white p-4">New User</h2>
            <fieldset className="p-4">
              <div className="form-row">
                <div className="form-group col-sm-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="border p-2 w-100 my-2"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => onChangeHandler(e)}
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border p-2 w-100 my-2"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => onChangeHandler(e)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group w-100">
                  <input
                    name="email"
                    className="border p-2 w-100 my-2"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => onChangeHandler(e)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-sm-6">
                  <input
                    type="password"
                    className="border p-2 w-100 my-2"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => onChangeHandler(e)}
                    minlength="8"
                    required
                  />
                </div>
                <div className="form-group col-sm-6">
                  <input
                    type="password"
                    className="border p-2 w-100 my-2"
                    placeholder="Confirm Password"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => onChangeHandler(e)}
                    minlength="8"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-sm-6">
                  <input
                    type="number"
                    placeholder="Phone"
                    className="border p-2 w-100 my-2"
                    name="phone"
                    value={phone}
                    onChange={(e) => onChangeHandler(e)}
                    required
                  />
                </div>
              </div>
            </fieldset>

            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>
          </form>
        </div>

        {/*-- Modal Body Ends  -*/}
      </section>
    </Fragment>
  );
};
Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
