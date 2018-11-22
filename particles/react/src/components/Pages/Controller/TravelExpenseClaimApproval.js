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
      sub_items_data: [],
      total_sub_items_data: [],
      data: [],
      otr_data: [],
      auth_data: [],
      pending_data: [],
      Invoice_No: localStorage.getItem("Coordinator_InvoiceNo"),
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
      Sub_Item_id: "",
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
      coordinator_approval_status: "",
      Travel_Auth_No: "",
      status1: "",
      status2_bool: "No",
      status3: "",
      notes: "",
      rejection_reasoning: "",
      expenseclaim_coordinator_approval: "",


      modalIsOpen: false,
      modal_redirectIsOpen: false,
      handleViewModalIsOpen: false,
      handleSubItemReviewModalIsOpen: false,
      pendingRequestModalIsOpen: false


    };

    this.openModal = this.openModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handle_edit_auth = this.handle_edit_auth.bind(this);
    this.handle_travelexpenseclaim_auth = this.handle_travelexpenseclaim_auth.bind(this);
    this.logChange = this.logChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeredirectModal = this.closeredirectModal.bind(this);
    this.close_handleView_modal = this.close_handleView_modal.bind(this);
    this.close_handleReview_modal = this.close_handleReview_modal.bind(this);
    this.close_pending_SubItemModal = this.close_pending_SubItemModal.bind(this);

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
      .then(function(){
        fetch("/users/travelexpenseclaimselection_items_subitems/view/pendingData/" + self.state.VSY_IndexNo + "/" + self.state.Event_id, {
          method: "GET"
        })
        .then(function(response){
          if(response >= 400){
            throw new Error("Bad response from server")
          }
          return response.json();
        })
        .then(function(pendingData){
          self.setState({pending_data: pendingData.pendingData})
        })
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


  handle_subitem_confirmation(event){
    event.preventDefault();

    var data = {
      Sub_Item_id: this.state.Sub_Item_id,
      coordinator_approval_status: "APPROVED"
    }


    var self = this;


          fetch("/users/subitem/edit_coordinator_approval_status/", {
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
            .then(
              window.location.reload()
            )
        .catch(function(err) {
          console.log(err);
        })
  }



  handle_subitem_rejection(event){
    event.preventDefault();

    var data = {
      Sub_Item_id: this.state.Sub_Item_id,
      coordinator_approval_status: "REJECTED",
      rejection_reasoning: this.state.rejection_reasoning
    }

    var item_data = {
      Item_id: this.state.Item_id,
      expenseclaim_approval: "REJECTED"

    }


    var self = this;


          fetch("/users/subitem/edit_coordinator_approval_status/", {
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
            .then(function(){

              fetch("/users/item/expenseclaim_approval_status", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(item_data)
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
            .then(
              window.location.reload()
            )
        .catch(function(err) {
          console.log(err);
        })

  }


  handle_travelexpenseclaim_auth(event){
    // onClick of Validate, fetch all the sub_items data  and save it in sub-item_auth_data, run a loop to check
    //                                  -> if any sub-item has  PENDING as a status if yes then open up a MODAL: Some items are PENDING
    //                                  -> else if a sub-item has REJECTED as a status then UPDATE the status of the expenseclaim to REJECTED
    //                                  -> else update status to APPROVED

    event.preventDefault();

    let self = this;
    let auth_status;

    let final_auth_data = {
      Invoice_No: this.state.Invoice_No,
      coordinator_approval: auth_status

    }


    fetch("/users/travelexpenseclaimselection_items_subitems/view/data/" + self.state.VSY_IndexNo + "/" + this.state.Event_id, {
      method: "GET"
    })
    .then(function(response){
      if(response >= 400){
        throw new Error("Bad response from server")
      }
      return response.json();
    })
    .then(function(data){
      self.setState({auth_data: data.data});
    })
    .then(function(){
      let fetched_auth_data = self.state.auth_data;
      let pending_data_checkArray = self.state.pending_data;

      console.log(self.state.pending_data);

      if((self.state.pending_data).length > 0 ){
          self.setState({pendingRequestModalIsOpen: true});
      } else {
      for(var i=0;i< fetched_auth_data.length; i++ ){
        console.log(fetched_auth_data);
        if (fetched_auth_data[i].coordinator_approval_status === "REJECTED") {
          console.log("TESTING NOW");
          console.log(fetched_auth_data[i].coordinator_approval_status)
            auth_status = "REJECTED";
            console.log(auth_status)
            final_auth_data.coordinator_approval = auth_status;
            break;
        } else {
          console.log("TESTING NOW");
          console.log(fetched_auth_data[i].coordinator_approval_status)
          self.setState({expenseclaim_coordinator_approval: "APPROVED"});
          console.log(self.state.expenseclaim_coordinator_approval);
          auth_status = "APPROVED";
          final_auth_data.coordinator_approval = "APPROVED";
        }
      }
    }
    })
    .then(function(){
      fetch("/users/travelexpenseclaim/status_update/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(final_auth_data)
      })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(data) {
          console.log(final_auth_data);
          console.log(data);
          if (data === "success") {
            self.setState({
              msg: "User has been edited."
            });
          }
        })

    })
    .catch(function(err){
      console.log(err);
    })

  }

  openPendingRequestsModal(){

    this.setState({
      pendingRequestModalIsOpen: true
    });

  }

  openHandleViewModal(row,abcd){

    this.setState({
      Item_id: abcd[5],
      item_name: abcd[6],
      amount: abcd[7],
      requested_amount: abcd[8],
      handleViewModalIsOpen: true
    });

  }


  openHandleSubItemReviewModal(row,abcd){
    this.setState({
      Sub_Item_id: abcd[0],
      sub_item_name: abcd[2],
      expenseclaimamount: abcd[2],
      coordinator_approved_amount: abcd[3],
      subitem_description: abcd[4],
      receiptNo: abcd[5],
      receiptDate: abcd[6],
      amountTotal: abcd[7],
      currency: abcd[8],
      exchangeRate: abcd[9],
      amountGST: abcd[10],
      amountNet: abcd[11],
      amountPayable: abcd[12],
      attachment_url: abcd[13],
      note_from_coordinator: abcd[14],
      coordinator_approval_status: abcd[15],
      handleSubItemReviewModalIsOpen: true
    })
  }

  close_handleView_modal() {
    this.setState({
      handleViewModalIsOpen: false
    });
  }


     closeModal() {
       this.setState({
         modalIsOpen: false
       });
     }

     close_handleReview_modal() {
       this.setState({
         handleSubItemReviewModalIsOpen: false
       });
     }

     closeredirectModal(){
       this.setState({
         modal_redirectIsOpen: false
       });
     }

     close_pending_SubItemModal() {
       this.setState({
         pendingRequestModalIsOpen: false
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

           var self = this;
           fetch("/users/sub_items_data/" + abcd[5], {
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

             self.openHandleViewModal(row,abcd);
           }
           )
           .catch(err => {
             console.log("caught it !, err");
           })

         }

         openInNewTab(url) {
            var win = window.open(url, '_blank');
              win.focus();
                      }

         onRowSelect_subItemTable = (row) => {
           var abcd = [];
           for(const prop in row){
             abcd.push(row[prop]);

             }

             this.openHandleSubItemReviewModal(row,abcd);

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

      const selectRowProp_subItemTable = {
        mode:"checkbox",
        clickToSelect: true,
        onSelect: this.onRowSelect_subItemTable
      }


        return (
            this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
            <Backend>
            <div className= "content-inner-mobilefix">
            <div className="content-side-wrapper">
            <div className="container" style={{marginTop:20}}>
            <h3> Approve Requests </h3>
            <br />
            <p> <b> * Click on rows to review sub items </b></p>
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
              open={this.state.handleViewModalIsOpen}
              onClose={this.close_handleView_modal}
              center
              >

              <br />
              <h3> SubItems for {this.state.item_name}: </h3>





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
                selectRow={selectRowProp_subItemTable}
                height='350'
                scrollTop={'Bottom'}
              >
              <TableHeaderColumn isKey dataField="Sub_Item_id" filter={{type: 'TextFilter', delay:1000}} width="170">
                  SubItem ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="sub_item_name" filter={{type: 'TextFilter', delay:1000}} width="150">
                  Sub Item Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="subitem_description" filter={{type: 'TextFilter', delay:1000}} width="200">
                  SubItem Description
              </TableHeaderColumn>
              <TableHeaderColumn dataField="amountPayable" filter={{type: 'TextFilter', delay:1000}} width="140">
                  Amount Payable
              </TableHeaderColumn>
              </BootstrapTable>
              </div>

              </Modal>


            </BootstrapTable>
            <br />
            <br />
            <button class="button_submit button_item" onClick={e => this.handle_travelexpenseclaim_auth(e)}> Validate </button>


            <Modal
                   open={this.state.handleSubItemReviewModalIsOpen}
                   onClose={this.close_handleReview_modal}
                   center
                 >
                 <br />
                 <br />
                 <br />
                 <br />
              <h3> Expense details: </h3>
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
                         name="Sub_Item_id"

                       />
                       </label>

                       <label>
                         Supplier Name:
                         <input
                           type="text"
                           value={this.state.sub_item_name}
                           className="form-control"
                           name="sub_item_name"

                         />
                         </label>

                             <label>
                               Expense Description:
                               <input
                                 type="text"
                                 value={this.state.subitem_description}
                                 className="form-control"
                                 name="subitem_description"

                               />
                               </label>
                               <label>
                                 Receipt No:
                                 <input
                                   type="text"
                                   value={this.state.receiptNo}
                                   className="form-control"
                                   name="receiptNo"

                                 />
                                 </label>
                                 <label>
                                   Receipt Date:
                                   <input
                                     type="text"
                                     value={this.state.receiptDate}
                                     className="form-control"
                                     name="receiptDate"

                                   />
                                   </label>
                                   <label>
                                    Total Receipt Amount:
                                     <input
                                       type="text"
                                       value={this.state.amountTotal}
                                       className="form-control"
                                       name="amountTotal"

                                     />
                                     </label>
                                     <label>
                                       Currency:
                                       <input
                                         type="text"
                                         value={this.state.currency}
                                         className="form-control"
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
                                               value={this.state.amountNet}
                                               className="form-control"
                                                onChange={this.logChange}
                                               name="amountNet"

                                             />
                                             </label>
                                             <label>
                                               Amount Payable in CAD $:
                                               <input
                                                 type="text"
                                                 value={this.state.amountPayable}
                                                 className="form-control"
                                                  onChange={this.logChange}
                                                 name="amountPayable"

                                               />
                                               </label>

                                               <br />


                                               </form>


                                               <p><b> Click to view documents </b> </p>
                                               <button onClick = {e => this.openInNewTab('http://10.20.3.143:4000/public/sample.pdf')}>
                                                VIEW
                                               </button>

                                               <br />

                                               <form>
                                               <label>
                                                 Rejection Reason:
                                                 <input
                                                   type="text"
                                                   value={this.state.rejection_reasoning}
                                                   className="form-control-rejection"
                                                   onChange={this.logChange}
                                                   name="rejection_reasoning"




                                                 />
                                                 </label>

                                               </form>

                                               <button class="button_submit button_item" onClick={e => this.handle_subitem_confirmation(e)}> Confirm </button>
                                               <button class="button_submit button_item" onClick={e => this.handle_subitem_rejection(e)}> Reject </button>




                       </Modal>
                       <Modal
                       open={this.state.pendingRequestModalIsOpen}
                       onClose={this.close_pending_SubItemModal}
                       center
                       >

                       <br />
                       <div style={{width: 700,
                                 padding: 10,
                                 border: 5,
                                 margin: 0}}
                                 >
                       <BootstrapTable
                         data={this.state.pending_data}
                         hover
                         striped
                         responsive
                         exportCSV
                         csvFileName="data.csv"
                         selectRow={selectRowProp_subItemTable}
                         height='350'
                         scrollTop={'Bottom'}
                       >
                       <TableHeaderColumn isKey dataField="Sub_Item_id" filter={{type: 'TextFilter', delay:1000}} width="170">
                           SubItem ID
                       </TableHeaderColumn>
                       <TableHeaderColumn dataField="sub_item_name" filter={{type: 'TextFilter', delay:1000}} width="150">
                           Sub Item Name
                       </TableHeaderColumn>
                       <TableHeaderColumn dataField="subitem_description" filter={{type: 'TextFilter', delay:1000}} width="200">
                           SubItem Description
                       </TableHeaderColumn>
                       <TableHeaderColumn dataField="amountPayable" filter={{type: 'TextFilter', delay:1000}} width="140">
                           Amount Payable
                       </TableHeaderColumn>
                       <TableHeaderColumn dataField="coordinator_approval_status" filter={{type: 'TextFilter', delay:1000}} width="140">
                           Status
                       </TableHeaderColumn>
                       </BootstrapTable>
                       </div>

                       </Modal>


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
