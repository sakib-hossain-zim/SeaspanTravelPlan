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
      accomodation_cost : "",
      car_rental_cost : "",
      per_diem_cost: "",
      flight_or_car_cost : "",
      taxi_mileage_gas : "",
      total : "",
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
      VSY_IndexNo: abcd[2],
      VSY_Meeting_Group_Desription : abcd[3],
      milestone : abcd[4],
      description : abcd[5],
      traveller_company : abcd[6],
      from_location : abcd[7],
      to_location : abcd[8],
      travel_status_days : abcd[9],
      traveller_name : abcd[10],
      traveller_labor_category : abcd[11],
      estimated_labor_travel_time : abcd[12],
      comments : abcd[13],
      accomodation_cost : abcd[14],
      car_rental_cost : abcd[15],
      per_diem_cost: abcd[16],
      flight_or_car_cost : abcd[17],
      taxi_mileage_gas : abcd[18],
      total : abcd[19]
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
      Budget_id: this.state.Budget_id,
      TravelPlan_id: this.state.TravelPlan_id,
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
      accomodation_cost : this.state.accomodation_cost,
      car_rental_cost : this.state.car_rental_cost,
      per_diem_cost: this.state.per_diem_cost,
      flight_or_car_cost : this.state.flight_or_car_cost,
      taxi_mileage_gas : this.state.taxi_mileage_gas,
      total : this.state.total
    };
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
          window.location.reload();

        }
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
        >
          <TableHeaderColumn isKey dataField="Budget_id" width="200">
            Budget ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="TravelPlan_id" width="200">
            Travel Plan ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="VSY_IndexNo" width="200">
            VSY Index No
          </TableHeaderColumn>
          <TableHeaderColumn dataField="VSY_Meeting_Group_Desription" width="200">
            VSY_Meeting_Group_Desription
          </TableHeaderColumn>
          <TableHeaderColumn dataField="milestone" width="400">
            Milestone
          </TableHeaderColumn>
          <TableHeaderColumn dataField="description" width="200">
            Meeting Description
          </TableHeaderColumn>
          <TableHeaderColumn dataField="traveller_company" width="200">
            Traveller Company
          </TableHeaderColumn>
          <TableHeaderColumn dataField="from_location" width="200">
            From Location
          </TableHeaderColumn>
          <TableHeaderColumn dataField="to_location" width="200">
            To Location
          </TableHeaderColumn>
          <TableHeaderColumn dataField="travel_status_days" width="200">
            Travel Status Days
          </TableHeaderColumn>
          <TableHeaderColumn dataField="traveller_name" width="200">
            Traveller Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="traveller_labor_category" width="200">
            Traveller Labor Category
          </TableHeaderColumn>
          <TableHeaderColumn dataField="estimated_labor_travel_time" width="200">
            Estimated labor travel time cost
          </TableHeaderColumn>
          <TableHeaderColumn dataField="comments" width="500">
            Comments
          </TableHeaderColumn>
          <TableHeaderColumn dataField="accomodation_cost" width="500">
            Accomodation cost
          </TableHeaderColumn>
          <TableHeaderColumn dataField="car_rental_cost" width="500">
            Car Rental Cost
          </TableHeaderColumn>
          <TableHeaderColumn dataField="per_diem_cost" width="500">
            Per Diem Cost
          </TableHeaderColumn>
          <TableHeaderColumn dataField="flight_or_car_cost" width="500">
            Flight or Car Cost
          </TableHeaderColumn>
          <TableHeaderColumn dataField="taxi_mileage_gas" width="500">
            Taxi/Mileage/Gas
          </TableHeaderColumn>
          <TableHeaderColumn dataField="total" width="500">
            Total
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
                 <label>
                   Accomodation Cost:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.accomodation_cost}
                     className="form-control"
                     name="accomodation_cost"
                   />
                 </label>
                 <label>
                   Car Rental Cost:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.car_rental_cost}
                     className="form-control"
                     name="car_rental_cost"
                   />
                 </label>
                 <label>
                   Per Diem Cost:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.per_diem_cost}
                     className="form-control"
                     name="per_diem_cost"
                   />
                 </label>
                 <label>
                   Flight or Travel By Car:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.flight_or_car_cost}
                     className="form-control"
                     name="flight_or_car_cost"
                   />
                 </label>
                 <label>
                   Taxi/Mileage/Gas:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.taxi_mileage_gas}
                     className="form-control"
                     name="taxi_mileage_gas"
                   />
                 </label>
                 <label>
                   Total:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.total}
                     className="form-control"
                     name="total"
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

export default BudgetTable;
