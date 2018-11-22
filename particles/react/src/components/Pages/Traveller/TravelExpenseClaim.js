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
      sub_items_data: [],
      Invoice_No:"I-" + Math.floor(Math.random() * 10000000 + 1),
      VSY_IndexNo: localStorage.getItem('VSY_IndexNo'),
      TravelPlan_id: localStorage.getItem('TravelPlan_id'),
      Event_id: localStorage.getItem('Event_id'),
      Travel_Auth_No: localStorage.getItem('Travel_Auth_No'),
      expense_incurred: "",
      coordinator_approval: "",
      final_approval: "",
      claims_doc: localStorage.getItem('imageURL'),
      event_start_date: localStorage.getItem('TravelExpenseSelection_EventStartDate'),
      event_end_date: localStorage.getItem('TravelExpenseSelection_EventEndDate'),
      travel_end_date: localStorage.getItem('TravelExpenseSelection_TravelEndDate'),
      travel_start_date: localStorage.getItem('TravelExpenseSelection_TravelStartDate'),
      traveller_name: localStorage.getItem('TravelExpenseSelection_TravellerName'),
      event_name: localStorage.getItem('TravelExpenseSelection_EventName'),
      approved_amount: "",
      modalIsOpen: false,
      handleViewModalIsOpen: false,
      handleSubItemAdditionModalIsOpen: false,
      handleSubItemAdditionModalForSubIsOpen: false,
      Sub_Item_id: "SubItem-" + Math.floor(Math.random() * 10000000 + 1),
      sub_item_name: "",
      expenseclaimamount: "",
      coordinator_approved_amount: "",
      subitem_description: "",
      receiptNo: "",
      receiptDate: "",
      amountTotal: "",
      currency: "",
      exchangeRate: "",
      amountGST: "",
      amountNet: "",
      amountPayable: "",
      attachment_url: "",
      note_from_coordinator: "",
      category_GSTHST_treatment: localStorage.getItem('CategoryGSTHST')





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
    this.handleView = this.handleView.bind(this);
    this.handlesubItemAddition = this. handlesubItemAddition.bind(this);
    this.close_handleView_modal = this.close_handleView_modal.bind(this);
    this.close_handlesubItemAddition_modal = this.close_handlesubItemAddition_modal.bind(this);
    this.close_handlesubItemAdditionForSub_modal = this.close_handlesubItemAdditionForSub_modal.bind(this);
    this.handleSubmitSubItemAddition = this.handleSubmitSubItemAddition.bind(this);



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
      expense_claimed_amount: abcd[8],
      approved_amount:abcd[9],
      note_from_coordinator: abcd[13],



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
          .then(console.log(self.state.category_GSTHST_treatment))


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

      close_handleView_modal() {
        this.setState({
          handleViewModalIsOpen: false
        });
      }

      close_handlesubItemAddition_modal() {
        this.setState({
          handleSubItemAdditionModalIsOpen: false
        });
      }
      close_handlesubItemAdditionForSub_modal() {
        this.setState({
          handleSubItemAdditionModalForSubIsOpen: false
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

  openHandleViewModal(){


    var self = this;

    fetch("/users/sub_items_data/" + this.state.Item_id, {
      method:"GET"
    })
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad Response from server");
      }
      return response.json();
    })
    .then(function(data) {
      self.setState({ sub_items_data: data.data });
    })
    .then(function(){
      console.log("reached here")
    })
    .then(function(){
        self.setState({handleViewModalIsOpen: true});
    })
    .catch(err => {
      console.log("caught it !, err");
    })
  }

  handleView = e => {

    e.preventDefault();
    this.setState({modalIsOpen: false});

    this.openHandleViewModal();


    }

    openHandleSubItemAdditionModal(){
      this.setState({
        handleSubItemAdditionModalIsOpen: true,
      })
    }

    openHandleSubItemAdditionForSubModal(){
      this.setState({
        handleSubItemAdditionModalForSubIsOpen: true,
      })
    }



  handlesubItemAddition = e => {
    e.preventDefault();
    this.setState({modalIsOpen: false});

    if(this.state.category_GSTHST_treatment === "seaspan-external"){

        this.openHandleSubItemAdditionForSubModal();
        console.log("right one opened")
    }
    else {

      this.openHandleSubItemAdditionModal();
      console.log("wrong one opened")
    }

  }


  handleSubmitSubItemAddition(event){
    let net_amount = ( this.state.amountTotal * this.state.exchangeRate) - this.state.amountGST;
    let amount_payable = this.state.amountTotal * this.state.exchangeRate;
    var data = {
      Sub_Item_id: this.state.Sub_Item_id,
      Item_id: this.state.Item_id,
      sub_item_name: this.state.sub_item_name,
      subitem_description: this.state.subitem_description,
      receiptNo: this.state.receiptNo,
      receiptDate: this.state.receiptDate,
      amountTotal: this.state.amountTotal,
      currency: this.state.currency,
      exchangeRate: this.state.exchangeRate,
      amountGST: this.state.amountGST,
      amountNet: net_amount,
      amountPayable: amount_payable,

    }
    var self = this;
    fetch("/users/submit_subItem/new", {
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
      .then(function(){
        this.setState({handleSubItemAdditionModalIsOpen: false})
      })

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


    dateDiffInDays(a , b){
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1;
  }


  open_redirecting_modal(){
    this.setState({
      redirecting_to_approval_modalIsOpen: true

    })

  }


  saveandsubmit = e => {
    this.open_redirecting_modal();

  }

  on_request_submit = e => {
    e.preventDefault();
    var self = this;

    var today= new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10){
      dd= '0'+dd
    }
    if(mm<10){
      mm = '0'+ mm
    }

    today = mm + '/'+dd+'/'+yyyy;
    var today_date = today.toString();

    console.log(today);



        var insert_data = {
          Invoice_No: this.state.Invoice_No,
          Travel_Auth_No: this.state.Travel_Auth_No,
          VSY_IndexNo: this.state.VSY_IndexNo,
          TravelPlan_id: this.state.TravelPlan_id,
          Event_id: this.state.Event_id,
          coordinator_approval: "PENDING",
          final_approval: "PENDING",
          claims_date: today_date




        };
        console.log(insert_data);

        var change_data = {
          Event_id: this.state.Event_id,
          VSY_IndexNo: this.state.VSY_IndexNo,
          travel_expense_claim_status: "REQUESTED"
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
          fetch("/users/traveller_event/expense_claim/change/edit", {
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

    var net_amount = (this.state.amountTotal * this.state.exchangeRate) - this.state.amountGST;
    var amount_payable = this.state.amountTotal * this.state.exchangeRate;

    var date1 = new Date(this.state.travel_start_date);
    console.log(this.state.travel_start_date)
    console.log(date1);
    var date2 = new Date(this.state.travel_end_date);
    var diffDays = this.dateDiffInDays(date1,date2);



    var today= new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10){
      dd= '0'+dd
    }
    if(mm<10){
      mm = '0'+ mm
    }

    today = mm + '/'+dd+'/'+yyyy;
    var today_date = today.toString();

    return (
      this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
      <Backend>



      <div className= "content-inner">
      <div className="content-side-wrapper">
      <h3> Travel Expense Claim Budget</h3>
      <MuiThemeProvider>
      <div className="container">
      <form>
        <TextField
          name="Request_Form_No"
          floatingLabelText="Travel Expense Claim Number"
          value={this.state.Invoice_No}
          floatingLabelFixed
        />
        <TextField
          name="request_date"
          hintText="Please insert date"
          floatingLabelText="request_date"
          value= {today_date}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="VSY_IndexNo"
          hintText="Traveller ID No"
          floatingLabelText="Traveller ID No."
          value={this.state.VSY_IndexNo}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <TextField
          name="name"
          hintText="Please insert name"
          floatingLabelText="Traveller Name"
          value={this.state.traveller_name}
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

        <TextField
          name="Travel Program"
          hintText="Please insert Travel Program"
          floatingLabelText="Travel Program"
          value= "JSS"
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />


        <TextField
          name="Event_id"
          hintText="Please insert Travel Program"
          floatingLabelText="Event_id"
          value={this.state.Event_id}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <TextField
          name="Event Name"
          hintText="Please insert Event Name"
          floatingLabelText="Event Name"
          value= {this.state.event_name}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />

        <TextField
          name="Event_start_date"
          hintText="Please insert Travel Program"
          floatingLabelText="Event Start Date"
          value= {this.state.event_start_date}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <TextField
          name="Event Name"
          hintText="Please insert Event Name"
          floatingLabelText="Event End Date"
          value= {this.state.event_end_date}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="travel_start_date"
          hintText="Please"
          floatingLabelText="Travel Start Date"
          value= {this.state.travel_start_date}
          floatingLabelFixed
        />

        <TextField
          name="Event Name"
          hintText="Please insert Event Name"
          floatingLabelText="Travel End Date"
          value= {this.state.travel_end_date}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="Duration"
          hintText="Please insert Event Name"
          floatingLabelText="Travel Status Days"
          value= {diffDays}

          floatingLabelFixed
        />
        <TextField
          name="Traveller Type"
          hintText="Please insert Event Name"
          floatingLabelText="Traveller Type"
          value= {this.state.category_GSTHST_treatment}

          floatingLabelFixed
        />
      </form>
      </div>

      </MuiThemeProvider>
      <p><b>* Please fill up the Expense Claimed Amount with your original expenditures </b></p>
      <div style={{width: 1000,
                padding: 10,
                border: 5,
                margin: 0}}
                >
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
      <TableHeaderColumn dataField="Budget_id" filter={{type: 'TextFilter', delay:1000}} width="200">
          Assigned Budget Id
      </TableHeaderColumn>
      <TableHeaderColumn isKey dataField="Item_id" filter={{type: 'TextFilter', delay:1000}} width="100">
          Item Id
      </TableHeaderColumn>
      <TableHeaderColumn dataField="item_name" filter={{type: 'TextFilter', delay:1000}} width="200">
          Item Name
      </TableHeaderColumn>
      <TableHeaderColumn dataField="approved_amount" filter={{type: 'TextFilter', delay:1000}} width="200">
         Approved Amount
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
           <p> <b> Claim {this.state.item_name} Expense </b> </p>

             <form>

               <label>
                 Approved Amount:
                 <input
                   type="text"
                   value={this.state.approved_amount}
                   className="form-control"
                   name="approved_amount"

                 />
               </label>
               <label>
                 Coordinator Note:
                 <input
                   type="text"
                   value={this.state.note_from_coordinator}
                   className="form-control"
                   name="note_from_coordinator"

                 />
               </label>
             </form>

               <button onClick= {e => this.handlesubItemAddition(e)}>Submit Claim Item</button>
                 <button onClick = {e => this.handleView(e)}>View Submitted Claim Items</button>
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




                <Modal
                open={this.state.handleViewModalIsOpen}
                onClose={this.close_handleView_modal}
                center
                >
                <div style={{width: 700,
                          padding: 10,
                          border: 5,
                          margin: 0}}
                          >
                <BootstrapTable
                  data={this.state.sub_items_data}
                  hover
                  striped
                  responsive
                  exportCSV
                  csvFileName="data.csv"
                  selectRow={selectRowProp}
                  height='350'
                  scrollTop={'Bottom'}
                >
                <TableHeaderColumn isKey dataField="Sub_Item_id" filter={{type: 'TextFilter', delay:1000}} width="150">
                    SubItem ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="Item_id" filter={{type: 'TextFilter', delay:1000}} width="150">
                    Item ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="sub_item_name" filter={{type: 'TextFilter', delay:1000}} width="150">
                    Sub Item Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="expensedclaimedamount" filter={{type: 'TextFilter', delay:1000}} width="150">
                    Expensed Claimed Amount
                </TableHeaderColumn>
                <TableHeaderColumn dataField="subitem_description" filter={{type: 'TextFilter', delay:1000}} width="150">
                    SubItem Description
                </TableHeaderColumn>
                <TableHeaderColumn dataField="receiptNo" filter={{type: 'TextFilter', delay:1000}} width="150">
                    Receipt No
                </TableHeaderColumn>
                <TableHeaderColumn dataField="receiptDate" filter={{type: 'TextFilter', delay:1000}} width="150">
                    Receipt date
                </TableHeaderColumn>
                <TableHeaderColumn dataField="amountTotal" filter={{type: 'TextFilter', delay:1000}} width="150">
                    Amount Total
                </TableHeaderColumn>
                <TableHeaderColumn dataField="currency" filter={{type: 'TextFilter', delay:1000}} width="150">
                    Currency
                </TableHeaderColumn>
                <TableHeaderColumn dataField="exchangeRate" filter={{type: 'TextFilter', delay:1000}} width="150">
                    Exchange Rate
                </TableHeaderColumn>
                <TableHeaderColumn dataField="amountGST" filter={{type: 'TextFilter', delay:1000}} width="150">
                    Amount GST/HST
                </TableHeaderColumn>
                <TableHeaderColumn dataField="amountNet" filter={{type: 'TextFilter', delay:1000}} width="150">
                    Net Amount
                </TableHeaderColumn>
                <TableHeaderColumn dataField="amountPayable" filter={{type: 'TextFilter', delay:1000}} width="150">
                    Amount Payable
                </TableHeaderColumn>
                </BootstrapTable>
                </div>

                </Modal>

                <Modal
                       open={this.state.handleSubItemAdditionModalIsOpen}
                       onClose={this.close_handlesubItemAddition_modal}
                       center
                     >
                     <br />
                     <br />
                     <br />
                     <br />
                  <h3>  You are submitting an Expense Claim for {this.state.item_name}. Enter the expense details in the fields below: </h3>
                  <br />
                  <br />
                       <form onSubmit={this.handleSubmitSubItemAddition}>

                       <label>
                         Item ID:
                         <input
                           type="text"
                           value={this.state.Item_id}
                           className="form-control"
                           name="Item_id"

                         />
                       </label>
                         <label>
                           Sub-Item ID:
                           <input
                             type="text"
                             value={this.state.Sub_Item_id}
                             className="form-control"
                              onChange={this.logChange}
                             name="Sub_Item_id"

                           />
                           </label>

                           <label>
                             Supplier Name:
                             <input
                               type="text"
                               value={this.state.sub_item_name}
                               className="form-control"
                                onChange={this.logChange}
                               name="sub_item_name"

                             />
                             </label>

                                 <label>
                                   Expense Description:
                                   <input
                                     type="text"
                                     value={this.state.subitem_description}
                                     className="form-control"
                                      onChange={this.logChange}
                                     name="subitem_description"

                                   />
                                   </label>
                                   <label>
                                     Receipt No:
                                     <input
                                       type="text"
                                       value={this.state.receiptNo}
                                       className="form-control"
                                        onChange={this.logChange}
                                       name="receiptNo"

                                     />
                                     </label>
                                     <label>
                                       Receipt Date:
                                       <input
                                         type="text"
                                         value={this.state.receiptDate}
                                         className="form-control"
                                          onChange={this.logChange}
                                         name="receiptDate"

                                       />
                                       </label>
                                       <label>
                                        Total Receipt Amount:
                                         <input
                                           type="text"
                                           value={this.state.amountTotal}
                                           className="form-control"
                                            onChange={this.logChange}
                                           name="amountTotal"

                                         />
                                         </label>
                                         <label>
                                           Currency:
                                           <input
                                             type="text"
                                             value={this.state.currency}
                                             className="form-control"
                                              onChange={this.logChange}
                                             name="currency"

                                           />
                                           </label>
                                           <label>
                                             Exchange Rate to CAD $:
                                             <input
                                               type="text"
                                               value={this.state.exchangeRate}
                                               className="form-control"
                                                onChange={this.logChange}
                                               name="exchangeRate"

                                             />
                                             </label>
                                             <label>
                                               Amount GST/HST:
                                               <input
                                                 type="text"
                                                 value={this.state.amountGST}
                                                 className="form-control"
                                                  onChange={this.logChange}
                                                 name="amountGST"

                                               />
                                               </label>
                                               <label>
                                                 Amount Net in CAD $:
                                                 <input
                                                   type="text"
                                                   value={net_amount}
                                                   className="form-control"
                                                    onChange={this.logChange}
                                                   name="amountNet"

                                                 />
                                                 </label>
                                                 <label>
                                                   Amount Payable in CAD $:
                                                   <input
                                                     type="text"
                                                     value={amount_payable}
                                                     className="form-control"
                                                      onChange={this.logChange}
                                                     name="amountPayable"

                                                   />
                                                   </label>
                                                   <div className="submit-section">
                                                     <button>Submit</button>
                                                   </div>
                                                   <br />
                                                   <div
                                                   style= {{width: 500,
                                                             padding: 10,
                                                             border: 5,
                                                             margin: 0}}
                                                   >
                                                   <FileUpload/>
                                                   </div>

                                                   </form>

                           </Modal>

                           <Modal
                                  open={this.state.handleSubItemAdditionModalForSubIsOpen}
                                  onClose={this.close_handlesubItemAdditionForSub_modal}
                                  center
                                >
                                <br />
                                <br />
                                <br />
                                <br />
                             <h3>  You are submitting an Expense Claim for {this.state.item_name}. Enter the expense details in the fields below: </h3>
                             <br />
                             <br />
                                  <form onSubmit={this.handleSubmitSubItemAddition}>

                                  <label>
                                    Item ID:
                                    <input
                                      type="text"
                                      value={this.state.Item_id}
                                      className="form-control"
                                      name="Item_id"

                                    />
                                  </label>
                                    <label>
                                      Sub-Item ID:
                                      <input
                                        type="text"
                                        value={this.state.Sub_Item_id}
                                        className="form-control"
                                         onChange={this.logChange}
                                        name="Sub_Item_id"

                                      />
                                      </label>

                                      <label>
                                        Supplier Name:
                                        <input
                                          type="text"
                                          value={this.state.sub_item_name}
                                          className="form-control"
                                           onChange={this.logChange}
                                          name="sub_item_name"

                                        />
                                        </label>

                                            <label>
                                              Expense Description:
                                              <input
                                                type="text"
                                                value={this.state.subitem_description}
                                                className="form-control"
                                                 onChange={this.logChange}
                                                name="subitem_description"

                                              />
                                              </label>
                                              <label>
                                                Receipt No:
                                                <input
                                                  type="text"
                                                  value={this.state.receiptNo}
                                                  className="form-control"
                                                   onChange={this.logChange}
                                                  name="receiptNo"

                                                />
                                                </label>
                                                <label>
                                                  Receipt Date:
                                                  <input
                                                    type="text"
                                                    value={this.state.receiptDate}
                                                    className="form-control"
                                                     onChange={this.logChange}
                                                    name="receiptDate"

                                                  />
                                                  </label>
                                                  <label>
                                                   Total Receipt Amount:
                                                    <input
                                                      type="text"
                                                      value={this.state.amountTotal}
                                                      className="form-control"
                                                       onChange={this.logChange}
                                                      name="amountTotal"

                                                    />
                                                    </label>
                                                    <label>
                                                      Currency:
                                                      <input
                                                        type="text"
                                                        value={this.state.currency}
                                                        className="form-control"
                                                         onChange={this.logChange}
                                                        name="currency"

                                                      />
                                                      </label>
                                                      <label>
                                                        Exchange Rate to CAD $:
                                                        <input
                                                          type="text"
                                                          value={this.state.exchangeRate}
                                                          className="form-control"
                                                           onChange={this.logChange}
                                                          name="exchangeRate"

                                                        />
                                                        </label>
                                                        <label>
                                                          Amount GST/HST:
                                                          <input
                                                            type="text"
                                                            value={this.state.amountGST}
                                                            className="form-control"
                                                             onChange={this.logChange}
                                                            name="amountGST"

                                                          />
                                                          </label>
                                                          <label>
                                                            Amount Net in CAD $:
                                                            <input
                                                              type="text"
                                                              value={net_amount}
                                                              className="form-control"
                                                               onChange={this.logChange}
                                                              name="amountNet"

                                                            />
                                                            </label>
                                                            <label>
                                                              Amount Payable in CAD $:
                                                              <input
                                                                type="text"
                                                                value={net_amount}
                                                                className="form-control"
                                                                 onChange={this.logChange}
                                                                name="amountPayable"

                                                              />
                                                              </label>
                                                              <div className="submit-section">
                                                                <button>Submit</button>
                                                              </div>
                                                              <br />
                                                              <div
                                                              style= {{width: 500,
                                                                        padding: 10,
                                                                        border: 5,
                                                                        margin: 0}}
                                                              >
                                                              <FileUpload/>
                                                              </div>

                                                              </form>

                                      </Modal>
                                      <Modal
                                      open={this.state.redirecting_to_approval_modalIsOpen}
                                      onClose={this.close_redirecting_modal}
                                      center
                                      >
                                      <br />
                                      <div><p>Great, you have submitted a travel request for this event! Click "Ok" to check your request status.</p></div>
                                      <br />
                                      <br />
                                      <button  type= "submit" onClick={e => this.on_request_submit(e)} >
                                                      OK
                                      </button>

                                      </Modal>


    </BootstrapTable>
    </div>



    <br />
    <br />

        <button class="button_submit button_item" onClick={e => this.saveandsubmit(e)}> Save and Submit </button>
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
