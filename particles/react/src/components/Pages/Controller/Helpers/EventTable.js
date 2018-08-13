import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import Modal from "react-responsive-modal";

class EventTable extends Component {

  constructor(props){

    super(props)
    this.state = {
      data: [],

      Event_id: "",
      TravelPlan_id: "",
      event_name: "",
      event_type: "",
      description: "",
      event_location: "",
      month_reported_in_table1: "",
      duration: "",
      event_status: "",
      travel_group: "",
      p6_uniqueid: "",
      weekNo: "",
      meeting_date: "",
      expected_meeting_date: "",
      modalIsOpen: false

    }
    this.openModal = this.openModal.bind(this);
    this.logChange = this.logChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  openModal(row,abcd) {

    this.setState({
      modalIsOpen: true,
      Event_id: abcd[0],
      TravelPlan_id: abcd[1],
      event_name: abcd[2],
      event_type: abcd[3],
      description: abcd[4],
      event_location: abcd[5],
      month_reported_in_table1: abcd[6],
      duration: abcd[7],
      event_status: abcd[8],
      travel_group: abcd[9],
      p6_uniqueid: abcd[10],
      weekNo: abcd[11],
      meeting_date: abcd[12],
      expected_meeting_date:abcd[13]

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
      Event_id: this.state.Event_id,
      TravelPlan_id: this.state.TravelPlan_id,
      event_name: this.state.event_name,
      event_type: this.state.event_type,
      description: this.state.description,
      event_location: this.state.event_location,
      month_reported_in_table1: this.state.month_reported_in_table1,
      duration: this.state.duration,
      event_status: this.state.event_status,
      travel_group: this.state.travel_group,
      p6_uniqueid: this.state.p6_uniqueid,
      weekNo: this.state.weekNo,
      meeting_date: this.state.meeting_date,
      expected_meeting_date: this.state.expected_meeting_date

    };
    var self = this;
    fetch("/users/event/edit", {
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
        >
          <TableHeaderColumn isKey dataField="Event_id" filter={{type: 'TextFilter', delay:1000}} width="200">
            Event ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="TravelPlan_id" filter={{type: 'TextFilter', delay:1000}} width="200">
            Travel Plan ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_name" filter={{type: 'TextFilter', delay:1000}} width="200">
            Event Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_type" filter={{type: 'TextFilter', delay:1000}} width="200">
            Event Type
          </TableHeaderColumn>
          <TableHeaderColumn dataField="description" filter={{type: 'TextFilter', delay:1000}} width="400">
            Description
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_location" filter={{type: 'TextFilter', delay:1000}} width="200">
            Event Location
          </TableHeaderColumn>
          <TableHeaderColumn dataField="month_reported_in_table1" filter={{type: 'TextFilter', delay:1000}} width="200">
            Month Reported In Table 1
          </TableHeaderColumn>
          <TableHeaderColumn dataField="duration" filter={{type: 'TextFilter', delay:1000}} width="200">
            Duration
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_status" filter={{type: 'TextFilter', delay:1000}} width="200">
            Event Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="travel_group" filter={{type: 'TextFilter', delay:1000}} width="200">
            Travel Group
          </TableHeaderColumn>
          <TableHeaderColumn dataField="p6_uniqueid" filter={{type: 'TextFilter', delay:1000}} width="200">
            P6 Unique ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="weekNo" filter={{type: 'TextFilter', delay:1000}} width="200">
            Week No
          </TableHeaderColumn>
          <TableHeaderColumn dataField="meeting_date" filter={{type: 'TextFilter', delay:1000}} width="200">
            Meeting Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="expected_meeting_date" filter={{type: 'TextFilter', delay:1000}} width="200">
            Expected Meeting Date
          </TableHeaderColumn>

          <Modal
                 open={this.state.modalIsOpen}
                 onClose={this.closeModal}
                 center
               >
                 <form onSubmit={this.handleEdit}>
                  <h3>Event Editor</h3>
                   <label>
                     Event_id:
                     <input
                       type="text"
                       value={this.state.Event_id}
                       className="form-control"
                       name="Event_id"
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
                     Event Name:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.event_name}
                       className="form-control"
                       name="event_name"
                     />
                   </label>

                   <label>
                     Event Type:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.event_type}
                       className="form-control"
                       name="event_type"
                     />
                   </label>

                   <label>
                     Description:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.description}
                       className="form-control"
                       name="description"
                     />
                   </label>
                   <label>
                      Event Location:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.event_location}
                       className="form-control"
                       name="event_location"
                     />
                   </label>
                   <label>
                     Month Reported in Table1:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.month_reported_in_table1}
                       className="form-control"
                       name="month_reported_in_table1"
                     />
                   </label>
                   <label>
                     Duration:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.duration}
                       className="form-control"
                       name="duration"
                     />
                   </label>
                   <label>
                     Event Status:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.event_status}
                       className="form-control"
                       name="event_status"
                     />
                   </label>
                   <label>
                     Travel Group:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.travel_group}
                       className="form-control"
                       name="travel_group"
                     />
                   </label>
                   <label>
                     P6 Unique Id:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.p6_uniqueid}
                       className="form-control"
                       name="p6_uniqueid"
                     />
                   </label>
                   <label>
                      Week No:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.weekNo}
                       className="form-control"
                       name="weekNo"
                     />
                   </label>
                   <label>
                     Meeting Date:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.meeting_date}
                       className="form-control"
                       name="meeting_date"
                     />
                   </label>
                   <label>
                     Expected Meeting Date:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.expected_meeting_date}
                       className="form-control"
                       name="expected_meeting_date"
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

export default EventTable;
