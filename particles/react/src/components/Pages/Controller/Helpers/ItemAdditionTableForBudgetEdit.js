import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import Modal from "react-responsive-modal";




class ItemAdditionTableForBudgetEdit extends Component {


  constructor(props){
    super(props);
    this.state = {

      Item_id: "",
      Budget_id: "",
      TravelPlan_id: "",
      VSY_IndexNo: "",
      item_name: "",
      amount: "",
      comment: "",
      traveller_name:   "",
      event_name: "",
      travel_program: "",

      modalIsOpen: false,
      editor_modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.logChange = this.logChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.editor_closeModal = this.editor_closeModal.bind(this);
    this.editor_openModal = this.editor_openModal.bind(this);
    this.handleChangeEdits = this.handleChangeEdits.bind(this);
  }

  openModal() {

    this.setState({
      modalIsOpen: true,
      Item_id: "I-" + Math.floor(Math.random() * 10000000 + 1),
      Budget_id: this.state.Budget_id,
      TravelPlan_id:localStorage.getItem('BudgetEventSelection_TravelPlan_id'),
      VSY_IndexNo: localStorage.getItem('BudgetTravellerSelection_VSY_IndexNo'),
      Event_id: localStorage.getItem('BudgetEventSelection_Event_id'),
      item_name: "",
      amount: "",
      comment: "",
    });

  }

  editor_openModal(row,abcd) {

    this.setState({
      editor_modalIsOpen: true,
      Item_id: abcd[0],
      Budget_id: abcd[1],
      TravelPlan_id: abcd[2],
      VSY_IndexNo: abcd[3],
      Event_id: abcd[4],
      item_name: abcd[5],
      amount: abcd[6],
      comment: abcd[11],
      traveller_name:   localStorage.getItem('BudgetTravellerSelection_TravellerName'),
      event_name: localStorage.getItem('BudgetEventSelection_EventName'),
      travel_program: localStorage.getItem('BudgetEventSelection_TravelProgram'),

    });

  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  editor_closeModal() {
    this.setState({
      editor_modalIsOpen: false
    });
  }



  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value //setting value edited by the admin in state.
    });
  }

  handleEdit(event) {
    //Edit functionality
    console.log("Successful");
    console.log(this.state);
    console.log(this.state.Budget_id);
    event.preventDefault();
    this.setState({
      item_name: "",
      amount: ""
    });

    var data = {
      Item_id: this.state.Item_id,
      Budget_id: this.state.Budget_id,
      TravelPlan_id:localStorage.getItem('BudgetEventSelection_TravelPlan_id'),
      VSY_IndexNo: localStorage.getItem('BudgetTravellerSelection_VSY_IndexNo'),
      Event_id: localStorage.getItem('BudgetEventSelection_Event_id'),
      item_name: this.state.item_name,
      amount: this.state.amount,
      comment: this.state.comment
    };
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

      .then(function(){
        self.setState({modalIsOpen: false})
      })
      .then(function(){
        window.location.reload()
      })
      // .then(function(){
      //   window.location.reload()
      // })
      .catch(function(err) {
        console.log(err);
      });



  }



  handleChangeEdits(event) {
    //Edit functionality
    console.log("Successful");
    console.log(this.state);
    event.preventDefault();
    var data = {
      Item_id: this.state.Item_id,
      Budget_id: this.state.Budget_id,
      TravelPlan_id: this.state.TravelPlan_id,
      Event_id: this.state.Event_id,
      VSY_IndexNo: this.state.VSY_IndexNo,
      item_name: this.state.item_name,
      amount: this.state.amount,
      comment: this.state.comment

    };
    var self = this;
    fetch("/users/items_all/edit", {
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
        self.setState({editor_modalIsOpen: false})
      })
      .then(function(){
        window.location.reload()
      })
      .catch(function(err) {
        console.log(err);
      });



  }



  onDeleteClick(e){
      e.preventDefault();

      var data = {
        Item_id: this.state.Item_id
      }

      var self = this;

      fetch("/users/items/delete", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)

      }).then(function(response){
        if(response.status >= 400){
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data){
        if(data === "success"){
          this.setState({msg: "User has been deleted"})
        }
      })
      .then(function(){
        self.setState({editor_modalIsOpen: false})
      })
      .then(function(){
        window.location.reload()
      })
      .catch(function(err){
        console.log(err)
      });


  }





