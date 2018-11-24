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

class ViewExpenseClaimStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      otr_data:[],


      VSY_IndexNo: localStorage.getItem('VSY_IndexNo'),
      modalIsOpen: false,
      modalCannotSubmitIsOpen: false



    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openCannotSubmitAgainModal = this.openCannotSubmitAgainModal.bind(this);
    this.closeCannotSubmitAgainModal = this.closeCannotSubmitAgainModal.bind(this);

  }


  openModal() {

    this.setState({
      modalIsOpen: true,
    });

  }

  openCannotSubmitAgainModal() {

    this.setState({
      modalCannotSubmitIsOpen: true,
    });

  }




  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  closeCannotSubmitAgainModal() {
    this.setState({
      modalCannotSubmitIsOpen: false
    });
  }





  onRowSelect = (row) => {
    var abcd = [];
    var check_error_Modal = false;
    var self = this;
    for(const prop in row){
      abcd.push(row[prop]);

      }
        localStorage.setItem('ExpenseClaim_Invoice_No',abcd[0]);
        localStorage.setItem('ExpenseClaim_TravelPlan_id', abcd[3]);
        localStorage.setItem('ExpenseClaim_Event_id', abcd[4])
        localStorage.setItem('Current_Coordinato_Approval', abcd[5])

        if(abcd[5] === "REJECTED"){
        this.openModal();
      } else {
       this.openCannotSubmitAgainModal();
      }

    }



  componentDidMount(){

      let self = this;
      fetch("/users/traveller/travelexpenseclaim/view/" + this.state.VSY_IndexNo, {
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
        <br />

        <h4> Click on an event row to request authorization to travel </h4>

        <br />


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
          <TableHeaderColumn dataField="Invoice_No" filter={{type: 'TextFilter', delay:1000}} width="200">
             Travel Expense Claim No
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Travel_Auth_No" filter={{type: 'TextFilter', delay:1000}} width="200">
            Travel Auth No
          </TableHeaderColumn>
          <TableHeaderColumn dataField="VSY_IndexNo" filter={{type: 'TextFilter', delay:1000}} width="175">
            Traveller id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Event_id" filter={{type: 'TextFilter', delay:1000}} width="200">
            Event Id
          </TableHeaderColumn>
          <TableHeaderColumn isKey dataField="coordinator_approval" filter={{type: 'TextFilter', delay:1000}} width="200">
            Coordinator Approval Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="claims_date" filter={{type: 'TextFilter', delay:1000}} width="150">
            Claimed Date
          </TableHeaderColumn>







            <Modal
              open={this.state.modalIsOpen}
              onClose={this.closeModal}
              center
            >
            <br />


            <div><p>Click "OK" to proceed to rejected items page.</p></div>
            <br />
            <br />

            <button  type= "submit"  >
            <a href= '/travelExpenseClaimItemUpdatePage' class="text-muted"> OK </a>
            </button>

            </Modal>

            <Modal
              open={this.state.modalCannotSubmitIsOpen}
              onClose={this.closeCannotSubmitAgainModal}
              center
            >
            <br />


            <p> Your Expense Claim Submission is currently being reviewed. </p>



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





ViewExpenseClaimStatus.propTypes = {
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
})(ViewExpenseClaimStatus)
