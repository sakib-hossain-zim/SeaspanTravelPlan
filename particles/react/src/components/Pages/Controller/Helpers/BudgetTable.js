import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import Modal from "react-responsive-modal";


class BudgetTable extends Component {


  constructor(props){
    super(props);
    this.state = {
      change_data: [],

      Budget_id: "",
      TravelPlan_id: "",
      Event_id: "",
      VSY_IndexNo: "",
      VSY_Meeting_Group_Desription : "",
      milestone : "",
      description : "",
      traveller_company : "",
      from_location : "",
      to_location : "",
      travel_status_days : "",
      traveller_name : "",
      traveller_labor_category : "",
      estimated_labor_travel_time : "",
      comments : "",
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.logChange = this.logChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(row,abcd) {

    this.setState({
      modalIsOpen: true,
      Budget_id: abcd[0],
      TravelPlan_id: abcd[1],
      Event_id: abcd[2],
      VSY_IndexNo: abcd[3],
      VSY_Meeting_Group_Desription : abcd[4],
      milestone : abcd[5],
      description : abcd[6],
      traveller_company : abcd[7],
      from_location : abcd[8],
      to_location : abcd[9],
      travel_status_days : abcd[10],
      traveller_name : abcd[11],
      traveller_labor_category : abcd[12],
      estimated_labor_travel_time : abcd[13],
      comments : abcd[14],
    });

  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value //setting value edited by the admin in state.
    });
  }


  onDeleteClick(e){
      e.preventDefault();

      var data = {
        Budget_id: this.state.Budget_id
      }

      var self = this;

      fetch("/users/budget/delete", {
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
        self.setState({modalIsOpen: false})
      })
      .catch(function(err){
        console.log(err)
      })
      .then(function(){
        fetch("/users/budget/delete/individual", {
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
          self.setState({modalIsOpen: false})
        })
        .then(function(){
          window.location.reload()
        })
        .catch(function(err){
          console.log(err)
        })

      });


  }

  handleEdit(event) {
    //Edit functionality
    console.log("Successful");
    console.log(this.state);
    event.preventDefault();
    var data = {
      Budget_id: this.state.Budget_id,
      TravelPlan_id: this.state.TravelPlan_id,
      Event_id: this.state.Event_id,
      VSY_IndexNo: this.state.VSY_IndexNo,
      VSY_Meeting_Group_Desription : this.state.VSY_Meeting_Group_Desription,
      milestone : this.state.milestone,
      description : this.state.description,
      traveller_company : this.state.traveller_company,
      from_location : this.state.from_location,
      to_location : this.state.to_location,
      travel_status_days : this.state.travel_status_days,
      traveller_name : this.state.traveller_name,
      traveller_labor_category : this.state.traveller_labor_category,
      estimated_labor_travel_time : this.state.estimated_labor_travel_time,
      comments : this.state.comments,
    };
    var self = this;
    fetch("/users/budget/edit", {
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
        window.location.reload()
      })
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







  render() {
    const selectRowProp = {
      mode:"checkbox",
      clickToSelect: true,
      onSelect: this.onRowSelect
    }



    return (
      <div>
        <BootstrapTable
          data={this.props.data}
          hover
          striped
          responsive
          exportCSV
          selectRow={selectRowProp}
          csvFileName="data.csv"
          height='350'
          scrollTop={'Bottom'}


        >
          <TableHeaderColumn isKey dataField="Budget_id" filter={{type: 'TextFilter', delay:1000}} width="200">
            Budget ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="TravelPlan_id" filter={{type: 'TextFilter', delay:1000}} width="200">
            Travel Plan ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Event_id" filter={{type: 'TextFilter', delay:1000}} width="200">
            Event ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="VSY_IndexNo" filter={{type: 'TextFilter', delay:1000}} width="200">
            VSY Index No
          </TableHeaderColumn>
          <TableHeaderColumn dataField="VSY_Meeting_Group_Desription" filter={{type: 'TextFilter', delay:1000}} width="200">
            VSY_Meeting_Group_Desription
          </TableHeaderColumn>
          <TableHeaderColumn dataField="milestone" filter={{type: 'TextFilter', delay:1000}} width="400">
            Milestone
          </TableHeaderColumn>
          <TableHeaderColumn dataField="description" filter={{type: 'TextFilter', delay:1000}} width="200">
            Meeting Description
          </TableHeaderColumn>
          <TableHeaderColumn dataField="traveller_company" filter={{type: 'TextFilter', delay:1000}} width="200">
            Traveller Company
          </TableHeaderColumn>
          <TableHeaderColumn dataField="from_location" filter={{type: 'TextFilter', delay:1000}} width="200">
            From Location
          </TableHeaderColumn>
          <TableHeaderColumn dataField="to_location" filter={{type: 'TextFilter', delay:1000}} width="200">
            To Location
          </TableHeaderColumn>
          <TableHeaderColumn dataField="travel_status_days" filter={{type: 'TextFilter', delay:1000}} width="200">
            Travel Status Days
          </TableHeaderColumn>
          <TableHeaderColumn dataField="traveller_name" filter={{type: 'TextFilter', delay:1000}} width="200">
            Traveller Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="traveller_labor_category" filter={{type: 'TextFilter', delay:1000}} width="200">
            Traveller Labor Category
          </TableHeaderColumn>
          <TableHeaderColumn dataField="estimated_labor_travel_time" filter={{type: 'TextFilter', delay:1000}} width="200">
            Estimated labor travel time cost
          </TableHeaderColumn>
          <TableHeaderColumn dataField="comments" filter={{type: 'TextFilter', delay:1000}} width="1000">
            Comments
          </TableHeaderColumn>




        <Modal
               open={this.state.modalIsOpen}
               onClose={this.closeModal}
               center
             >
               <form onSubmit={this.handleEdit}>
                 <label>
                   Budget_id:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.Budget_id}
                     className="form-control"
                     name="Budget_id"
                   />
                 </label>
                 <label>
                   TravelPlan_id:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.TravelPlan_id}
                     className="form-control"
                     name="TravelPlan_id"
                   />
                   </label>
                   <label>
                     Event_id:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.Event_id}
                       className="form-control"
                       name="Event_id"
                     />
                 </label>
                 <label>
                   VSY_IndexNo:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.VSY_IndexNo}
                     className="form-control"
                     name="VSY_IndexNo"
                   />
                 </label>

                 <label>
                   Traveller Company:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.traveller_company}
                     className="form-control"
                     name="traveller_company"
                   />
                 </label>

                 <label>
                   Travel Status Days:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.travel_status_days}
                     className="form-control"
                     name="travel_status_days"
                   />
                 </label>
                 <label>
                   Traveller Labor Category:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.traveller_labor_category}
                     className="form-control"
                     name="traveller_labor_category"
                   />
                 </label>
                 <label>
                   Estimated Labor Travel Time:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.estimated_labor_travel_time}
                     className="form-control"
                     name="estimated_labor_travel_time"
                   />
                 </label>
                 <label>
                   Comments:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.comments}
                     className="form-control"
                     name="comments"
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
      </div>
    );
  }
}

export default BudgetTable;
