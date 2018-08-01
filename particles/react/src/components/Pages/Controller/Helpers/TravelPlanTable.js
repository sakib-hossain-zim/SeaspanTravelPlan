import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import Modal from "react-responsive-modal";

class TravelPlanTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      change_data: [],

      TravelPlan_id: "",
      start_date: "",
      end_date: "",
      source: "",
      destination: "",
      travel_status_bool: "",
      approval_status: "",
      travel_period: "",
      contract: "",
      phase: "",
      nss_program: "",
      planned_budget: "",
      e1_business_unit: "",
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
      TravelPlan_id: abcd[0],
      start_date: abcd[1],
      end_date: abcd[2],
      source: abcd[3],
      destination: abcd[4],
      travel_status_bool: abcd[5],
      approval_status: abcd[6],
      travel_period: abcd[7],
      contract: abcd[8],
      phase: abcd[9],
      nss_program: abcd[10],
      planned_budget: abcd[11],
      e1_business_unit: abcd[12]


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

  handleEdit(event) {
    //Edit functionality
    console.log("Successful");
    console.log(this.state);
    event.preventDefault();
    var data = {
      TravelPlan_id: this.state.TravelPlan_id,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      source: this.state.source,
      destination: this.state.destination,
      travel_status_bool: this.state.travel_status_bool,
      approval_status: this.state.approval_status,
      travel_period: this.state.travel_period,
      contract: this.state.contract,
      phase: this.state.phase,
      nss_program: this.state.nss_program,
      planned_budget: this.state.planned_budget,
      e1_business_unit: this.state.e1_business_unit




    };
    var self = this;
    fetch("/users/travelplan/edit", {
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
          csvFileName="travelplan.csv"
        >
          <TableHeaderColumn isKey dataField="TravelPlan_id" filter={{type: 'TextFilter', delay:1000}} width="200">
            Travel Plan
          </TableHeaderColumn>
          <TableHeaderColumn dataField="start_date" filter={{type: 'TextFilter', delay:1000}} width="200">
            Start Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="end_date" filter={{type: 'TextFilter', delay:1000}} width="200">
            End Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="source" filter={{type: 'TextFilter', delay:1000}} width="200">
            Source
          </TableHeaderColumn>
          <TableHeaderColumn dataField="destination" filter={{type: 'TextFilter', delay:1000}} width="200">
            Destination
          </TableHeaderColumn>
          <TableHeaderColumn dataField="travel_status_bool" filter={{type: 'TextFilter', delay:1000}} width="200">
            Travel Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="approval_status" filter={{type: 'TextFilter', delay:1000}} width="200">
            Approval Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="travel_period" filter={{type: 'TextFilter', delay:1000}} width="200">
            Travel Period
          </TableHeaderColumn>
          <TableHeaderColumn dataField="contract" filter={{type: 'TextFilter', delay:1000}} width="200">
            Contract
          </TableHeaderColumn>
          <TableHeaderColumn dataField="phase" filter={{type: 'TextFilter', delay:1000}} width="200">
            Phase
          </TableHeaderColumn>
          <TableHeaderColumn dataField="nss_program" filter={{type: 'TextFilter', delay:1000}} width="200">
            NSS Program
          </TableHeaderColumn>
          <TableHeaderColumn dataField="planned_budget" filter={{type: 'TextFilter', delay:1000}} width="200">
            Planned Budget
          </TableHeaderColumn>
          <TableHeaderColumn dataField="e1_business_unit" filter={{type: 'TextFilter', delay:1000}} width="200">
            E1 Business Unit
          </TableHeaderColumn>


          <Modal
                 open={this.state.modalIsOpen}
                 onClose={this.closeModal}
                 center
               >
                 <form onSubmit={this.handleEdit}>
                 <h3>Traveller Editor</h3>
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
                     Start Date:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.start_date}
                       className="form-control"
                       name="start_date"
                     />
                   </label>
                   <label>
                     End Date:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.end_date}
                       className="form-control"
                       name="end_date"
                     />
                   </label>

                   <label>
                     source:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.source}
                       className="form-control"
                       name="source"
                     />
                   </label>

                   <label>
                     Destination:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.destination}
                       className="form-control"
                       name="destination"
                     />
                   </label>
                   <label>
                     Travel Status Bool:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.travel_status_bool}
                       className="form-control"
                       name="travel_status_bool"
                     />
                   </label>
                   <label>
                     Approval Status:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.approval_status}
                       className="form-control"
                       name="approval_status"
                     />
                   </label>
                   <label>
                     Travel Period:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.travel_period}
                       className="form-control"
                       name="travel_period"
                     />
                   </label>
                   <label>
                     Contract:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.contract}
                       className="form-control"
                       name="contract"
                     />
                   </label>
                   <label>
                     Phase:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.phase}
                       className="form-control"
                       name="phase"
                     />
                   </label>
                   <label>
                     Nss Program:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.nss_program}
                       className="form-control"
                       name="nss_program"
                     />
                   </label>
                   <label>
                     Planned Budget:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.planned_budget}
                       className="form-control"
                       name="planned_budget"
                     />
                   </label>
                   <label>
                     E1 Business Unit:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.e1_business_unit}
                       className="form-control"
                       name="e1_business_unit"
                     />
                   </label>



                   <div className="submit-section">
                     <button>Submit</button>
                   </div>
                 </form>
               </Modal>







        </BootstrapTable>
      </div>
    );
  }
}

export default TravelPlanTable;
