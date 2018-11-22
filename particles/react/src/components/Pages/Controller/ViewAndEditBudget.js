import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import BudgetForm from "./Helpers/BudgetForm";
import BudgetTable from "./Helpers/BudgetTable";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-responsive-modal";
import './Helpers/Event.css';

import ItemAdditionTableForBudgetEdit from "./Helpers/ItemAdditionTableForBudgetEdit";



import PropTypes from 'prop-types';

import Backend from './Layouts/Backend';
import { InfoboxProject } from './UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions';
import Loading from './Helpers/Loading';

class ViewAndEditBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      items_data: [],

    
      TravelPlan_id: localStorage.getItem('BudgetEventSelection_TravelPlan_id'),
      VSY_IndexNo: localStorage.getItem('BudgetTravellerSelection_VSY_IndexNo'),
      Event_id: localStorage.getItem('BudgetEventSelection_Event_id'),
      VSY_Meeting_Group_Desription : "",
      milestone : "",
      description : "",
      traveller_company : "",
      from_location : "",
      to_location : "",
      travel_status_days : "",
      traveller_name : localStorage.getItem('BudgetTravellerSelection_TravellerName'),
      event_name: localStorage.getItem('BudgetEventSelection_EventName'),
      traveller_labor_category : "",
      estimated_labor_travel_time : "",
      comments : "",
      accomodation_cost : "",
      car_rental_cost : "",
      per_diem_cost: "",
      flight_or_car_cost : "",
      taxi_mileage_gas : "",
      total : "",
      event_start_date: localStorage.getItem('BudgetEventSelection_EventStartDate'),
      travel_program: localStorage.getItem('BudgetEventSelection_TravelProgram'),
      travel_start_date: localStorage.getItem('BudgetTravellerSelection_TravelStartDate')

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

        fetch("/users/items/viewer_for_budgetedit/" + self.state.VSY_IndexNo + "/" + self.state.Event_id + "/" + self.state.TravelPlan_id, {
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
        .then(function(){
          console.log(self.state.Event_Id);
        })
      })



  }

  render() {
    return (
      this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
      <Backend>



      <div className= "content-inner-mobilefix">
      <div className="content-side-wrapper">
        <br />

        <div className="container" style={{marginTop:20}}>
          <h4 align="left">Click the <b>Add Item</b> button below to start building {this.state.traveller_name}'s budget for <br />  {this.state.travel_program} | {this.state.event_name} | Travel starting on {this.state.travel_start_date}</h4>
          <br />
          <ItemAdditionTableForBudgetEdit items_data={this.state.items_data} />
        </div>
        <br />
        <br />


        </div>
          </div>


              </Backend>
            );
          }

        }






ViewAndEditBudget.propTypes = {
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
})(ViewAndEditBudget)
