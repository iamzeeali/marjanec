import React, { Fragment, useState } from 'react'
import './Dashboard.css'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { forgetPassword } from '../../_actions/authAction';

const ForgotPassword = ({ forgetPassword, history }) => {


    const [formData, setFormData] = useState({
        email: ""
    });

    const { email } = formData

    const onChangeHandler = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = e => {
        e.preventDefault();
        forgetPassword(email, history)

    };

    return (
        <Fragment>
            <div className="container-fluid  landing animated fadeIn">
                <form onSubmit={e => onSubmitHandler(e)}>
                    <section className="login py-5 border-top-1">
                        <div className="container">
                            <div className="row justify-content-center animated fadeIn">
                                <div className="col-lg-5 col-md-8 align-item-center">
                                    <div className="bg-light border border-primary">
                                        <h3 className="bg-primary text-center text-white p-4">Forget Password</h3>
                                        <fieldset className="p-4">
                                            <input name="email"
                                                placeholder="Email"
                                                type="email"
                                                value={email}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />

                                            <button type="submit" className="d-block py-3 px-5 bg-primary text-white border-0 rounded font-weight-bold mt-3">Click</button>
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
ForgotPassword.propTypes = {
    forgetPassword: PropTypes.func.isRequired,
}

export default connect(null, { forgetPassword })(ForgotPassword)
