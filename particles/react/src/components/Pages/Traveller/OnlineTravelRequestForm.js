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
      Request_Form_No: "OTR-" + Math.floor(Math.random() * 10000000 + 1),
      VSY_IndexNo: localStorage.getItem('VSY_IndexNo'),
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

      modalIsOpen: false,
      addModalIsOpen: false,





    };


    this.openModal = this.openModal.bind(this);
    this.logChange = this.logChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAddItemEdit = this.handleAddItemEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
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
      requested_amount: abcd[7]


    });

  }


  componentDidMount(){


    let self = this;
    fetch("/users/items/view/" + this.state.VSY_IndexNo, {
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
      requested_amount: this.state.requested_amount
    };
    var self = this;
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
      reasoning: this.state.reasoning
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

        <h3> Step 2: Insert Budgeted Value </h3>
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
                        onChange={this.logChange}
                        value={this.state.requested_amount}
                        className="form-control"
                        name="requested_amount"
                      />
                     </label>



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


                        <div className="submit-section">
                          <button>Submit</button>
                        </div>
                      </form>
                    </Modal>


        </BootstrapTable>

         <button class="button_submit button_item" onClick={e => this.openAddModal(e)}> + Add Item </button>
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
