import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import BudgetForm from "./Helpers/BudgetForm";
import BudgetTable from "./Helpers/BudgetTable";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-responsive-modal";
import './Helpers/Event.css';

import ItemAdditionTable from "./Helpers/ItemAdditionTable";



import PropTypes from 'prop-types';

import Backend from './Layouts/Backend';
import { InfoboxProject } from './UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions';
import Loading from './Helpers/Loading';

class ConfirmBudgetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      items_data: [],

      Budget_id: "",
      TravelPlan_id: "",
      VSY_IndexNo: "",
      VSY_Meeting_Group_Desription : "",
      milestone : "",
      description : "",
      traveller_company : "",
      from_location : "",
      to_location : "",
      travel_status_days : "",
      traveller_name : "",
      traveller_labor_category : "",
      estimated_labor_travel_time : "",
      comments : "",
      accomodation_cost : "",
      car_rental_cost : "",
      per_diem_cost: "",
      flight_or_car_cost : "",
      taxi_mileage_gas : "",
      total : ""

    };

  }

  componentDidMount() {
    let self = this;

    fetch("/users/budget/view", {
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
      })
      .then (items_data => {

        fetch("/users/items/view", {
          method: "GET"
        })

      .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad Response from server");
          }
          return response.json();
        })
        .then(function(items_data) {
          self.setState({ items_data: items_data.items_data });
        })
        .catch(err => {
          console.log("caught it !, err");
        })
        .then(function(){
          console.log(self.state.items_data)
        })
      })



  }

  render() {
    return (
      this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
      <Backend>



      <div className= "content-inner-mobilefix">
      <div className="content-side-wrapper">
      <MuiThemeProvider>

      <br />
      <h2 align="left"> Check details below then click confirm to create a Budget Record </h2>

      <BudgetForm
      onSubmit={submission =>
        this.setState({
          data: [...this.state.data, submission]
        })}
        />
        



        </MuiThemeProvider>



        </div>
          </div>


              </Backend>
            );
          }

        }






ConfirmBudgetDetails.propTypes = {
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
})(ConfirmBudgetDetails)
