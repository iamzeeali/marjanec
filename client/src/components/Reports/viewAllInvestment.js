import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllInvestments,
  fetchInvestment,
} from "../../_actions/investmentAction";
import { getAllUsers } from "../../_actions/authAction";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactToExcel from "react-html-table-to-excel";
import Skeleton from "react-loading-skeleton";

const ViewAllInvestment = ({
  getAllInvestments,
  allinvestments,
  fetchInvestment,
  getAllUsers,
  users,
  filtered,
  loading,
  history,
}) => {
  const [scroll, setScroll] = useState({
    limit: 9,
    page: 1,
  });
  const [formData, setFormData] = useState({
    year: 0,
    id: "",
  });

  useEffect(() => {
    let { limit, page } = scroll;
    getAllInvestments(limit, page);
    getAllUsers();
    //eslint-disable-next-line
  }, [getAllInvestments, getAllUsers]);

  const fetch = () => {
    let { limit, page } = scroll;
    setScroll({ ...scroll, page: ++page });
    fetchInvestment(limit, page);
  };

  let userOption = users.map((user) => (
    <Link
      className="dropdown-item"
      to={`/admin/investment/userInvestment/${user._id}`}
      key={user._id}
    >
      {" "}
      {user.firstName}
    </Link>
  ));

  let yearOption = (
    <Fragment className="yearoption">
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
          <div className="container ">
            <div className="row justify-content-center animated fadeIn ">
              <div className="col-lg-10 col-md-10 col-sm-6 align-item-center">
                <h2 className="text-center pt-2"> View All Investments </h2>

                <div className="row">
                  <div className="dropdown show mr-2">
                    <Link
                      className="btn btn-secondary dropdown-toggle"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Select User
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {userOption}
                    </div>
                  </div>

                  <div className="dropdown yearoption show ml-2">
                    <Link
                      className="btn btn-secondary dropdown-toggle "
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Select Year
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {yearOption}
                    </div>
                  </div>
                  <div className="row border border-dark ml-4">
                    <select
                      className="btn btn-secondary btn-sm dropdown-toggle mr-2"
                      name="year"
                      value={year}
                      onChange={(e) => onChangeHandler(e)}
                      required
                    >
                      <option>Select Year</option>
                      {yearOption2}
                    </select>

                    <select
                      className="btn btn-secondary btn-sm dropdown-toggle ml-2"
                      name="id"
                      value={id}
                      onChange={(e) => onChangeHandler(e)}
                      required
                    >
                      <option>Select User</option>
                      {userOption2}
                    </select>
                    <Link
                      className="btn btn-dark"
                      type="submit"
                      to={`/admin/investment/usermonthInvestment/${year}/${id}`}
                    >
                      Submit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />

          <div className="container justify-content-center animated fadeIn">
            <InfiniteScroll
              dataLength={allinvestments.length}
              next={fetch}
              hasMore={true}
              loader={<p>Loading..</p>}
            >
              {allinvestments !== null && !loading ? (
                <table
                  className="table table-hover table-responsive-md mt-2"
                  id="table-inv"
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
                    {allinvestments.map((investment) => (
                      <tr key={investment._id}>
                        <td>{investment.project.projectName}</td>
                        <td>{`${investment.amount} ${investment.currency}`}</td>
                        <td>${`${investment.convAmt}`}</td>
                        <td>{moment(investment.date).format("DD-MM-YYYY")}</td>
                        <td>
                          <img
                            src={`${process.env.PUBLIC_URL}/uploads/${investment.image}`}
                            alt={investment.image}
                            className="profileImg"
                          ></img>
                        </td>
                        <td>{`${investment.user.firstName}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div class="container">
                  <Skeleton count={10} height={40} />
                </div>
              )}
            </InfiniteScroll>
            <ReactToExcel
              className=" btn btn-danger "
              table="table-inv" // id of table which you want to export
              filename={`Inv-${Date.now()}`} // name of the file
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
  fetchInvestment: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, {
  getAllInvestments,
  getAllUsers,
  fetchInvestment,
})(ViewAllInvestment);
