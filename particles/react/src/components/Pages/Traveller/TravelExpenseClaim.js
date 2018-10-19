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
import FileUpload from "./FileUpload";
import Modal from "react-responsive-modal";

class TravelExpenseClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {

      data: [],
      items_data: [],
      Invoice_No:"I-" + Math.floor(Math.random() * 10000000 + 1),
      VSY_IndexNo: localStorage.getItem('VSY_IndexNo'),
      TravelPlan_id: localStorage.getItem('TravelPlan_id'),
      Event_id: localStorage.getItem('Event_id'),
      Travel_Auth_No: localStorage.getItem('Travel_Auth_No'),
      expense_incurred: "",
      coordinator_approval: "",
      final_approval: "",
      claims_doc: localStorage.getItem('imageURL'),




    };

    this.openModal = this.openModal.bind(this);
    this.logChange = this.logChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAddItemEdit = this.handleAddItemEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.open_error_modal = this.open_error_modal.bind(this);
    this.close_error_modal = this.close_error_modal.bind(this);
    this.open_redirecting_modal = this.open_redirecting_modal.bind(this);
    this.close_redirecting_modal = this.close_redirecting_modal.bind(this);


  }


  openModal(row,abcd) {

    this.setState({
      modalIsOpen: true,
      Item_id: abcd[0],
      Budget_id: abcd[1],
      VSY_IndexNo: abcd[3],
      Event_id: abcd[4],
      TravelPlan_id: abcd[2],
      item_name: abcd[5],
      amount: abcd[6],
      requested_amount: abcd[7],
      expense_claimed_amount: abcd[8]


    });

  }

  open_redirecting_modal(){
    this.setState({
      redirecting_to_approval_modalIsOpen: true

    })

  }

  close_redirecting_modal(){
    this.setState({
      redirecting_to_approval_modalIsOpen: false
    })
  }


  open_error_modal(){
    this.setState({
      error_modalIsOpen: true

    })
  }




  componentDidMount() {
    let self = this;
    fetch("/users/travelexpenseclaim/view/" + this.state.VSY_IndexNo, {
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
      .then (function(){

        fetch("/users/items/view/" + self.state.VSY_IndexNo + "/" + self.state.TravelPlan_id + "/" + self.state.Event_id, {
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
          .then(console.log(localStorage.getItem('VSY_IndexNo')));

      })
      }


      openAddModal(){
        this.setState({
          addModalIsOpen: true,
          Item_id: "I-" + Math.floor(Math.random() * 10000000 + 1),
          Budget_id: this.state.Budget_id,
          TravelPlan_id:this.state.TravelPlan_id,
          VSY_IndexNo: this.state.VSY_IndexNo,
          item_name: "",
          amount: 0,
          requested_amount: "",
          comment: "Added by traveller",
          reasoning: ""

        })
      }

      closeAddModal(){
        this.setState({
          addModalIsOpen: false
        });
      }


      close_error_modal(){
        this.setState({
          error_modalIsOpen: false
        });
      }



      closeModal() {
        this.setState({
          modalIsOpen: false
        });
      }






  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };





  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value //setting value edited by the admin in state.
    });
  }

  handleEdit(event) {
    //Edit functionality
    console.log("Successful");
    console.log(this.state);
    event.preventDefault();

    var data = {
      Item_id: this.state.Item_id,
      expense_claimed_amount: this.state.expense_claimed_amount,

    };
    var self = this;



    fetch("/users/items/edit/expense_claimed_amount", {
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

          })


        }
      })
      .then(console.log(self.state.data))

      .then (function() {

        fetch("/users/items/view/" + self.state.VSY_IndexNo, {
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
          .then(console.log(localStorage.getItem('VSY_IndexNo')));

      })

      .then(function(){
        self.setState({modalIsOpen: false})
      })

      .catch(function(err) {
        console.log(err);
      });



  }


  handleAddItemEdit(event) {
    event.preventDefault();
    var data = {
      Item_id: this.state.Item_id,
      Budget_id: this.state.Budget_id,
      TravelPlan_id: this.state.TravelPlan_id,
      VSY_IndexNo: this.state.VSY_IndexNo,
      Event_id: this.state.Event_id,
      item_name: this.state.item_name,
      amount: this.state.amount,
      requested_amount: this.state.requested_amount,
      comment: this.state.comment,
      reasoning: this.state.reasoning,
      check_posted: "YES"
    }
    var self = this;
    fetch("/users/items/new", {
      method: "POST",
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
            msg: "Item has been inserted."

          });
        }
      })
      .then (function() {

        fetch("/users/items/view/" + self.state.VSY_IndexNo, {
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
          .then(console.log(localStorage.getItem('VSY_IndexNo')));

      })
      .then(function(){
        self.setState({addModalIsOpen: false})
      })
      // .then(function(){
      //   window.location.reload()
      // })
      .catch(function(err) {
        console.log(err);
      });



  }

  onRowSelect = (row) => {
    var abcd = [];
    for(const prop in row){
      abcd.push(row[prop]);

      }

      this.openModal(row,abcd);


    }




  onSubmit = e => {
  e.preventDefault();

  this.open_redirecting_modal();


  }


  modal_submit = e => {
  e.preventDefault();
  var self = this;


      var insert_data = {
        Invoice_No: this.state.Invoice_No,
        VSY_IndexNo: this.state.VSY_IndexNo,
        TravelPlan_id: this.state.TravelPlan_id,
        Event_id: this.state.Event_id,
        Travel_Auth_No: this.state.Travel_Auth_No,
        coordinator_approval: this.state.coordinator_approval,
        final_approval: this.state.final_approval,
        claims_doc: this.state.claims_doc
      };
      console.log(insert_data);

      var change_data = {
        Travel_Auth_No: this.state.Travel_Auth_No,
        status3: "CLAIMED"
      }




      fetch("users/travelexpenseclaim/new", {
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
        fetch("/users/auth_travelexpensestatus/change/edit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(change_data)
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

              })


            }
          })
      })
      .then (
        self.props.history.push('/approvedtravelplan',self.state)
      );




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



      <div className= "content-inner">
      <div className="content-side-wrapper">
      <h3> Travel Expense Claim Budget</h3>
      <p><b>* Please fill up the Expense Claimed Amount with your original expenditures </b></p>
      <BootstrapTable
        data={this.state.items_data}
        hover
        striped
        responsive
        exportCSV
        csvFileName="data.csv"
        selectRow={selectRowProp}
        height='350'
        scrollTop={'Bottom'}
      >
      <TableHeaderColumn isKey dataField="VSY_IndexNo" filter={{type: 'TextFilter', delay:1000}} width="100">
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
          amount
      </TableHeaderColumn>
      <TableHeaderColumn dataField="requested_amount" filter={{type: 'TextFilter', delay:1000}} width="200">
         Requested Amount
      </TableHeaderColumn>
      <TableHeaderColumn dataField="expense_claimed_amount" filter={{type: 'TextFilter', delay:1000}} width="200">
         Expense Claimed
      </TableHeaderColumn>
      <TableHeaderColumn dataField="reasoning" filter={{type: 'TextFilter', delay:1000}} width="300">
         Reasoning
      </TableHeaderColumn>



      <Modal
             open={this.state.modalIsOpen}
             onClose={this.closeModal}
             center
           >
             <form onSubmit={this.handleEdit}>

             <label>
               Budget Id:
               <input
                 type="text"
                 value={this.state.Budget_id}
                 className="form-control"
                 name="Budget_id"
               />
             </label>

             <label>
               Item Id:
               <input
                 type="text"
                 value={this.state.Item_id}
                 className="form-control"
                 name="Item_id"
               />
             </label>

               <label>
                 TravelPlan_id:
                 <input
                   type="text"
                   value={this.state.TravelPlan_id}
                   className="form-control"
                   name="TravelPlan_id"

                 />
               </label>
               <label>
                 VSY_IndexNo:
                 <input
                   type="text"
                   value={this.state.VSY_IndexNo}
                   className="form-control"

                   name="VSY_IndexNo"

                 />
               </label>
               <label>
                 Event Id:
                 <input
                   type="text"
                   value={this.state.Event_id}
                   className="form-control"
                   name="Event_id"

                 />
               </label>

               <label>
                 Item Name:
                 <input
                   type="text"

                   value={this.state.item_name}
                   className="form-control"
                   name="item_name"
                 />
               </label>

               <label>
                 Amount:
                 <input
                   type="text"
                   value={this.state.amount}
                   className="form-control"
                   name="amount"
                 />
                </label>

                <label>
                  Requested Amount:
                  <input
                    type="text"

                    value={this.state.requested_amount}
                    className="form-control"
                    name="requested_amount"
                  />
                 </label>
                 <label>
                 Expense Claimed Amount:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.expense_claimed_amount}
                     className="form-control"
                     name="expense_claimed_amount"
                   />
                  </label>


                 <p><b>* Please ensure the values are correct, changes cannot be made once submitted</b></p>
               <div className="submit-section">
                 <button>Submit</button>
               </div>
             </form>
           </Modal>


           <Modal
                  open={this.state.addModalIsOpen}
                  onClose={this.closeAddModal}
                  center
                >
                  <form onSubmit={this.handleAddItemEdit}>

                  <label>
                    Item_id:
                    <input
                      type="text"
                      value={this.state.Item_id}
                      className="form-control"
                      name="Item_id"

                    />
                  </label>
                    <label>
                      Budget_id:
                      <input
                        type="text"
                        value={this.state.Budget_id}
                        className="form-control"
                         onChange={this.logChange}
                        name="Budget_id"

                      />
                    </label>
                    <label>
                      TravelPlan_id:
                      <input
                        type="text"
                        value={this.state.TravelPlan_id}
                        className="form-control"
                         onChange={this.logChange}
                        name="TravelPlan_id"

                      />
                    </label>
                    <label>
                      VSY_IndexNo:
                      <input
                        type="text"
                        value={this.state.VSY_IndexNo}
                        className="form-control"
                       onChange={this.logChange}
                        name="VSY_IndexNo"

                      />
                    </label>
                    <label>
                      Event Id:
                      <input
                        type="text"
                        value={this.state.Event_id}
                        className="form-control"
                       onChange={this.logChange}
                        name="Event_id"

                      />
                    </label>

                    <label>
                      Item Name:
                      <select
                        type="text"
                        onChange={this.logChange}
                        value={this.state.item_name}
                        className="form-control"
                        name="item_name">
                        <option value="PerDiem"> PerDiem </option>
                        <option value="AccomodationCost"> Accomodation Cost </option>
                        <option value="Airfare"> AirFare </option>
                        <option value="Car_rental"> Car Rental </option>
                        <option value="Cellphone"> Cellphone </option>



                      </select>
                    </label>

                    <label>
                      Amount:
                      <input
                        type="text"
                        value={this.state.amount}
                        className="form-control"
                        name="amount"
                      />
                     </label>

                     <label>
                       Requested Amount:
                       <input
                         type="text"
                         onChange={this.logChange}
                         value={this.state.requested_amount}
                         className="form-control"
                         name="requested_amount"
                       />
                     </label>

                     <label>
                       Reasoning:
                       <input
                         type="text"
                         onChange={this.logChange}
                         value={this.state.reasoning}
                         className="form-control"
                         name="reasoning"
                       />
                     </label>

                     <p><b>* Please re-check, changes cannot be made once submitted</b></p>


                    <div className="submit-section">
                      <button>Submit</button>
                    </div>
                  </form>
                </Modal>


                <Modal
                open={this.state.error_modalIsOpen}
                onClose={this.close_error_modal}
                center
                >
                <br />
                <div><p>You have already requested for this item. Please wait for approval. If you need to make changes please email coordinator.</p></div>
                </Modal>


    </BootstrapTable>



    <br />
    <br />




          <FileUpload/>
          <br />
          <br />



      <br />
      <br />
      <br />


      <div>

      <div className="container" style={{marginTop:20}}>
      <h3>Expense Claim Table</h3>
      <br/>
        <BootstrapTable
          data={this.state.data}
          hover
          striped
          responsive
          exportCSV
          csvFileName="data.csv"
        >
        <TableHeaderColumn isKey dataField="Invoice_No" width="300">
            InvoiceNo
        </TableHeaderColumn>
        <TableHeaderColumn dataField="Travel_Auth_No" width="300">
            Travel Auth No
        </TableHeaderColumn>
        <TableHeaderColumn dataField="VSY_IndexNo" width="300">
           VSY_IndexNo
        </TableHeaderColumn>
        <TableHeaderColumn dataField="TravelPlan_id" width="300">
            Travel Plan Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="Event_id" width="300">
            Event Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="expense_incurred" width="300">
            Expense Incurred
        </TableHeaderColumn>
        <TableHeaderColumn dataField="coordinator_approval" width="300">
            Coordinator Approval
        </TableHeaderColumn>
        <TableHeaderColumn dataField="final_approval" width="300">
            Final Approval
        </TableHeaderColumn>

        <Modal
        open={this.state.redirecting_to_approval_modalIsOpen}
        onClose={this.close_redirecting_modal}
        center
        >
        <br />
        <div><p>Great, you have submitted a Travel Expense Claim request for this event! Click "Ok" to check your request status.</p></div>
        <br />
        <br />
        <button  type= "submit" onClick= {e => this.modal_submit(e)} >
        <a href= '/approvedtravelplan' class="text-muted"> OK </a>
        </button>

        </Modal>

      </BootstrapTable>
      <br />
      <br />
      <br />

      <button class="button_submit button_item" onClick={e => this.onSubmit(e)}> Save and Submit </button>
        </div>
        </div>


        </div>
        </div>

      </Backend>
            );
          }

        }






TravelExpenseClaim.propTypes = {
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
})(TravelExpenseClaim)
