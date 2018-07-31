import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
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

class OnlineTravelRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      Request_Form_No: "OTR-" + Math.floor(Math.random() * 10000000 + 1),
      VSY_IndexNo: "",
      TravelPlan_id: "",
      Event_id: "",
      request_date: ""



    };
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
        Request_Form_No: "",
        VSY_IndexNo: "",
        TravelPlan_id: "",
        Event_id: "",
        request_date: ""
      });

      var insert_data = {
        Request_Form_No: this.state.Request_Form_No,
        VSY_IndexNo: this.state.VSY_IndexNo,
        TravelPlan_id: this.state.TravelPlan_id,
        Event_id: this.state.Event_id,
        request_date: this.state.request_date

      };
      console.log(insert_data);

      fetch("users/onlinetravelrequest/new", {
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
        });

  };

  render() {
    return (
      this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
      <Backend>



      <div className= "content-inner">
      <div className="content-side-wrapper">
      <h3>Step 1:</h3>
      <br />
      <h5> Form Fill up</h5>
      <MuiThemeProvider>
      <div className="container">
      <form>
        <TextField
          name="Request_Form_No"
          floatingLabelText="Request_Form_No"
          value={this.state.Request_Form_No}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="VSY_IndexNo"
          hintText="Please insert VSY Index No"
          floatingLabelText="VSY_IndexNo"
          value={this.state.VSY_IndexNo}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="TravelPlan_id"
          hintText="Please insert Travel Plan Id"
          floatingLabelText="TravelPlan_id"
          value={this.state.TravelPlan_id}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="Event_id"
          hintText="Please insert Event_id"
          floatingLabelText="Event_id"
          value={this.state.Event_id}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="request_date"
          hintText="Please insert date"
          floatingLabelText="request_date"
          value={this.state.request_date}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <br />
        <p> <b> * Please save your Request_Form_No for later use </b> </p>
        <RaisedButton label="Save" onClick={e => this.onSubmit(e)} primary/>
      </form>
      </div>
      </MuiThemeProvider>


        <br />
        <br />














      <div>

      <div className="container" style={{marginTop:20}}>
      <h3> Step 3: </h3>
      <h2>Master Table</h2>
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






OnlineTravelRequestForm.propTypes = {
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
})(OnlineTravelRequestForm)
