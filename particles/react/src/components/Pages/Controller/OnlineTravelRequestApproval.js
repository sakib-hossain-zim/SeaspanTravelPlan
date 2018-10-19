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

class OnlineTravelRequestApproval extends Component {

    constructor(props) {
    super(props);
    this.state = {
      insert_data: [],
      data: [],
      otr_data: [],
      Request_Form_No: localStorage.getItem("Coordinator_OnlineTravelRequestFormNo"),
      VSY_IndexNo: localStorage.getItem("Coordinator_VSY_IndexNo"),
      TravelPlan_id: localStorage.getItem("Coordinator_TravelPlan_id"),
      Event_id: localStorage.getItem("Coordinator_Event_id"),
      request_date: "",
      Item_id: "",
      Budget_id: "",
      item_name: "",
      amount: "",
      requested_amount: "",
      approved_amount: "",
      comment: "",
      reasoning: "",
      status: "APPROVED",
      note_from_coordinator: "",


      Travel_Auth_No: "",
      status1: "",
      status2_bool: "No",
      status3: "",
      notes: "",

      modalIsOpen: false,
      modal_redirectIsOpen: false


    };

    this.openModal = this.openModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handle_edit_auth = this.handle_edit_auth.bind(this);
    this.logChange = this.logChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeredirectModal = this.closeredirectModal.bind(this);

  }


  componentDidMount() {
    let self = this;

    fetch("/users/items_otr/view/" + this.state.VSY_IndexNo + "/" + this.state.Event_id + "/" + this.state.TravelPlan_id, {
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

      }

  handleEdit(event) {
    //Edit functionality
    console.log("Successful");
    console.log(this.state);
    event.preventDefault();
    var data = {
      Item_id: this.state.Item_id,
      approved_amount: this.state.approved_amount,
      note_from_coordinator: this.state.note_from_coordinator
    };

    var self = this;
    fetch("/users/items/edit_approved_amountandnotes", {
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
        fetch("/users/items_otr/view/" + self.state.VSY_IndexNo + "/" + self.state.Event_id + "/" + self.state.TravelPlan_id, {
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
      status: this.state.status
    }

    var auth_data = {
     Travel_Auth_No: "Auth-" + Math.floor(Math.random() * 10000000 + 1),
     Request_Form_No: this.state.Request_Form_No,
     status1: "APPROVED",
     status2: this.state.status2,
     notes: this.state.notes
    }
    var self = this;


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
        .then( function(){
          fetch("/users/otr/edit_status", {
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
                self.setState({
                  msg: "User has been edited."
                });
              }
            })
        })
        .then(function(){
          self.setState({modal_redirectIsOpen: true})
        })

        .catch(function(err) {
          console.log(err);
        })
        .then(function(){console.log(self.state.otr_data)})
        .then(function(){
          console.log(self.state.Request_Form_No);
        })
  }



     closeModal() {
       this.setState({
         modalIsOpen: false
       });
     }

     closeredirectModal(){
       this.setState({
         modal_redirectIsOpen: false
       });
     }

     openModal(row,abcd) {

       this.setState({
         Item_id: abcd[5],
         item_name: abcd[6],
         amount: abcd[7],
         requested_amount: abcd[8],
         modalIsOpen: true,
       });

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
            <p> <b> * Click on rows to insert Approved Amount </b></p>
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

              <TableHeaderColumn isKey dataField="Request_Form_No" filter={{type: 'TextFilter', delay:1000}} width="125">
                  Request <br /> Form No
              </TableHeaderColumn>
              <TableHeaderColumn dataField="event_name" filter={{type: 'TextFilter', delay:1000}} width="230">
                  Event Name <br /> <p></p>
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name" filter={{type: 'TextFilter', delay:1000}} width="230">
                  Traveller Name <br /> <p></p>
              </TableHeaderColumn>
              <TableHeaderColumn dataField="Item_id" filter={{type: 'TextFilter', delay:1000}} width="100">
                  Item Id <br /> <p></p>
              </TableHeaderColumn>
              <TableHeaderColumn dataField="item_name" filter={{type: 'TextFilter', delay:1000}} width="125">
                  Item Name <br /> <p> </p>
              </TableHeaderColumn>
              <TableHeaderColumn dataField="amount" filter={{type: 'TextFilter', delay:1000}} width="90">
                  Budgeted <br /> Amount
              </TableHeaderColumn>
              <TableHeaderColumn dataField="requested_amount" filter={{type: 'TextFilter', delay:1000}} width="90">
                 Requested <br /> Amount
              </TableHeaderColumn>
              <TableHeaderColumn dataField="approved_amount" filter={{type: 'TextFilter', delay:1000}} width="90">
                 Approved <br /> Amount
              </TableHeaderColumn>
              <TableHeaderColumn dataField="reasoning" filter={{type: 'TextFilter', delay:1000}} width="200">
                 Traveller's Reason <br /> <p></p>
              </TableHeaderColumn>
              <TableHeaderColumn dataField="note_from_coordinator" filter={{type: 'TextFilter', delay:1000}} width="300">
                 Note from coordinator <br /> <p></p>
              </TableHeaderColumn>

              <Modal
                     open={this.state.modalIsOpen}
                     onClose={this.closeModal}
                     center
                   >
                   <p> <b>{this.state.item_name}</b> </p>
                   <p> <b> The budgeted amount for this item is ${this.state.amount} and the requested amount is ${this.state.requested_amount}</b></p>
                   <p> <b> {this.state.reasoning} </b> </p>
                     <form onSubmit={this.handleEdit}>


                         <label>
                              Approved Amount:
                              <input
                                type="text"
                                onChange={this.logChange}
                                value={this.state.approved_amount}
                                className="form-control"
                                name="approved_amount"
                               />
                        </label>

                        <label>
                             Coordinator Notes:
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
            <br />
            <br />
            <button class="button_submit button_item" onClick={e => this.handle_edit_auth(e)}> Authorize </button>


            <Modal
              open={this.state.modal_redirectIsOpen}
              center
            >
            <br />


            <div><p>Budget has been created. Click "OK" to process other requests.</p></div>
            <br />
            <br />

            <button  type= "submit"  >
            <a href= '/onlinetravelrequestSelectionPage' class="text-muted"> OK </a>
            </button>

            </Modal>

            <br/>
            <br/>

            </div>



              </div>
              </div>

            </Backend>
        );
    }
}

OnlineTravelRequestApproval.propTypes = {
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
})(OnlineTravelRequestApproval)
