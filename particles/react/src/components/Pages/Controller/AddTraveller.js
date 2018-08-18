import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import EventForm from "./Helpers/EventForm";
import EventTable from "./Helpers/EventTable";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-responsive-modal";
import './Helpers/Event.css';
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";


import PropTypes from 'prop-types';

import Backend from './Layouts/Backend';
import { InfoboxProject } from './UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions';
import Loading from './Helpers/Loading';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class AddTraveller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      Event_id: "",
      VSY_IndexNo: ""

    };
  }

  componentDidMount() {
    let self = this;
    fetch("/users/addTraveller/view", {
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


  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
  e.preventDefault();
      // clear form

      this.setState({
        Event_id: "" ,
        VSY_IndexNo: ""
      });

      var insert_data = {
        Event_id: this.state.Event_id,
        VSY_IndexNo: this.state.VSY_IndexNo
      };
      console.log(insert_data);
      var self = this;

      fetch("users/addTraveller/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(insert_data)
      })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(insert_data) {
          console.log(insert_data);
        })
        .catch(function(err) {
          console.log(err);
        })
        .then(function(){
          window.location.reload()
        })

  };

  render() {
    return (
      this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
      <Backend>



      <div className= "content-inner">
      <div className="content-side-wrapper">
      <h3> Add Traveller</h3>
      <MuiThemeProvider>
      <div className="container">
      <form>
        <TextField
          name="VSY_IndexNo"
          hintText="Please insert VSY_IndexNo"
          floatingLabelText="VSY_IndexNo"
          value={this.state.VSY_IndexNo}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="Event_id"
          hintText="Please insert event"
          floatingLabelText="Event_id"
          value={this.state.Event_id}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <br />

        <RaisedButton label="Add" onClick={e => this.onSubmit(e)} primary/>
      </form>
      </div>
      </MuiThemeProvider>


        <br />
        <br />
        <br />

      <div>

      <div className="container" style={{marginTop:20}}>
      <h3>Master Table</h3>
      <br/>
        <BootstrapTable
          data={this.state.data}
          hover
          striped
          responsive
          exportCSV
          csvFileName="data.csv"
        >
        <TableHeaderColumn isKey dataField="VSY_IndexNo" width="100">
            VSY_IndexNo
        </TableHeaderColumn>
        <TableHeaderColumn dataField="Event_id" width="100">
            Event Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="TravelPlan_id" width="100">
            Travel Plan Id
        </TableHeaderColumn>
      </BootstrapTable>
        </div>
        </div>


        </div>
        </div>

      </Backend>
            );
          }

        }






AddTraveller.propTypes = {
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
})(AddTraveller)
