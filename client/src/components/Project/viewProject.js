import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getProjects,
  deleteProject,
  setCurrentProject,
} from "../../_actions/projectAction";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProjectMaster = ({
  getProjects,
  deleteProject,
  setCurrentProject,
  projects,
  filtered,
  loading,
  history,
}) => {
  useEffect(() => {
    getProjects();
    //eslint-disable-next-line
  }, [getProjects]);

  const onDeleteHandler = (id) => {
    deleteProject(id);
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <section className="container-fluid mt-4  justify-content-center ">
          <div className="container">
            <div className="row justify-content-center animated fadeIn">
              <div className="col-lg-10 col-md-10 align-item-center">
                <h2 className="text-center pt-2"> All Projects </h2>
                <br />
                <div className="row">
                  <table className="table table-hover table-responsive-md mt-2">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Project Name</th>
                        <th scope="col">Start Date </th>
                        <th scope="col">End Date </th>
                        <th scope="col" className="text-right">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {projects.map((project) => (
                        <tr key={project._id}>
                          <td>{project.projectName}</td>
                          <td>{project.startDate}</td>
                          <td>{project.endDate}</td>
                          <td className="">
                            <Link
                              to={`/project/editProject/${project._id}`}
                              onClick={() => setCurrentProject(project)}
                            >
                              <i className="fa fa-edit fa-lg mr-4"></i>
                            </Link>
                            <Link
                              title="Delete"
                              to="#!"
                              onClick={() => onDeleteHandler(project._id)}
                            >
                              <i className="fa fa-trash text-danger fa-lg"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

ProjectMaster.propTypes = {
  getProjects: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  setCurrentProject: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.project.projects,
  filtered: state.project.filtered,
  loading: state.project.loading,
});
export default connect(mapStateToProps, {
  getProjects,
  deleteProject,
  setCurrentProject,
})(ProjectMaster);
