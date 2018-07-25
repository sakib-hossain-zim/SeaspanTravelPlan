import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class EventTable extends Component {
  render() {
    return (
      <div>
        <BootstrapTable
          data={this.props.data}
          hover
          striped
          responsive
          exportCSV
          csvFileName="data.csv"
        >
          <TableHeaderColumn isKey dataField="Event_id" width="200">
            Event ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="TravelPlan_id" width="200">
            Travel Plan ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_name" width="200">
            Event Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_type" width="200">
            Event Type
          </TableHeaderColumn>
          <TableHeaderColumn dataField="description" width="400">
            Description
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_location" width="200">
            Event Location
          </TableHeaderColumn>
          <TableHeaderColumn dataField="month_reported_in_table1" width="200">
            Month Reported In Table 1
          </TableHeaderColumn>
          <TableHeaderColumn dataField="duration" width="200">
            Duration
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_status" width="200">
            Event Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="travel_group" width="200">
            Travel Group
          </TableHeaderColumn>
          <TableHeaderColumn dataField="p6_uniqueid" width="200">
            P6 Unique ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="weekNo" width="200">
            Week No
          </TableHeaderColumn>
          <TableHeaderColumn dataField="meeting_date" width="200">
            Meeting Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="expected_meeting_date" width="200">
            Expected Meeting Date
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default EventTable;
