import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backend from './Layouts/Backend';
import { InfoboxProject } from './UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions';
import Loading from './Helpers/Loading';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";



import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";



class ApprovedTravelPlan extends Component {

    constructor(props) {
      super(props);
            this.state = {
              data: [],
              Travel_Auth_No: "",
              VSY_IndexNo: "",
              Event_id: "",
              TravelPlan_id: "",
              status1: "",
              status2_bool: "",
              status3: "",
              notes: ""


            };
          }

          onSubmit = e => {
          e.preventDefault();

              let self = this;
              fetch("/users/authorizationplan/view/" + this.state.VSY_IndexNo, {
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

          };


          change = e => {
            // this.props.onChange({ [e.target.name]: e.target.value });
            this.setState({
              [e.target.name]: e.target.value

            });

            console.log(this.state.VSY_IndexNo)
          };


    render() {

      const selectRowProp = {
        mode:"checkbox",
        clickToSelect: true,

      }

        return (
            this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
            <Backend>
            <div className= "content-inner">
            <div className="content-side-wrapper">

            <h4>Search</h4>
            <MuiThemeProvider>
            <div className="container">
            <form>
              <TextField
                name="VSY_IndexNo"
                hintText="Insert VSY_IndexNo"
                floatingLabelText="Insert VSY_IndexNo"
                value={this.state.VSY_IndexNo}
                onChange={e => this.change(e)}
                floatingLabelFixed
              />
              <br />
              <br />

             <RaisedButton label="FIND" onClick={e => this.onSubmit(e)} primary/>
            </form>
            </div>
            </MuiThemeProvider>
            <br />
            <br />


            <div className="container" style={{marginTop:20}}>
            <h3> Approve Requests </h3>
            <br />
            <p> <b> * Click on rows to change status </b></p>
            <br />
              <BootstrapTable
                data={this.state.data}
                hover
                striped
                responsive
                exportCSV
                csvFileName="authorized_plan.csv"
                height='350'
                selectRow={selectRowProp}
                scrollTop={'Bottom'}
              >

              <TableHeaderColumn isKey dataField="Travel_Auth_No" filter={{type: 'TextFilter', delay:1000}} width="300">
                  Travel_Auth_No
              </TableHeaderColumn>
              <TableHeaderColumn dataField="Request_Form_No" filter={{type: 'TextFilter', delay:1000}} width="300">
                  Request Form No
              </TableHeaderColumn>
              <TableHeaderColumn dataField="VSY_IndexNo" filter={{type: 'TextFilter', delay:1000}} width="100">
                  VSY_IndexNo
              </TableHeaderColumn>
              <TableHeaderColumn dataField="Event_id" filter={{type: 'TextFilter', delay:1000}} width="100">
                  Event Id
              </TableHeaderColumn>
              <TableHeaderColumn dataField="TravelPlan_id" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Travel Plan Id
              </TableHeaderColumn>
              <TableHeaderColumn dataField="Item_id" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Item Id
              </TableHeaderColumn>
              <TableHeaderColumn dataField="item_name" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Item Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="status1" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Status 1
              </TableHeaderColumn>
              <TableHeaderColumn dataField="status2_bool" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Status 2
              </TableHeaderColumn>
              <TableHeaderColumn dataField="notes" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Notes
              </TableHeaderColumn>



             </BootstrapTable>


              </div>

              </div>
              </div>








            </Backend>
        );
    }
}

ApprovedTravelPlan.propTypes = {
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
})(ApprovedTravelPlan)
