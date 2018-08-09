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

      Travel_Auth_No: "",
      status1: "",
      status2_bool: "No",
      status3: "No",

      modalIsOpen: false,


    };

    this.openModal = this.openModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.logChange = this.logChange.bind(this);
    this.closeModal = this.closeModal.bind(this);

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

  }

  handleEdit(event) {
    //Edit functionality
    console.log("Successful");
    console.log(this.state);
    event.preventDefault();
    var data = {
      Item_id: this.state.Item_id,
      status: this.state.status
    };
    var auth_data = {
     Travel_Auth_No: "Auth-" + Math.floor(Math.random() * 10000000 + 1),
     Request_Form_No: this.state.Request_Form_No,
     VSY_IndexNo: this.state.VSY_IndexNo,
     Event_id: this.state.Event_id,
     TravelPlan_id: this.state.TravelPlan_id,
     status1: this.state.status,
     status2: this.state.status2,
     status3: this.state.status3,
     notes: this.state.notes
    }
    var self = this;
    fetch("/users/items/editStatus", {
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
            self.setState({modalIsOpen: false})
          })
          // .then(function(){
          //   window.location.reload()
          // })
          .catch(function(err) {
            console.log(err);
          })

      });



  }




    componentWillMount() {
         this.props.dispatch(actionCreators.fetchProjects());
     }


     closeModal() {
       this.setState({
         modalIsOpen: false
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
         requested_amount: abcd[8],
         status: abcd[9],
         comment: abcd[10],
         reasoning: abcd[11]


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



              <Modal
                     open={this.state.modalIsOpen}
                     onClose={this.closeModal}
                     center
                   >
                     <form onSubmit={this.handleEdit}>


                         <label>
                              Status:
                                  <input
                                    type="text"
                                    onChange={this.logChange}
                                    value={this.state.status}
                                    className="form-control"
                                    name="status"
                                  />
                        </label>

                       <div className="submit-section">
                         <button>Submit</button>
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
