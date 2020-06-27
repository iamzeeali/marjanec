import React, { Fragment, useState, useEffect } from 'react'
import { connect } from "react-redux";
import './Dashboard.css';
import PropTypes from 'prop-types';
import { updateMyPassword, updateMe } from "../../_actions/authAction"
import { Link } from "react-router-dom";


const Profile = ({
    auth: { loading, user },
    history,
    updateMyPassword,
    updateMe

}) => {

    const [formData, setFormData] = useState({
        passwordCurrent: "",
        password: "",
        passwordConfirm: ""
    });

    const [photoData, setPhotoData] = useState({
        firstName: '',
        email: '',
        lastName: '',
        address: '',
        username: '',
        phone: 0,
        image: '',
    });
    const { firstName, email, lastName, address, username, phone, image, } = photoData;

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
    }, [loading]);

    console.log(firstName, lastName, user.email, user.image, user.phone)
    console.log(photoData);


    const onChangePhotoHandler = e => {
        e.preventDefault();
        setPhotoData({ ...photoData, [e.target.name]: e.target.value });

    };
    console.log(photoData)

    const onChangeImage = e => {
        e.preventDefault();
        setPhotoData({ ...photoData, image: e.target.files[0] });
    };

    console.log(image)

    const onsubmitPhoto = e => {
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

    const [statedisable, setstateDisable] = useState({
        disabled: true
    })

    const { passwordCurrent, password, passwordConfirm } = formData;

    const onChangeHandler = e => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        updateMyPassword(formData, history);
    };

    const handleDisable = () => {
        setstateDisable({
            disabled: !statedisable.disabled
        })
    }
    return (
        <Fragment>
            <section className="user-profile section animated fadeInUp">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-lg-3 offset-lg-0">
                            <div className="sidebar">
                                <div className="widget user shadow p-3 mb-5 bg-white rounded">
                                    <div className="image d-flex justify-content-center">
                                        <img src={`${process.env.PUBLIC_URL}/uploads/profile/${user.image}`} width="250"
                                            height="100" alt="" className="" />
                                    </div>
                                    <h5 className="text-center">{user.username}</h5>
                                    <h6 className="text-center"><i className="fa fa-dot-circle-o text-info "></i> {user.role}</h6>

                                </div>

                            </div>
                        </div>
                        <div className="col-md-10 offset-md-1 col-lg-9 offset-lg-0">
                            <div className="widget welcome-message">
                                <h2>View profile <i className="fa fa-pencil-square fa-lg ml-4" data-toggle="tooltip" title="Edit Details" onClick={handleDisable} ></i></h2>


                                <p>GlobusLabs has a team of highly trained engineers, and executives from different verticals who keep researching on new technology to come up with more cutting edge solutions and products for our customers. We believe in providing cutting edge solutions using latest technology.</p>
                            </div>
                            <Link to="/admin/editmyprofile"> <i className="fa fa-pencil-square fa-lg ml-4" data-toggle="tooltip" title="Edit Details" ></i></Link>
                            <div className="col-md-10 offset-md-1 col-lg-9 offset-lg-0 text-center">
                                <h3 className="widget-header user">View Personal Information </h3></div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">

                                    <div className="widget personal-info">
                                        <form encType="multipart/form-data" onSubmit={onsubmitPhoto} >
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input
                                                    type="text" className="form-control" name="firstName"
                                                    placeholder={user.firstName}
                                                    value={statedisable.disabled ? user.firstName : firstName}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input
                                                    type="text" className="form-control" name="lastName"
                                                    placeholder={user.lastName}
                                                    value={statedisable.disabled ? user.lastName : lastName}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="text" className="form-control" name="email"
                                                    placeholder={user.email}
                                                    value={statedisable.disabled ? user.email : email}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>

                                            <div className="form-group">
                                                <label>Address</label>
                                                <input type="text" className="form-control" name="address"
                                                    placeholder={user.address}
                                                    value={statedisable.disabled ? user.address : address}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>

                                        </form>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="widget change-email mb-0">
                                        <form encType="multipart/form-data" onSubmit={onsubmitPhoto} >
                                            <div className="form-group">
                                                <label>Phone No.</label>
                                                <input type="number" className="form-control" name="phone"
                                                    placeholder={user.phone}
                                                    value={statedisable.disabled ? user.phone : phone}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="username"
                                                    placeholder={user.username}
                                                    value={statedisable.disabled ? user.username : username}
                                                    onChange={e => onChangePhotoHandler(e)}
                                                    disabled={statedisable.disabled} />
                                            </div>
                                            <div className="form-group">
                                                <label>Profile Picture</label>
                                                <div>
                                                    <small><b>Max-File-Size-1MB <br />Supported File jpg/png</b></small>
                                                    <input
                                                        placeholder="Upload Profile Pic"
                                                        type="file"
                                                        tdata-button="Upload Profile"
                                                        name="image"
                                                        onChange={onChangeImage} className="border p-3 w-100 my-2" /> <br />

                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-transparent">Submit Details</button>
                                        </form>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="widget change-password">
                                        <h3 className="widget-header user">Edit Password</h3>
                                        <form onSubmit={e => onSubmitHandler(e)}>
                                            <div className="form-group">
                                                <label>Current Password</label>
                                                <input type="password"
                                                    className="form-control"
                                                    value={passwordCurrent}
                                                    name="passwordCurrent"
                                                    onChange={e => onChangeHandler(e)}
                                                    required />
                                            </div>
                                            <div className="form-group">
                                                <label>New Password</label>
                                                <input type="password"
                                                    className="form-control"
                                                    value={password}
                                                    name="password"
                                                    onChange={e => onChangeHandler(e)}
                                                    required />
                                            </div>
                                            <div className="form-group">
                                                <label>Confirm New Password</label>
                                                <input type="password"
                                                    className="form-control"
                                                    value={passwordConfirm}
                                                    name="passwordConfirm"
                                                    onChange={e => onChangeHandler(e)}
                                                    required />
                                            </div>
                                            <button className="btn btn-transparent">Change Password</button>
                                        </form>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}


Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    updateMyPassword: PropTypes.func.isRequired,
    updateMe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { updateMyPassword, updateMe })(
    Profile
);

//encType="multipart/form-data"
