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



class CheckStatus extends Component {

    constructor(props) {
      super(props);
            this.state = {
              data: [],
              VSY_IndexNo: localStorage.getItem('VSY_IndexNo'),
              Request_Form_No: "",
              VSY_IndexNo: "",
              TravelPlan_id: "",
              Event_id: "",
              request_date: "",
              Item_id: "",
              Budget_id: "",
              item_name: "",
              amount: "",
              requested_amount: "",
              comment: "",
              reasoning: "",
              status: "",
              note_from_coordinator: "",


            };
          }

     componentDidMount(){

       let self = this;
       fetch("/users/itemsotr/view/" + this.state.VSY_IndexNo, {
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

              <TableHeaderColumn isKey dataField="Request_Form_No" filter={{type: 'TextFilter', delay:1000}} width="300">
                  Request Form No
              </TableHeaderColumn>

              <TableHeaderColumn dataField="VSY_IndexNo" filter={{type: 'TextFilter', delay:1000}} width="200">
                  VSY_IndexNo
              </TableHeaderColumn>
              <TableHeaderColumn dataField="Event_id" filter={{type: 'TextFilter', delay:1000}} width="100">
                  Event Id
              </TableHeaderColumn>
              <TableHeaderColumn dataField="TravelPlan_id" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Travel Plan Id
              </TableHeaderColumn>
              <TableHeaderColumn dataField="Budget_id" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Assigned Budget Id
              </TableHeaderColumn>
              <TableHeaderColumn dataField="Item_id" filter={{type: 'TextFilter', delay:1000}} width="100">
                  Item Id
              </TableHeaderColumn>
              <TableHeaderColumn dataField="item_name" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Item Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="amount" filter={{type: 'TextFilter', delay:1000}} width="100">
                  Budgeted Amount
              </TableHeaderColumn>
              <TableHeaderColumn dataField="requested_amount" filter={{type: 'TextFilter', delay:1000}} width="200">
                 Requested Amount
              </TableHeaderColumn>
              <TableHeaderColumn dataField="status" filter={{type: 'TextFilter', delay:1000}} width="200">
                 Status
              </TableHeaderColumn>
              <TableHeaderColumn dataField="comment" filter={{type: 'TextFilter', delay:1000}} width="200">
                 Comment
              </TableHeaderColumn>
              <TableHeaderColumn dataField="reasoning" filter={{type: 'TextFilter', delay:1000}} width="300">
                 Reasoning
              </TableHeaderColumn>
              <TableHeaderColumn dataField="note_from_coordinator" filter={{type: 'TextFilter', delay:1000}} width="300">
                 Note from coordinator
              </TableHeaderColumn>

             </BootstrapTable>


              </div>

              </div>
              </div>








            </Backend>
        );
    }
}

CheckStatus.propTypes = {
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
})(CheckStatus)
