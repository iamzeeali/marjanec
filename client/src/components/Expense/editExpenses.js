import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { editExpense, getCurrentExpense } from "../../_actions/expenseAction";
import { getCurrencies } from "../../_actions/investmentAction";
import { getProjects } from "../../_actions/projectAction";
import moment from "moment";
import "../UI/Dashboard.css";

const EditExpense = ({
  expense: { expense, loading },
  getCurrencies,
  getProjects,
  history,
  editExpense,
  getCurrentExpense,
  match,
  projects,
  currencies,
}) => {
  const [formData, setFormData] = useState({
    project: "",
    amount: "",
    currency: "",
    expenseBy: "",
    date: new Date(),
    purpose: "",
    image: "",
    convAmt: "",
  });

  // useEffect(() => {
  //     getCurrencies();
  //     // console.log(currencies[currency]);
  //     //eslint-disable-next-line
  // }, [getCurrencies, currency]);

  useEffect(() => {
    getCurrencies();
    getProjects();
    getCurrentExpense(match.params.id);
    setFormData({
      amount: loading || !expense.amount ? "" : expense.amount,
      currency: loading || !expense.currency ? "" : expense.currency,
      convAmt: loading || !expense.convAmt ? "" : expense.convAmt,
      expenseBy: loading || !expense.expenseBy ? "" : expense.expenseBy,
      date:
        loading || !expense.date
          ? ""
          : moment(expense.date).format("YYYY-MM-DD"),
      purpose: loading || !expense.purpose ? "" : expense.purpose,
      project: loading || !expense.project ? "" : expense.project._id,
      image: loading || !expense.image ? "" : expense.image,
    });
    //eslint-disable-next-line
  }, [loading, getCurrentExpense, getProjects]);

  const {
    amount,
    currency,
    date,
    expenseBy,
    purpose,
    project,
    image,
  } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      convAmt: result,
      projectName: name,
    });
    // console.log(formData)
  };

  console.log(formData);

  let newDetail = [];
  newDetail = projects.filter((x) => x._id === project);
  //console.log(newDetail);

  let name = newDetail.map((nd) => nd.projectName);

  const onChangeImage = (e) => {
    e.preventDefault();
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const result = (amount / currencies[currency]).toFixed(2);
  //console.log({ result })

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // for uploading images send file as blob multipart/form-data
    let formData = new FormData();

    formData.append("image", image);
    formData.append("project", project);
    formData.append("projectName", name);
    formData.append("amount", amount);
    formData.append("currency", currency);
    formData.append("expenseBy", expenseBy);
    formData.append("date", date);
    formData.append("convAmt", result);
    formData.append("purpose", purpose);

    editExpense(formData, history, match.params.id);
  };

  let projectOption = projects.map((pro) => (
    <option key={pro._id} value={pro._id}>
      {pro.projectName}
    </option>
  ));

  return (
    <Fragment>
      <div className="container-fluid">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <section className="login py-2 border-top-1">
            <div className="container">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light border border-info">
                    <div>
                      <h3 className="bg-info text-center text-white p-4">
                        <Link to="/admin/view-expense" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Edit Expense
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <select
                        className="border p-3 w-100 my-2"
                        name="project"
                        value={project}
                        //selected={project}
                        onChange={(e) => onChangeHandler(e)}
                      >
                        <option>Select Project</option>
                        {projectOption}
                      </select>
                      <input
                        name="projectName"
                        type="hidden"
                        value={name[0]}
                        //onChange={e => onProjectHandler2(e)}
                      />
                      <select
                        className="border p-3 w-100 my-2"
                        onChange={(e) => onChangeHandler(e)}
                        name="currency"
                        value={currency}
                      >
                        <option value="" className="form-control">
                          --Select Currency--
                        </option>
                        <option value="INR">INR-Indian Rupees</option>
                        <option value="USD">USD-US DOLLAR</option>
                        <option value="SAR">SAR-Saudi Riyal</option>
                        <option value="OMR">OMR-Omani Riyal</option>
                        <option value="KWD">KWD-Kuwaiti Dinar</option>
                        <option value="BHD">BHD-Bahraini Dinar</option>
                        <option value="AED">AED-Emirati Dinar</option>
                        <option value="QAR">QAR-QATARI Riyal</option>
                        <option value="GBP">GBP-Great Britain Pound</option>
                      </select>{" "}
                      <br />
                      <p className="ml-4">
                        {" "}
                        <b>1 EUR= </b>
                        {currencies[currency]} {currency}
                      </p>
                      <input
                        name="amount"
                        placeholder="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />
                      <input
                        name="convAmt"
                        placeholder="In  $USD "
                        type="number"
                        value={result}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />
                      <p className="ml-4">
                        {" "}
                        <b>Converted Amt. In $USD</b>
                      </p>
                      <input
                        name="date"
                        placeholder="Date"
                        selected={Date.now()}
                        type="date"
                        value={date}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />
                      <input
                        name="expenseBy"
                        placeholder="Expense By"
                        type="text"
                        value={expenseBy}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />
                      <input
                        name="purpose"
                        placeholder="Purpose"
                        type="text"
                        value={purpose}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
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
                          placeholder="Upload Receipt"
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
                        className="d-block py-3 px-5 bg-info text-white border-0 rounded font-weight-bold mt-3"
                      >
                        Edit
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

EditExpense.propTypes = {
  editExpense: PropTypes.func.isRequired,
  getCurrentExpense: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  getProjects: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  expense: state.expense,
  currencies: state.investment.currencies,
  projects: state.project.projects,
});
export default connect(mapStateToProps, {
  editExpense,
  getCurrentExpense,
  getCurrencies,
  getProjects,
})(EditExpense);
