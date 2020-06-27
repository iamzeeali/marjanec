import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './style.css'

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            <p className="lead text-white">
                <i className="fa fa-exclamation-triangle"> &nbsp;</i> {alert.msg}
            </p>
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
