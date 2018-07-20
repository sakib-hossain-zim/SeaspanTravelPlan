import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import EventForm from "./Helpers/EventForm";
import Table1 from "./Helpers/Table";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-responsive-modal";
import './Helpers/Event.css'


import PropTypes from 'prop-types';

import Backend from './Layouts/Backend';
import { InfoboxProject } from './UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions';
import Loading from './Helpers/Loading';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      Event_id: "",
      event_name: "",
      event_type: "",
      description: "",
      event_location: "",
      month_reported_in_table1: "",
      duration: "",
      event_status: "",
      travel_group: "",
      p6_uniqueid: "",
      weekNo: "",
      meeting_date: "",
      expected_meeting_date: "",

    };

  }

  componentDidMount() {
    let self = this;
    fetch("/users/event/view", {
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



      <div className= "content-inner">
      <div className="content-side-wrapper">
      <MuiThemeProvider>


      <div className= 'card-event'>
      <div className= 'card-title-event'>Create Table</div>
      <div className= 'card-event-content'>
      <div className="container">
      <EventForm
      onSubmit={submission =>
        this.setState({
          data: [...this.state.data, submission]
        })}
        />
        </div>
        </div>
        </div>


        </MuiThemeProvider>
        <br />
        <br />


         <div className= 'card-event'>
        <div className= 'card-title-event'>Event Viewer </div>
        <div className='card-content'>

        <div className="container" style={{marginTop:20}}>
          <Table1 data={this.state.data} />
        </div>

         </div>
        </div>



          </div>
          </div>


              </Backend>
            );
          }

        }






Event.propTypes = {
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
})(Event)
