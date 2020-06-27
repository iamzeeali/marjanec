import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getCustomers,
    deleteCustomer,
    setCurrentCustomer
} from "../../_actions/customerAction";
import './custmstyle.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import notfound from '../images/nodata.png'
const style = { maxWidth: 300, maxHeight: 300 }
//import moment from "moment";



const CustomerMaster = ({
    getCustomers,
    deleteCustomer,
    setCurrentCustomer,
    customers,

}) => {
    useEffect(() => {
        getCustomers();
        //eslint-disable-next-line
    }, [getCustomers]);

    const onDeleteHandler = id => {
        deleteCustomer(id);
    };


    return (

        <Fragment>

            <Fragment>
                <div className="container d-flex justify-content-center">
                    <div className="row text-center mx-auto" style={{ marginLeft: '50%' }}>

                        {customers.length > 0 ? customers.map(cust => (

                            <div className="col-sm-12 col-xl-4 col-md-4 main-section text-center" key={cust._id}>
                                <div className="row">
                                    <div className="col-lg-12 col-sm-12 col-12 profile-header"></div>
                                </div>
                                <div className="row user-detail">
                                    <div className="col-lg-12 col-sm-12 col-12">
                                        <img src={`${process.env.PUBLIC_URL}/uploads/profile/${cust.image}`} alt={cust.image} className="rounded-circle img-thumbnail" />
                                        <h5>{cust.name}</h5>
                                        <p><i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
                                            {cust.address}</p>
                                        <p><i className="fa fa-phone mr-2" aria-hidden="true"></i>
                                            {cust.phone}</p>
                                        <p><i className="fa fa-envelope mr-2" aria-hidden="true"></i>
                                            {cust.email}</p>
                                        <p><i className="fa fa-user mr-2" aria-hidden="true"></i>
                                       Added By:- <strong>{cust.user.username}</strong></p>
                                        <hr />
                                        <Link to={`/admin/editCustomer/${cust._id}`} onClick={() => setCurrentCustomer(cust)} className="btn btn-info btn-sm m-2 btn-block ">Edit</Link>

                                        <Link to="#!" onClick={() => onDeleteHandler(cust._id)} className="btn btn-danger btn-sm btn-block m-2">Delete</Link>

                                    </div>
                                </div>
                            </div>
                        )) : <div className="container text-center">
                                <img src={notfound} style={style} />
                            </div>}
                    </div>
                </div>
            </Fragment>

        </Fragment>

    );
};

CustomerMaster.propTypes = {
    getCustomers: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired,
    setCurrentCustomer: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    customers: state.customer.customers,
    filtered: state.customer.filtered,
    loading: state.customer.loading
});
export default connect(
    mapStateToProps,
    { getCustomers, deleteCustomer, setCurrentCustomer }
)(CustomerMaster);
