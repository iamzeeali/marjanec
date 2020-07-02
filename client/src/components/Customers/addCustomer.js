import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addCustomer } from "../../_actions/customerAction";
import "../UI/Dashboard.css";

const AddCustomer = ({ history, addCustomer }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    image: "",
  });

  const { name, address, email, phone, image } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(formData)
  };

  const onChangeImage = (e) => {
    e.preventDefault();

    setFormData({ ...formData, image: e.target.files[0] });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // for uploading images send file as blob multipart/form-data
    let formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("phone", phone);

    addCustomer(formData, history);
    //console.log(formData)
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <form
          encType="multipart/form-data"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <section className="login py-2 border-top-1">
            <div className="container">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light border border-dark">
                    <div>
                      <h3 className="purple text-center text-white p-4">
                        <Link to="/dashboard" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Add Customer
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <input
                        name="name"
                        placeholder="Customer Name"
                        type="text"
                        value={name}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <input
                        name="email"
                        className="border p-3 w-100 my-2"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => onChangeHandler(e)}
                        required
                      />

                      <input
                        name="address"
                        className="border p-3 w-100 my-2"
                        placeholder="Address"
                        type="text"
                        value={address}
                        onChange={(e) => onChangeHandler(e)}
                        required
                      />

                      <input
                        name="phone"
                        placeholder="Phone"
                        type="number"
                        value={phone}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <div>
                        <small>
                          Upload Receipt{" "}
                          <b>
                            Max-File-Size-1MB <br />
                            Supported File jpg/png
                          </b>
                        </small>
                        <input
                          placeholder="Upload Profile Pic"
                          type="file"
                          tdata-button="Upload Receipt"
                          name="image"
                          onChange={onChangeImage}
                          className="border p-3 w-100 my-2"
                        />{" "}
                        <br />
                      </div>

                      <button
                        type="submit"
                        className="d-block py-3 px-5 purple text-white border-0 rounded font-weight-bold mt-3"
                      >
                        Add
                      </button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </Fragment>
  );
};

AddCustomer.propTypes = {
  addCustomer: PropTypes.func.isRequired,
};

export default connect(null, { addCustomer })(AddCustomer);
