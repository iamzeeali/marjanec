import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../_actions/authAction";
import './Dashboard.css'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const onChangeHandler = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async e => {
        e.preventDefault();
        login(email, password);
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }


    // if (isAuthenticated && role === "student") {
    //     return <Redirect to="/student/your_profile" />;
    // } else if (isAuthenticated && role === "admin") {
    //     return <Redirect to="/admin/dashboard" />;
    // }


    return (
        <div className="container-fluid  landing animated fadeIn">
            <form onSubmit={e => onSubmitHandler(e)}>
                <section className="login py-5 border-top-1">
                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-5 col-md-8 align-item-center">
                                <div className="bg-light border border-primary">
                                    <h3 className="bg-primary text-center text-white p-4">Login Now</h3>
                                    <fieldset className="p-4">
                                        <input name="email"
                                            placeholder="Email"
                                            type="email"
                                            value={email}
                                            onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />

                                        <input name="password"
                                            placeholder="Password"
                                            type="password"
                                            value={password}
                                            onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />

                                        <button type="submit" className="d-block py-3 px-5 bg-primary text-white border-0 rounded font-weight-bold mt-3">Log in</button>
                                        <Link className="mt-3 d-block  text-primary" to="/forgetPassword">Forget Password?</Link>
                                        <Link className="mt-3 d-inline-block text-primary" to="/register">Register Now</Link>
                                    </fieldset>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
};
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,

};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,

});
export default connect(
    mapStateToProps,
    { login }
)(Login);
