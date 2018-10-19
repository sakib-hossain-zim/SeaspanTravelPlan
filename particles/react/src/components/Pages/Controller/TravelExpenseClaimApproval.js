import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backend from './Layouts/Backend';
import { InfoboxProject } from './UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions';
import Loading from './Helpers/Loading';
import Box from './UI/Box';

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import Modal from "react-responsive-modal";

class TravelExpenseClaimApproval extends Component {

    constructor(props) {
    super(props);
    this.state = {
      insert_data: [],
      data: [],
      otr_data: [],
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


      Travel_Auth_No: "",
      status1: "",
      status2_bool: "No",
      status3: "",
      notes: "",

      modalIsOpen: false,
      modal_authIsOpen: false


    };

    this.openModal = this.openModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handle_edit_auth = this.handle_edit_auth.bind(this);
    this.logChange = this.logChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeAuthModal = this.closeAuthModal.bind(this);

  }


  componentDidMount() {
    let self = this;

    fetch("/users/itemsotr/view", {
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
      .then(function(){
        fetch("/users/otr/view", {
          method: "GET"
        })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad Response from server");
          }
          return response.json();
        })
        .then(function(otr_data) {
          self.setState({ otr_data: otr_data.otr_data });
        })
        .catch(err => {
          console.log("caught it !, err");
        })
      });

      }

  handleEdit(event) {
    //Edit functionality
    console.log("Successful");
    console.log(this.state);
    event.preventDefault();
    var data = {
      Item_id: this.state.Item_id,
      status: this.state.status,
      note_from_coordinator: this.state.note_from_coordinator
    };

    var self = this;
    fetch("/users/items/editStatusandnotes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        if (data === "success") {
          this.setState({
            msg: "User has been edited."
          });
        }
      })
      .then(function(){
        self.setState({modalIsOpen: false})
      })
      .then(function(){
        fetch("/users/itemsotr/view", {
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

      });

  }

  handle_edit_auth(event){
    event.preventDefault();


    var data = {
      Request_Form_No: this.state.Request_Form_No,
      status: "APPROVED"
    }

    var auth_data = {
     Travel_Auth_No: "Auth-" + Math.floor(Math.random() * 10000000 + 1),
     Request_Form_No: this.state.Request_Form_No,
     status1: this.state.status1,
     status2: this.state.status2,
     notes: this.state.notes
    }
    var self = this;

    fetch("/users/otr/otr_edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        if (data === "success") {
          this.setState({
            msg: "User has been edited."

          });
        }
      })
      .then(function() {
      fetch("/users/travel_auth/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(auth_data)
      })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(auth_data) {
          console.log(auth_data);
          if (auth_data === "success") {
            this.setState({
              msg: "Item has been inserted."

            });
          }
        })
        .then(function(){
          self.setState({modal_authIsOpen: false})
        })

        .catch(function(err) {
          console.log(err);
        })

      })
      .then(function(){
        fetch("/users/otr/view", {
          method: "GET"
        })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad Response from server");
          }
          return response.json();
        })
        .then(function(otr_data) {
          self.setState({ otr_data: otr_data.otr_data });
        })
        .catch(err => {
          console.log("caught it !, err");
        })
        .then(function(){console.log(self.state.otr_data)})
      });

  }



     closeModal() {
       this.setState({
         modalIsOpen: false
       });
     }

     closeAuthModal(){
       this.setState({
         modal_authIsOpen: false
       });
     }

     openModal(row,abcd) {

       this.setState({
         modalIsOpen: true,
         Request_Form_No: abcd[0],
         Item_id: abcd[5],
         Budget_id: abcd[4],
         VSY_IndexNo: abcd[1],
         Event_id: abcd[2],
         TravelPlan_id: abcd[3],
         item_name: abcd[6],
         amount: abcd[7],
         requested_amount:abcd[8],
         status: abcd[9],
         comment: abcd[10],
         reasoning: abcd[11],
         note_from_coordinator: abcd[12]


       });

     }


     openAuthModal(row,abcd) {

       this.setState({
         modal_authIsOpen: true,
         Request_Form_No: abcd[0],
         status1: "APPROVED"
       });

     }

     onRowSelect_auth = (row) => {
       var abcd = [];
       for(const prop in row){
         abcd.push(row[prop]);

         }
         this.openAuthModal(row,abcd);

       }


       onRowSelect = (row) => {
         var abcd = [];
         for(const prop in row){
           abcd.push(row[prop]);

           }
           this.openModal(row,abcd);

         }


      logChange(e) {
         this.setState({
           [e.target.name]: e.target.value //setting value edited by the admin in state.
             });
           }

    render() {

      const selectRowProp_otr = {
        mode:"checkbox",
        clickToSelect: true,
        onSelect: this.onRowSelect_auth
      }

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
                csvFileName="data.csv"
                selectRow={selectRowProp}
                height='350'
                scrollTop={'Bottom'}
              >

              <TableHeaderColumn isKey dataField="Request_Form_No" filter={{type: 'TextFilter', delay:1000}} width="300">
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



              <Modal
                     open={this.state.modalIsOpen}
                     onClose={this.closeModal}
                     center
                   >
                     <form onSubmit={this.handleEdit}>


                         <label>
                              Status:
                              <select
                                type="text"
                                onChange={this.logChange}
                                value={this.state.status}
                                className="form-control"
                                name="status">
                                <option value="Approved"> Pending </option>
                                <option value="Approved"> Approved </option>
                                <option value="Rejected"> Rejected </option>

                              </select>
                        </label>

                        <label>
                             Notes:
                                 <input
                                   type="text"
                                   onChange={this.logChange}
                                   value={this.state.note_from_coordinator}
                                   className="form-control"
                                   name="note_from_coordinator"
                                 />
                       </label>

                       <div className="submit-section">
                         <button>Submit</button>
                       </div>
                     </form>
                   </Modal>


            </BootstrapTable>
            </div>
            <br/>
            <br/>


            <h3> Request Approval </h3>
            <br />
            <p> <b> * Click on specific row to authorize a online travel request</b></p>
            <br />
            <div className="container" style={{marginTop:20}}>
              <BootstrapTable
                data={this.state.otr_data}
                hover
                striped
                responsive
                exportCSV
                csvFileName="data.csv"
                selectRow={selectRowProp_otr}
                height='350'
                scrollTop={'Bottom'}
              >

              <TableHeaderColumn isKey dataField="Request_Form_No" filter={{type: 'TextFilter', delay:1000}} width="600">
                 Request Form No
              </TableHeaderColumn>
              <TableHeaderColumn dataField="status" filter={{type: 'TextFilter', delay:1000}} width="600">
                 Status
              </TableHeaderColumn>

              <Modal
                     open={this.state.modal_authIsOpen}
                     onClose={this.closeAuthModal}
                     center
                   >
                     <form onSubmit={this.handle_edit_auth}>


                        <label>
                              Request_Form_No:
                              <input
                                type="text"
                                value={this.state.Request_Form_No}
                                className="form-control"
                                name="Request_Form_No"
                              />
                        </label>


                         <label>
                              Status:
                              <input
                                type="text"
                                value= {this.state.status1}
                                className="form-control"
                              />
                        </label>

                        <label>
                             Notes:
                                 <input
                                   type="text"
                                   onChange={this.logChange}
                                   value={this.state.notes}
                                   className="form-control"
                                   name="notes"
                                 />
                       </label>

                       <div className="submit-section">
                         <button>Authorize</button>
                       </div>
                     </form>
                   </Modal>


              </BootstrapTable>
              </div>



              </div>
              </div>

            </Backend>
        );
    }
}

TravelExpenseClaimApproval.propTypes = {
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
})(TravelExpenseClaimApproval)
