import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getInvestments,
    deleteInvestment,
    setCurrentInvestment
} from "../../_actions/investmentAction";
import moment from 'moment'
import PropTypes from "prop-types";
import { connect } from "react-redux";

const InvestmentMaster = ({
    getInvestments,
    deleteInvestment,
    setCurrentInvestment,
    investments,
    filtered,
    loading,
    history
}) => {
    useEffect(() => {
        getInvestments();
        //eslint-disable-next-line
    }, [getInvestments]);

    const onDeleteHandler = id => {
        deleteInvestment(id);
    };


    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <h2 className="text-center pt-2"> Your's Investments </h2>
                                <br />
                                <div className="row">
                                    <table className="table table-hover table-responsive-md mt-2">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Project</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Amount($)</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Recipt</th>
                                                <th scope="col" className="text-right">
                                                    Action
                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {investments.map(investment => (
                                                <tr key={investment._id}>
                                                    <td>{investment.project.projectName}</td>
                                                    <td>{`${investment.amount} ${investment.currency}`}</td>
                                                    <td>${`${investment.convAmt}`}</td>
                                                    <td>{moment(investment.date).format("DD-MM-YYYY")}</td>
                                                    <td><img src={`${process.env.PUBLIC_URL}/uploads/${investment.image}`} alt={investment.image} className="profileImg"></img></td>
                                                    <td className="text-right">
                                                        <Link
                                                            to={`/admin/editInvestment/${investment._id}`}
                                                            onClick={() => setCurrentInvestment(investment)}
                                                        >
                                                            <i className="fa fa-edit fa-lg mr-4"></i>
                                                        </Link>
                                                        <Link
                                                            title="Delete"
                                                            to="#!"
                                                            onClick={() => onDeleteHandler(investment._id)}
                                                        >
                                                            <i className="fa fa-trash text-danger fa-lg"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div></div></div>
                </section>
            </div>
        </Fragment>
    );
};

InvestmentMaster.propTypes = {
    getInvestments: PropTypes.func.isRequired,
    deleteInvestment: PropTypes.func.isRequired,
    setCurrentInvestment: PropTypes.func.isRequired,
    investments: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    investments: state.investment.investments,
    filtered: state.investment.filtered,
    loading: state.investment.loading
});
export default connect(
    mapStateToProps,
    { getInvestments, deleteInvestment, setCurrentInvestment }
)(InvestmentMaster);
