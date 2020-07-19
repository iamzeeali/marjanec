import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllInvestments } from "../../_actions/investmentAction";
import { getAllUsers } from "../../_actions/authAction";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import InfiniteScroll from "react-infinite-scroll-component";
import ReactToExcel from "react-html-table-to-excel";
// import Skeleton from "react-loading-skeleton";
// import "../../../public/css/style.css"

const ViewAllInvestment = ({
  getAllInvestments,
  allinvestments,
  getAllUsers,
  users,
}) => {
  // const [scroll, setScroll] = useState({
  //     limit: 9,
  //     page: 1
  // });
  const [formData, setFormData] = useState({
    year: 0,
    id: "",
  });

  useEffect(() => {
    getAllInvestments();
    getAllUsers();
    //eslint-disable-next-line
  }, [getAllInvestments, getAllUsers]);

  let userOption = users.map((user) => (
    <Link
      className="dropdown-item"
      to={`/admin/investment/userInvestment/${user._id}`}
      key={user._id}
    >
      {" "}
      {user.firstName && user.firstName}
    </Link>
  ));

  let yearOption = (
    <Fragment>
      <Link
        className="dropdown-item"
        to={`/admin/investment/monthInvestment/${2018}`}
      >
        2018
      </Link>
      <Link
        className="dropdown-item"
        to={`/admin/investment/monthInvestment/${2019}`}
      >
        2019
      </Link>
      <Link
        className="dropdown-item"
        to={`/admin/investment/monthInvestment/${2020}`}
      >
        2020
      </Link>
      <Link
        className="dropdown-item"
        to={`/admin/investment/monthInvestment/${2021}`}
      >
        2021
      </Link>
      <Link
        className="dropdown-item"
        to={`/admin/investment/monthInvestment/${2022}`}
      >
        2022
      </Link>
      <Link
        className="dropdown-item"
        to={`/admin/investment/monthInvestment/${2023}`}
      >
        2023
      </Link>
      <Link
        className="dropdown-item"
        to={`/admin/investment/monthInvestment/${2024}`}
      >
        2024
      </Link>
    </Fragment>
  );

  let userOption2 = users.map((user) => (
    <option className="dropdown-item" value={user._id} key={user._id}>
      {" "}
      {user.firstName}
    </option>
  ));

  let yearOption2 = (
    <Fragment>
      <option className="dropdown-item" value={2018}>
        2018
      </option>
      <option className="dropdown-item" value={2019}>
        2019
      </option>{" "}
      <option className="dropdown-item" value={2020}>
        2020
      </option>{" "}
      <option className="dropdown-item" value={2021}>
        2021
      </option>{" "}
      <option className="dropdown-item" value={2022}>
        2022
      </option>{" "}
      <option className="dropdown-item" value={2023}>
        2023
      </option>{" "}
      <option className="dropdown-item" value={2024}>
        2024
      </option>{" "}
      <option className="dropdown-item" value={2025}>
        2025
      </option>
    </Fragment>
  );
  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const { year, id } = formData;

  return (
    <Fragment>
      <div className="container-fluid">
        <section className="container-fluid mt-2  justify-content-center ">
          <div className="container  animated fadeIn ">
            <div className="justify-content-center ">
              <h2 className="text-center pt-2"> View All Investments </h2>{" "}
            </div>

            <div className="row  d-flex justify-content-around indexz ">
              <div className=" row-sm-6 col-md-5  d-flex justify-content-around">
                <div className="col-sm-2 btn-group mr-2 indexz">
                  <button
                    type="button"
                    className="btn  dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Select User
                  </button>
                  <div className="dropdown-menu indexz">{userOption}</div>
                </div>

                <div className="col-sm-2 btn-group mr-2 indexz">
                  <button
                    type="button"
                    className="btn  dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Select Year
                  </button>
                  <div className="dropdown-menu indexz">{yearOption}</div>
                </div>
              </div>

              <div className="row-sm-12  d-flex justify-content-around  mt-2 border_round ">
                <select
                  className="btn btn-sm dropdown-toggle mr-2"
                  name="year"
                  value={year}
                  onChange={(e) => onChangeHandler(e)}
                  required
                >
                  <option>Select Year</option>
                  {yearOption2}
                </select>

                <select
                  className="btn  btn-sm dropdown-toggle ml-2"
                  name="id"
                  value={id}
                  onChange={(e) => onChangeHandler(e)}
                  required
                >
                  <option>Select User</option>
                  {userOption2}
                </select>

                <Link
                  className="btn"
                  type="submit"
                  to={`/admin/investment/usermonthInvestment/${year}/${id}`}
                >
                  <i className="fa fa-search"></i>
                </Link>
              </div>
            </div>
          </div>

          <br />

          <div className="container justify-content-center ">
            <table
              className="table table-bordered table-hover table-responsive-md mt-2"
              id="table-exp"
            >
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Project</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Amount($)</th>
                  <th scope="col">Date</th>
                  <th scope="col">Receipt</th>
                  <th scope="col">User</th>
                </tr>
              </thead>

              <tbody>
                {allinvestments.map((invest) => (
                  <tr key={invest._id}>
                    <td>{invest.project.projectName}</td>
                    <td>{`${invest.amount} ${invest.currency}`}</td>
                    <td>${`${invest.convAmt}`}</td>
                    <td>{moment(invest.date).format("DD-MM-YYYY")}</td>
                    <td>
                      <img
                        src={`${process.env.PUBLIC_URL}/uploads/${invest.image}`}
                        alt={invest.image}
                        className="profileImg"
                      ></img>
                    </td>
                    <td>{`${invest.user.firstName}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactToExcel
              className=" btn btn-danger "
              table="table-exp" // id of table which you want to export
              filename={`exp-${Date.now()}`} // name of the file
              sheet="sheet"
              buttonText="Export Table" // button name
            />
          </div>
        </section>
      </div>
    </Fragment>
  );
};

ViewAllInvestment.propTypes = {
  getAllInvestments: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  allinvestments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  filtered: state.investment.filtered,
  loading: state.investment.loading,
  users: state.auth.users,
  allinvestments: state.investment.allinvestments,
});
export default connect(mapStateToProps, { getAllInvestments, getAllUsers })(
  ViewAllInvestment
);
