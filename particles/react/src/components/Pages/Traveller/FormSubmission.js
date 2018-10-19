import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backend from './Layouts/Backend';
import { InfoboxProject } from './UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions';
import Loading from './Helpers/Loading';

import TravelPlanTable from "./Helpers/TravelPlanTable";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class FormSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      TravelPlan_id: "",
      start_date: "",
      end_date: "",
      source: "",
      destination: "",
      travel_status_bool: "",
      approval_status: "",
      travel_period: "",
      contract: "",
      phase: "",
      nss_program: "",
      planned_budget: "",
      e1_business_unit: ""

    };

  }

  componentDidMount() {
    let self = this;
    fetch("/users/travelPlan/view", {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad Response from server");
        }
        return response.json();
      })
      .then(function(data) {
        self.setState({ data: data.data });
      })
      .catch(err => {
        console.log("caught it !, err");
      });
  }

  render() {
    return (
      this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
      <Backend>



      <div className= "content-inner-mobilefix">
      <div className="content-side-wrapper">







          </div>
          </div>


              </Backend>
            );
          }

        }



FormSubmission.propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    projects: PropTypes.array.isRequired
};

export default connect((store) => {
    return {
        projects: store.projectState.data,
        pagination: store.projectState.pagination,
        isFetching: store.projectState.isFetching
    };
})(FormSubmission)
