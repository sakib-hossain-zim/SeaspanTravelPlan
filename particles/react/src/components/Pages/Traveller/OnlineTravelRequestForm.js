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
import Modal from "react-responsive-modal";

class OnlineTravelRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insert_data: [],
      data: [],
      event_data: [],
      date_data: [],
      Request_Form_No: "OTR-" + Math.floor(Math.random() * 10000000 + 1),
      VSY_IndexNo: localStorage.getItem('VSY_IndexNo'),
      TravelPlan_id: localStorage.getItem('TravelPlan_id'),
      Event_id: localStorage.getItem('Event_id'),
      request_date: "",
      Item_id: "",
      Budget_id: "",
      item_name: "",
      amount: "",
      requested_amount: "",
      comment: "",
      reasoning: "",
      check_posted: "YES",
      submit_status: "",
      name: localStorage.getItem('traveller_name'),
      reasoning_error: "",
      event_start_date: "",
      event_end_date: "",
      travel_start_date: "",
      travel_end_date: "",


      modalIsOpen: false,
      addModalIsOpen: false,
      amountTooHighModalIsOpen: false,
      error_modalIsOpen: false,
      redirecting_to_approval_modalIsOpen: false





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
    this.saveandsubmit = this.saveandsubmit.bind(this);
    this.open_redirecting_modal = this.open_redirecting_modal.bind(this);
    this.close_redirecting_modal = this.close_redirecting_modal.bind(this);
    this.open_amountTooHigh_modal = this.open_amountTooHigh_modal.bind(this);
    this.close_amountTooHigh_modal = this.close_amountTooHigh_modal.bind(this);
    this.dateDiffInDays = this.dateDiffInDays.bind(this);
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



    });

  }


  open_error_modal(){
    this.setState({
      error_modalIsOpen: true

    })
  }


  validate = () => {
    let isError = false;
    const errors = {
    reasoning_error: "",
    };

    if (this.state.reasoning.length < 1) {
      isError = true;
      errors.reasoning_error = "Please provide a reasoning for adding new item";
      window.confirm("Please enter reasoning for adding new item");

    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };


  componentDidMount(){
  //getting present date to stamp it on the submission
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

    today = dd + '/'+mm+'/'+yyyy;


    let self = this;
    fetch("/users/items/view/" + this.state.VSY_IndexNo + "/" +  this.state.TravelPlan_id + "/" + this.state.Event_id, {
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
      .then(
        fetch("/users/traveller_event/view/" + this.state.VSY_IndexNo + "/" + this.state.Event_id, {
          method: "GET"
        })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad Response from server");
          }
          return response.json();
        })
        .then(function(data){
          //setting travel_start and end_date to calculate the travel status days
          self.setState({travel_start_date: data.data[0].travel_start_date,travel_end_date:data.data[0].travel_end_date});
          console.log(self.state.travel_start_date);
          console.log(self.state.travel_end_date);
        })
        .then(function(){
          console.log(self.state.travel_start_date);
          console.log(self.state.travel_end_date);
        })
      )
      .then(
        fetch("/users/traveller_event_event/view/" + this.state.VSY_IndexNo + "/" + this.state.Event_id, {
          method: "GET"
        })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad Response from server");
          }
          return response.json();
        })
        .then(function(event_data){
          //setting travel_start and end_date to calculate the travel status days
          self.setState({event_start_date: event_data.event_data[0].event_start_date,event_end_date:event_data.event_data[0].event_end_date});
        })

      )
      .catch(err => {
        console.log("caught it !, err");
      })
      .then(console.log(localStorage.getItem('VSY_IndexNo')))
      .then(console.log(today))
      .then(console.log(self.state.travel_end_date));


  }

 //function to open the modal when user clicks add to add an item
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

  open_redirecting_modal(){
    this.setState({
      redirecting_to_approval_modalIsOpen: true

    })

  }

  open_amountTooHigh_modal(){
    this.setState({
      amountTooHighModalIsOpen: true

    })

  }


  close_redirecting_modal(){
    this.setState({
      redirecting_to_approval_modalIsOpen: false
    })
  }

  close_amountTooHigh_modal(){
    this.setState({
      amountTooHighModalIsOpen: false
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

  onRowSelect = (row) => {
    var abcd = [];
    for(const prop in row){
      abcd.push(row[prop]);

      }

      this.openModal(row,abcd);


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
      requested_amount: this.state.requested_amount,
      check_posted: this.state.check_posted
    };
    var self = this;


    if(this.state.requested_amount > this.state.amount){
      this.open_amountTooHigh_modal();
    }
    else{

    fetch("/users/items/edit", {
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

        fetch("/users/items/view/" + self.state.VSY_IndexNo + "/" +  self.state.TravelPlan_id + "/" + self.state.Event_id, {
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
        self.setState({modalIsOpen: false})
      })

      .catch(function(err) {
        console.log(err);
      });



  }
}


  handleAddItemEdit(event) {
    event.preventDefault();
    const err = this.validate();
    if(!err){
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

        fetch("/users/items/view/" + self.state.VSY_IndexNo + "/" +  self.state.TravelPlan_id + "/" + self.state.Event_id, {
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
}

  onSubmit = e => {
  e.preventDefault();
      // clear form

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
        })


  };


  saveandsubmit = e => {
    this.open_redirecting_modal();

  }

  dateDiffInDays(a , b){
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1;
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
          Request_Form_No: this.state.Request_Form_No,
          VSY_IndexNo: this.state.VSY_IndexNo,
          TravelPlan_id: this.state.TravelPlan_id,
          Event_id: this.state.Event_id,
          request_date: today_date



        };
        console.log(insert_data);

        var change_data = {
          Event_id: this.state.Event_id,
          VSY_IndexNo: this.state.VSY_IndexNo,
          otr_request_status: "REQUESTED"
        }




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
          })
        .then(function(){
          fetch("/users/traveller_event/change/edit", {
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



      <div className= "content-inner-mobilefix">
      <div className="content-side-wrapper">
      <br />
      <h3>This is to request authorization to travel for the below event:</h3>
      <br />

      <MuiThemeProvider>
      <div className="container">
      <form>
        <TextField
          name="Request_Form_No"
          floatingLabelText="Request_Form_No"
          value={this.state.Request_Form_No}
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
          value={this.state.name}
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
          value= "NSS Program"
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
          value="Meeting for rate negotiation"
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
      </form>
      </div>

      </MuiThemeProvider>
        <br />
        <h3> Travel Event Budget Request </h3>
        <br />
        <p><b> * Click each row to enter the requested amount for each budget item below. If additional budget items are needed, please click "ADD ITEM"</b></p>
        <br />


        <div className="container" style={{marginTop:20}}>
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


          <TableHeaderColumn isKey dataField="Item_id" filter={{type: 'TextFilter', delay:1000}} width="100">
              Item Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="item_name" filter={{type: 'TextFilter', delay:1000}} width="200">
              Item Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="amount" filter={{type: 'TextFilter', delay:1000}} width="100">
             Planned Amount
          </TableHeaderColumn>
          <TableHeaderColumn dataField="requested_amount" filter={{type: 'TextFilter', delay:1000}} width="200">
             Requested Amount
          </TableHeaderColumn>
          <TableHeaderColumn dataField="reasoning" filter={{type: 'TextFilter', delay:1000}} width="600">
             Comments/Justification
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
                     Planned Amount:
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
                          Planned Amount:
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
                             errorText={this.state.reasoning_error}
                             value={this.state.reasoning}
                             className="form-control"
                             name="reasoning"
                           />
                         </label>

                         <p><b>* Please review. Once submitted, changes can only be done by the Travel Coordinator.</b></p>


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


                    <Modal
                    open={this.state.amountTooHighModalIsOpen}
                    onClose={this.close_amountTooHigh_modal}
                    center
                    >
                    <br />
                    <div><p>Sorry, your requested amount exceeds the planned amount. Please change your request. Or, if an increase in budget is needed please contact your travel coordinator.</p></div>
                    <br />
                    <br />

                    </Modal>


        </BootstrapTable>

         <button class="button_submit button_item" onClick={e => this.openAddModal(e)}> + Add Item </button>
          </div>


          <br/>
          <br/>
          <br/>


          <button class="button_submit button_item" onClick={e => this.saveandsubmit(e)}> Save and Submit </button>



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
