import React, { Fragment, useState } from 'react'
import './Dashboard.css'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetPassword } from '../../_actions/authAction';

const ForgotPassword = ({
    resetPassword,
    history
}) => {


    const [formData, setFormData] = useState({
        password: "",
        passwordConfirm: "",
        token: ''
    });

    const { password, passwordConfirm, token } = formData

    const onChangeHandler = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = e => {
        e.preventDefault();
        resetPassword(password, passwordConfirm, token, history)

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
                                        <h3 className="bg-primary text-center text-white p-4">Reset Password</h3>
                                        <fieldset className="p-4">

                                            <input name="password"
                                                placeholder="Password"
                                                type="password"
                                                value={password}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />
                                            <input name="passwordConfirm"
                                                placeholder="Password Confirm"
                                                type="password"
                                                value={passwordConfirm}
                                                onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" />
                                            <input name="token"
                                                placeholder="Token Code "
                                                type="text"
                                                value={token}
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
    resetPassword: PropTypes.func.isRequired,
}

export default connect(null, { resetPassword })(ForgotPassword)
