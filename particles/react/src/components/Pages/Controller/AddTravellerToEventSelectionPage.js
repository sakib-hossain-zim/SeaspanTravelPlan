import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Backend from './Layouts/Backend';
import { InfoboxProject } from './UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions';
import Loading from './Helpers/Loading';
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import Modal from "react-responsive-modal";

class AddTravellerToEventSelectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],


      modalIsOpen: false,
      errorModalIsOpen: false


    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);


  }


  openModal() {

    this.setState({
      modalIsOpen: true,
    });

  }




  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }





  onRowSelect = (row) => {
    var abcd = [];
    var check_error_Modal = false;

    for(const prop in row){
      abcd.push(row[prop]);

      }
      console.log("reached here on click")

      localStorage.setItem('Event_id_Selection',abcd[0]);
      this.openModal();

    }


    componentDidMount() {
      let self = this;
      fetch("/users/event/view", {
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



      <div className= "content-inner-mobilefix">
      <div className="content-side-wrapper">

        <div>
        <h4> Please select an Event you want to add a traveller to  </h4>

        <div>
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
            <br />


            <div><p>Click "OK" to proceed to selecting traveller page.</p></div>
            <br />
            <br />

            <button  type= "submit"  >
            <a href= '/selectTravellerPage' class="text-muted"> OK </a>
            </button>

            </Modal>




          </BootstrapTable>
        </div>



        </div>



        </div>
        </div>

              </Backend>
            );
          }

        }





AddTravellerToEventSelectionPage.propTypes = {
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
})(AddTravellerToEventSelectionPage)
