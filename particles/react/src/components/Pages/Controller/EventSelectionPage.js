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

class EventSelectionPage extends Component {
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

      localStorage.setItem('TravelPlan_id_Contoller',abcd[0]);
      this.openModal();

    }



  componentDidMount(){

      let self = this;
      fetch("/users/travelplan/view" , {
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


  };

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
        <h4> Please select a Travel Plan you want to create an event for  </h4>

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
          <TableHeaderColumn dataField="e1_business_unit" filter={{type: 'TextFilter', delay:1000}} width="200">
            E1 Business Unit
          </TableHeaderColumn>
            <Modal
              open={this.state.modalIsOpen}
              onClose={this.closeModal}
              center
            >
            <br />


            <div><p>Click "OK" to proceed to event creation page.</p></div>
            <br />
            <br />

            <button  type= "submit"  >
            <a href= '/event' class="text-muted"> OK </a>
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





EventSelectionPage.propTypes = {
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
})(EventSelectionPage)
