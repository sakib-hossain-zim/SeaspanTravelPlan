import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class TravelPlanTable extends Component {
  render() {
    return (
      <div>
        <BootstrapTable
          data={this.props.data}
          hover
          striped
          responsive
          exportCSV
          csvFileName="travelplan.csv"
        >
          <TableHeaderColumn isKey dataField="TravelPlan_id" width="200">
            Travel Plan
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Event_id" width="200">
            Event Id
          </TableHeaderColumn>
          <TableHeaderColumn  dataField="VSY_IndexNo" width="200">
            VSY Index No
          </TableHeaderColumn>

          <TableHeaderColumn dataField="start_date" width="200">
            Start Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="end_date" width="200">
            End Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="source" width="200">
            Source
          </TableHeaderColumn>
          <TableHeaderColumn dataField="destination" width="200">
            Destination
          </TableHeaderColumn>
          <TableHeaderColumn dataField="travel_status_bool" width="200">
            Travel Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="approval_status" width="200">
            Approval Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="travel_period" width="200">
            Travel Period
          </TableHeaderColumn>
          <TableHeaderColumn dataField="contract" width="200">
            Contract
          </TableHeaderColumn>
          <TableHeaderColumn dataField="phase" width="200">
            Phase
          </TableHeaderColumn>
          <TableHeaderColumn dataField="nss_program" width="200">
            NSS Program
          </TableHeaderColumn>
          <TableHeaderColumn dataField="planned_budget" width="200">
            Planned Budget
          </TableHeaderColumn>
          <TableHeaderColumn dataField="e1_business_unit" width="200">
            E1 Business Unit
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default TravelPlanTable;