// onRowSelect = (row) => {
//   var abcd = [];
//   for(const prop in row){
//     abcd.push(row[prop]);
//
//     }
//     this.openModal(row,abcd);
//
//   }

//   onAfterInsertRow = (row) => {
//     var abcd = [];
//     for(const prop in row){
//       abcd.push(row[prop]);
//
//       }
//       this.openModal(row,abcd);
//
//
// }


onRowSelect = (row) => {
  var abcd = [];
  for(const prop in row){
    abcd.push(row[prop]);

    }
    this.editor_openModal(row,abcd);

  }







  render() {
    // const selectRowProp = {
    //   mode:"checkbox",
    //   clickToSelect: true,
    //   onSelect: this.onRowSelect
    // }

//     const options = {
// afterInsertRow: this.onAfterInsertRow};
const selectRowProp = {
  mode:"checkbox",
  clickToSelect: true,
  onSelect: this.onRowSelect
}

    return (
      <div>

        <BootstrapTable
          data={this.props.items_data}
          hover
          striped
          responsive
          exportCSV
          csvFileName="masterbudget.csv"
          selectRow={selectRowProp}
          height='350'
          scrollTop={'Bottom'}


        >
        <TableHeaderColumn isKey dataField="Item_id" filter={{type: 'TextFilter', delay:1000}} width="200">
          Item ID
        </TableHeaderColumn>
          <TableHeaderColumn dataField="item_name" filter={{type: 'TextFilter', delay:1000}} width="200">
            Item Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="amount" filter={{type: 'TextFilter', delay:1000}} width="200">
           Planned Amount
          </TableHeaderColumn>
          <TableHeaderColumn dataField="comment" filter={{type: 'TextFilter', delay:1000}} width="200">
           Comment
          </TableHeaderColumn>




          <Modal
                 open={this.state.modalIsOpen}
                 onClose={this.closeModal}
                 center
               >
               <p><b> Please select Item Name from the dropdown list and enter budget amount </b> </p>
                 <form onSubmit={this.handleEdit}>

                 <label>
                   Item_id:
                   <input
                     type="text"
                     value={this.state.Item_id}
                     className="form-control"
                      onChange={this.logChange}
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
                     Item Name:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.item_name}
                       className="form-control"
                       name="item_name"
                     />
                   </label>

                   <label>
                     Amount:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.amount}
                       className="form-control"
                       name="amount"
                     />
                    </label>
                    <label>
                      Comment:
                      <input
                        type="text"
                        onChange={this.logChange}
                        value={this.state.comment}
                        className="form-control"
                        name="comment"
                      />
                     </label>



                   <div className="submit-section">
                     <button>Submit</button>
                   </div>
                 </form>
               </Modal>





        <Modal
               open={this.state.editor_modalIsOpen}
               onClose={this.editor_closeModal}
               center
             >
               <form onSubmit={this.handleChangeEdits}>

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
                   Traveller Name:
                   <input
                     type="text"
                     value={this.state.traveller_name}
                     className="form-control"
                      onChange={this.logChange}
                     name="traveller_name"

                   />
                 </label>
                 <label>
                   Travel Plan Program:
                   <input
                     type="text"
                     value={this.state.travel_program}
                     className="form-control"
                    onChange={this.logChange}
                     name="travel_program"

                   />
                 </label>
                 <label>
                   Event Name:
                   <input
                     type="text"
                     value={this.state.event_name}
                     className="form-control"
                    onChange={this.logChange}
                     name="event_name"

                   />
                 </label>

                 <label>
                   Item Name:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.item_name}
                     className="form-control"
                     name="item_name"
                   />
                 </label>

                 <label>
                   Amount:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.amount}
                     className="form-control"
                     name="amount"
                   />
                  </label>
                  <label>
                    Comment:
                    <input
                      type="text"
                      onChange={this.logChange}
                      value={this.state.comment}
                      className="form-control"
                      name="comment"
                    />
                   </label>



                 <div className="submit-section">
                   <button>Submit</button>
                 </div>
               </form>
               <div className="submit-section">
                 <button onClick={e => this.onDeleteClick(e)}>Delete Entry</button>
               </div>


             </Modal>


             </BootstrapTable>

             <button class="button_submit button_item" onClick={e => this.openModal(e)}> + Add Item </button>


      </div>
    );
  }
}

export default ItemAdditionTableForBudgetEdit;
