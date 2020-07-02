import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProject } from "../../_actions/projectAction";

import "../UI/Dashboard.css";

const AddProject = ({ history, addProject }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
  });

  const { projectName, startDate, endDate } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addProject(formData, history);
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <section className="login py-2 border-top-1">
            <div className="container">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light border border-primary">
                    <h3 className="bg-primary text-center text-white p-4">
                      New Project
                    </h3>
                    <fieldset className="p-4">
                      <input
                        name="projectName"
                        placeholder="Project Name"
                        type="text"
                        value={projectName}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />
                      <br />
                      <br />
                      <label htmlFor="">Start Date</label>
                      <input
                        name="startDate"
                        placeholder="Start Date"
                        type="date"
                        value={startDate}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />
                      <br />
                      <br />
                      <label htmlFor="">End Date</label>

                      <input
                        name="endDate"
                        placeholder="End Date"
                        type="date"
                        value={endDate}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
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

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
};

export default connect(null, { addProject })(AddProject);
