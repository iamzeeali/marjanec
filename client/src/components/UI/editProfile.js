import React, { Fragment, useState, useEffect } from 'react'
import './Dashboard.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateMe } from "../../_actions/authAction";

const EditProfile = ({
    updateMe, isAuthenticated, history, auth: { user, loading }
}) => {

    const [photoData, setPhotoData] = useState({
        firstName: "",
        email: "",
        lastName: "",
        username: "",
        address: "",
        phone: "",
        image: "",

    });

    const {
        firstName,
        email,
        lastName,
        address,
        username,
        phone,
        image,
    } = photoData;


    useEffect(() => {
        setPhotoData({
            firstName: loading || !user.firstName ? "" : user.firstName,
            lastName: loading || !user.lastName ? "" : user.lastName,
            email: loading || !user.email ? "" : user.email,
            username: loading || !user.username ? "" : user.username,
            phone: loading || !user.phone ? "" : user.phone,
            address: loading || !user.address ? "" : user.address,
            image: loading || !user.image ? "" : user.image,

        })
    }, [loading])

    const onChangePhotoHandler = e => {
        e.preventDefault();
        setPhotoData({ ...photoData, [e.target.name]: e.target.value });
    };
    console.log(photoData)

    const onChangeImage = e => {
        e.preventDefault();
        setPhotoData({ ...photoData, image: e.target.files[0] });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        let form = new FormData();

        form.append("image", image);
        form.append("firstName", firstName);
        form.append("email", email);
        form.append("lastName", lastName);
        form.append("address", address);
        form.append("phone", phone);
        form.append("username", username);


        updateMe(photoData, history);
    };


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
                                        onChange={e => onChangePhotoHandler(e)}
                                        required />
                                </div>
                                <div className="form-group col-sm-6">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="border p-3 w-100 my-2"
                                        name="lastName"
                                        value={lastName}
                                        onChange={e => onChangePhotoHandler(e)}
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
                                        onChange={e => onChangePhotoHandler(e)}
                                        required />
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="text"
                                        placeholder="UserName"
                                        className="border p-3 w-100 my-2"
                                        name="username"
                                        value={username}
                                        onChange={e => onChangePhotoHandler(e)}
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
                                        onChange={e => onChangePhotoHandler(e)}
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
                                        onChange={e => onChangePhotoHandler(e)}
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
EditProfile.propTypes = {
    updateMe: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});


export default connect(mapStateToProps, { updateMe })(EditProfile)
