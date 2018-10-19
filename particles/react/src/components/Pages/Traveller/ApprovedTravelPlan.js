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
import Modal from "react-responsive-modal";



class ApprovedTravelPlan extends Component {

    constructor(props) {
      super(props);
            this.state = {
              data: [],
              items_data:[],
              Travel_Auth_No: "",
              VSY_IndexNo: localStorage.getItem('VSY_IndexNo'),
              Event_id: "",
              TravelPlan_id: "",
              status1: "",
              status2_bool: "",
              status3: "",
              notes: "",
              modalIsOpen: false,


            };


            this.openModal = this.openModal.bind(this);
            this.closeModal = this.closeModal.bind(this);
          }


          openModal(row,abcd) {

            this.setState({
              modalIsOpen: true,
              Event_id: abcd[2],
              TravelPlan_id: abcd[3]


            })


            let self = this;
            fetch("/users/items_otr/view/" + this.state.VSY_IndexNo + "/"+ this.state.Event_id + "/" + this.state.TravelPlan_id, {
              method: "GET"
            })
              .then(function(response) {
                if (response.status >= 400) {
                  throw new Error("Bad Response from server");
                }
                return response.json();
              })
              .then(function(data) {
                self.setState({ items_data: data.data });
              })
              .catch(err => {
                console.log("caught it !, err");
              })


          }

          closeModal() {
            this.setState({
              modalIsOpen: false
            });
          }

     componentDidMount(){

       let self = this;
       fetch("/users/authorizationplan_otr/view/" + this.state.VSY_IndexNo, {
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

     onRowSelect = (row) => {
       var abcd = [];
       for(const prop in row){
         abcd.push(row[prop]);

         }

         this.setState({
           modalIsOpen: true,
           Event_id: abcd[2],
           TravelPlan_id: abcd[3],


         })



         this.openModal(row,abcd);

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
        onSelect: this.onRowSelect

      }

        return (
            this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
            <Backend>
            <div className= "content-inner-mobilefix">
            <div className="content-side-wrapper">


            <div className="container" style={{marginTop:20}}>
            <h3> Congrats! Here are your approved travel authorization requests. </h3>

            <br />
            <p> <b> * Click on a record to view approval details </b></p>
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

              <TableHeaderColumn dataField="nss_program" filter={{type: 'TextFilter', delay:1000}} width="150">
                  Travel Plan Program
              </TableHeaderColumn>
              <TableHeaderColumn isKey dataField="Travel_Auth_no" filter={{type: 'TextFilter', delay:1000}} width="150">
                  Travel_Auth_No
              </TableHeaderColumn>
              <TableHeaderColumn dataField="Event_id" filter={{type: 'TextFilter', delay:1000}} width="100">
                  Event Id
              </TableHeaderColumn>
              <TableHeaderColumn dataField="event_name" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Event Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="event_start_date" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Event Start Date
              </TableHeaderColumn>
              <TableHeaderColumn dataField="status1" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Travel Authorization Status
              </TableHeaderColumn>

              <Modal
              open={this.state.modalIsOpen}
              onClose={this.closeModal}
              center
              >
              <br />
              <p> <b> Here are your budget details for "get the event name" event </b> </p>
              <br />
              <BootstrapTable
              data={this.state.items_data}
              hover
              striped
              responsive
              exportCSV
              csvFileName="authorized_plan.csv"
              height='350'


              scrollTop={'Bottom'}



              >
              <TableHeaderColumn isKey dataField="Request_Form_No" filter={{type: 'TextFilter', delay:1000}} width="200">
                  Budget Item Name
              </TableHeaderColumn>

              <TableHeaderColumn dataField="VSY_IndexNo" filter={{type: 'TextFilter', delay:1000}} width="100">
                  Approved Amount
              </TableHeaderColumn>
              </BootstrapTable>

              </Modal>






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
