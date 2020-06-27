import React, { Fragment, useState } from 'react'
import './Dashboard.css'
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../_actions/authAction";

const Register = ({
    register, isAuthenticated, history
}) => {

    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        lastName: "",
        username: "",
        address: "",
        password: "",
        phone: "",
        image: "",
        passwordConfirm: "",

    });

    const {
        firstName,
        email,
        lastName,
        address,
        username,
        password,
        phone,
        image,
        passwordConfirm,
    } = formData;

    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onChangeImage = e => {
        e.preventDefault();
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        let formData = new FormData();

        formData.append("image", image);
        formData.append("firstName", firstName);
        formData.append("email", email);
        formData.append("lastName", lastName);
        formData.append("address", address);
        formData.append("phone", phone);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("passwordConfirm", passwordConfirm);

        register(formData, history);
    };



    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <section className="container-fluid landing animated fadeIn">

                {/*-- Modal Body Starts  -*/}

                <div className="container bg-light animated fadeIn border border-primary pb-2">
                    <form encType="multipart/form-data" onSubmit={onSubmitHandler}>
                        <h2 className="bg-dark text-center text-white p-4">New User</h2>
                        <fieldset className="p-4">
                            <div className="form-row">
                                <div className="form-group col-sm-6">
                                    <input type="text"
                                        placeholder="First Name"
                                        className="border p-3 w-100 my-2"
                                        name="firstName"
                                        value={firstName}
                                        onChange={e => onChangeHandler(e)}
                                        required />
                                </div>
                                <div className="form-group col-sm-6">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="border p-3 w-100 my-2"
                                        name="lastName"
                                        value={lastName}
                                        onChange={e => onChangeHandler(e)}
                                        required />
                                </div>


                            </div>

                            <div className="form-row">
                                <div className="form-group col-sm-6">
                                    <input name="email"
                                        className="border p-3 w-100 my-2"
                                        placeholder="Email"
                                        type="email"
                                        value={email}
                                        onChange={e => onChangeHandler(e)}
                                        required />
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="text"
                                        placeholder="UserName"
                                        className="border p-3 w-100 my-2"
                                        name="username"
                                        value={username}
                                        onChange={e => onChangeHandler(e)}
                                        required />
                                </div>

                            </div>

                            <div className="form-row">

                                <div className="form-group col-sm-12">
                                    <textarea type="text"
                                        placeholder="Address"
                                        className="border p-3 w-100 my-2"
                                        name="address"
                                        value={address}
                                        onChange={e => onChangeHandler(e)}
                                        required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-6">
                                    <input
                                        type="password"
                                        className="border p-3 w-100 my-2"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={e => onChangeHandler(e)}
                                        required />
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="password"
                                        className="border p-3 w-100 my-2"
                                        placeholder="Re-Enter Password"
                                        name="passwordConfirm"
                                        value={passwordConfirm}
                                        onChange={e => onChangeHandler(e)}
                                        required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-6">
                                    <input type="number"
                                        placeholder="Phone"
                                        className="border p-3 w-100 my-2"
                                        name="phone"
                                        value={phone}
                                        onChange={e => onChangeHandler(e)}
                                        required />
                                </div>
                                <div className="form-group col-sm-6">
                                    <small>Upload Profile <b>Max-File-Size-1MB <br />Supported File jpg/png</b></small>
                                    <input
                                        placeholder="Upload Profile"
                                        type="file"
                                        tdata-button="Upload Profile"
                                        name="image"
                                        onChange={onChangeImage} className="border p-3 w-100 my-2" /> <br />
                                </div>
                            </div>

                        </fieldset>




                        <div className="text-center">
                            <button type="submit" className="d-block py-3 px-5 bg-primary text-white border-0 rounded font-weight-bold mt-3">
                                SUBMIT FORM</button>
                        </div>

                    </form>
                </div>

                {/*-- Modal Body Ends  -*/}

            </section>
        </Fragment>
    )
}
Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { register })(Register)
