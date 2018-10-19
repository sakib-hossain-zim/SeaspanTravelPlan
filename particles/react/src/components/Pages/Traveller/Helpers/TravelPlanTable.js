import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import Modal from "react-responsive-modal";

class TravelPlanTable extends Component {

  constructor(props){

    super(props);
    this.state = {
      modalIsOpen: false,
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
      event_start_date: "",
      event_end_date: "",
      event_start_date: ""
    }

      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);

  }


  openModal(row,abcd) {

    this.setState({
      modalIsOpen: true,

      Event_id: abcd[1],
      TravelPlan_id: abcd[0],
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
      expected_meeting_date: abcd[13],
      event_start_date: abcd[14],
    
    });

  }


  closeModal() {
    this.setState({
      modalIsOpen: false,

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
          csvFileName="travelplan.csv"
          selectRow={selectRowProp}
          height='350'
          scrollTop={'Bottom'}
        >
        <TableHeaderColumn dataField="nss_program" width="150">
          Travel Plan Program
        </TableHeaderColumn>
          <TableHeaderColumn isKey dataField="TravelPlan_id" width="150">
            Travel Plan ID
          </TableHeaderColumn>
          <TableHeaderColumn  dataField="event_name" width="150">
            Event Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Event_id" width="150">
            Event Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="start_date" width="150">
            Start Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="end_date" width="150">
            End Date
          </TableHeaderColumn>

          <TableHeaderColumn dataField="destination" width="150">
            Destination
          </TableHeaderColumn>


          <Modal
                 open={this.state.modalIsOpen}
                 onClose={this.closeModal}
                 center
               >


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
                       value={this.state.TravelPlan_id}
                       className="form-control"
                       name="TravelPlan_id"

                     />
                   </label>
                   <label>
                     Event Name:
                     <input
                       type="text"
                       value={this.state.event_name}
                       className="form-control"
                       name="event_name"

                     />
                   </label>
                   <label>
                     Event Type:
                     <input
                       type="text"
                       value={this.state.event_type}
                       className="form-control"
                       name="event_type"

                     />
                   </label>
                   <label>
                     Description:
                     <input
                       type="text"
                       value={this.state.description}
                       className="form-control"
                       name="desciption"

                     />
                   </label>

                   <label>
                     Event Location:
                     <input
                       type="text"
                       value={this.state.event_location}
                       className="form-control"
                       name="event_location"
                     />
                    </label>

                    <label>
                      Month Reported in Month 1:
                      <input
                        type="text"
                        value={this.state.month_reported_in_table1}
                        className="form-control"
                        name="month_reported_in_table1"
                      />
                    </label>

                    <label>
                      Duration:
                      <input
                        type="text"
                        value={this.state.duration}
                        className="form-control"
                        name="duration"
                      />
                    </label>

                    <label>
                      Event Status:
                      <input
                        type="text"
                        value={this.state.event_status}
                        className="form-control"
                        name="event_status"
                      />
                    </label>

                    <label>
                      Travel Group:
                      <input
                        type="text"
                        value={this.state.travel_group}
                        className="form-control"
                        name="travel_group"
                      />
                    </label>

                    <label>
                      P6 Unique Id:
                      <input
                        type="text"
                        value={this.state.p6_uniqueid}
                        className="form-control"
                        name="p6_uniqueid"
                      />
                    </label>

                    <label>
                      Week No:
                      <input
                        type="text"
                        value={this.state.weekNo}
                        className="form-control"
                        name="weekNo"
                      />
                    </label>

                    <label>
                      Meeting Date:
                      <input
                        type="text"
                        value={this.state.meeting_date}
                        className="form-control"
                        name="meeting_date"
                      />
                    </label>

                    <label>
                      Expected Meeting Date:
                      <input
                        type="text"
                        value={this.state.expected_meeting_date}
                        className="form-control"
                        name="expected_meeting_date"
                      />
                    </label>

                    <label>
                      Event Start Date:
                      <input
                        type="text"
                        value={this.state.event_start_date}
                        className="form-control"
                        name="event_start_date"
                      />
                    </label>

                    <label>
                      Event End Date:
                      <input
                        type="text"
                        value={this.state.event_end_date}
                        className="form-control"
                        name="event_end_date"
                      />
                    </label>


               </Modal>

        </BootstrapTable>
      </div>
    );
  }
}

export default TravelPlanTable;
