import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { UsermonthlyExpense } from "../../../_actions/expenseAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import notfound from '../../images/nodata.png'
const style = { maxWidth: 300, maxHeight: 300 }


const UserMonthlyExpense = ({
    usermonthlyExpenses,
    UsermonthlyExpense,
    username2,
    match
}) => {
    useEffect(() => {
        UsermonthlyExpense(match.params.year, match.params.id)
        //eslint-disable-next-line
    }, [UsermonthlyExpense]);

    //  DOWNLOAD PDF CERTIFICTAE
    const createAndDownloadPdf = () => {
        window.print();
    };

    return (
        <Fragment>
            <div className="container-fluid">

                <section className="container-fluid mt-4  justify-content-center ">

                    <div className="container">
                        <div className="row justify-content-center animated fadeIn">
                            <div className="col-lg-10 col-md-10 align-item-center">
                                <div className="row">
                                    <div className="col-sm-3"> <Link to="/admin/expenses/viewAllexpenses" className="btn btn-primary"><i className="fa fa-arrow-left mr-2"></i>Back</Link></div>
                                    <div className="col-sm-5"> <h2 className="pt-2"> {username2[0]}'s {match.params.year} expenses </h2></div>
                                    <div className="col-sm-3"> <button className="btn btn-danger" onClick={createAndDownloadPdf}><i className="fa fa-file-pdf-o fa-lg mr-2"></i>Export</button></div>
                                </div>

                                <br />

                                {usermonthlyExpenses.length > 0 ? usermonthlyExpenses.map(y => (

                                    <div className="row mb-2" key={y._id.month}>

                                        <div className="col-lg-11 col-md-12 col-sm-12">
                                            <button data-toggle="collapse" data-target={`#collapse${y._id.month}`} role="button" aria-expanded="true" aria-controls="collapse" className="btn btn-info btn-block py-2 shadow-sm with-chevron">
                                                <p className="d-flex align-items-center justify-content-between mb-0 px-3 py-2"><strong className="text-uppercase text-white">Year:{y._id.year} / Month:{y._id.month} <strong className="ml-4">Total: ${y.totalExpUserMonthy} </strong></strong><i className="fa fa-angle-down text-white"></i></p>
                                            </button>
                                            <div id={`collapse${y._id.month}`} className="collapse shadow-sm show">
                                                <div className="card" key={y._id.month}>
                                                    {y.expense_docs.map(x => (
                                                        <div className="card-body" key={x._id}>
                                                            <p className="font-italic mb-0 text-dark"> <span className="text-info">{x.username}</span> has invested <span className="text-danger">${x.convAmt}</span> on Project <strong>{x.projectName} </strong>on date {moment(x.date).format('DD-MM-YYYY')}</p>

                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                )) : <div className="container text-center">
                                        <img src={notfound} style={style} />
                                    </div>}


                            </div></div></div>
                </section>
            </div>
        </Fragment>
    );
};


UserMonthlyExpense.propTypes = {
    usermonthlyExpenses: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    usermonthlyExpenses: state.expense.usermonthlyExpenses,
    username2: state.expense.username2,
    UsermonthlyExpense: PropTypes.func.isRequired,
});
export default connect(
    mapStateToProps,
    { UsermonthlyExpense }
)(UserMonthlyExpense);
