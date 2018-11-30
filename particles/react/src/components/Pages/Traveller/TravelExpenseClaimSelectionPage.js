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

class TravelExpenseClaimSelectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      otr_data:[],


      VSY_IndexNo: localStorage.getItem('VSY_IndexNo'),
      TravelPlan_id: localStorage.getItem('TravelPlan_id'),
      Event_id: localStorage.getItem('Event_id'),
      status3: "NOT CLAIMED",
      modalIsOpen: false,
      errorModalIsOpen: false,
        modalCannotSubmitIsOpen: false


    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openAlreadySubmittedModal = this.openAlreadySubmittedModal.bind(this);
    this.closeAlreadySubmittedModal = this.closeAlreadySubmittedModal.bind(this);
    this.openCannotSubmitAgainModal = this.openCannotSubmitAgainModal.bind(this);
    this.closeCannotSubmitAgainModal = this.closeCannotSubmitAgainModal.bind(this);

  }


  openModal() {

    this.setState({
      modalIsOpen: true,
    });

  }

  openAlreadySubmittedModal(){

    this.setState({
      errorModalIsOpen: true,
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

  closeAlreadySubmittedModal() {
    this.setState({
     errorModalIsOpen: false
    });
  }

  closeCannotSubmitAgainModal() {
    this.setState({
      modalCannotSubmitIsOpen: false
    });
  }



  onRowSelect = (row) => {
    var abcd = [];
    for(const prop in row){
      abcd.push(row[prop]);

      }
      console.log("reached here on click")
      localStorage.setItem('Travel_Auth_No',abcd[0]);
      localStorage.setItem('Request_Form_No',abcd[1]);
      localStorage.setItem('Event_id',abcd[2]);
      localStorage.setItem('TravelPlan_id',abcd[4]);
      localStorage.setItem('TravelExpenseSelection_TravellerName',abcd[8]);
      localStorage.setItem('TravelExpenseSelection_EventName',abcd[7]);
      localStorage.setItem('TravelExpenseSelection_TravelEndDate',abcd[5]);
      localStorage.setItem('TravelExpenseSelection_EventStartDate',abcd[10]);
      localStorage.setItem('TravelExpenseSelection_EventEndDate',abcd[11]);
      localStorage.setItem('TravelExpenseSelection_TravelStartDate',abcd[12]);
      localStorage.setItem('CategoryGSTHST', abcd[13]);



      if(abcd[14] === "REQUESTED"){
        this.openCannotSubmitAgainModal();
      }else {

      this.openModal();
    }

    }



  componentDidMount(){

      let self = this;
      fetch("/users/travelexpenseclaim_selectionpage/view/" + this.state.VSY_IndexNo, {
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
        <h4> You can now submit an expense claim for the following completed events </h4>
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
          <TableHeaderColumn dataField="status2_bool" filter={{type: 'TextFilter', delay:1000}} width="200">
              Travel Completion Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="travel_expense_claim_status" filter={{type: 'TextFilter', delay:1000}} width="250">
              Submission Status
          </TableHeaderColumn>

          <TableHeaderColumn dataField="nss_program" filter={{type: 'TextFilter', delay:1000}} width="200">
              Travel Program
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Event_id" filter={{type: 'TextFilter', delay:1000}} width="200">
             Event Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_name" filter={{type: 'TextFilter', delay:1000}} width="200">
              Event Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="travel_end_date" filter={{type: 'TextFilter', delay:1000}} width="200">
             Travel End Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="" filter={{type: 'TextFilter', delay:1000}} width="200">
             Approved Budget
          </TableHeaderColumn>

          <TableHeaderColumn isKey dataField="Travel_Auth_No" filter={{type: 'TextFilter', delay:1000}} width="200">
              Travel_Auth_No
          </TableHeaderColumn>
          <TableHeaderColumn  dataField="name" filter={{type: 'TextFilter', delay:1000}} width="200">
              Traveller Name
          </TableHeaderColumn>
          <TableHeaderColumn  dataField="" filter={{type: 'TextFilter', delay:1000}} width="200">
              Expense Claim Amount
          </TableHeaderColumn>



            <Modal
              open={this.state.modalIsOpen}
              onClose={this.closeModal}
              center
            >
            <br />



            <div><p>You will be redirected to the TravelExpenseClaimPage</p></div>
            <br />
            <br />

            <button  type= "submit"  >
            <a href= '/travelexpenseclaim' class="text-muted"> OK </a>
            </button>

            </Modal>


            <Modal
              open={this.state.modalCannotSubmitIsOpen}
              onClose={this.closeCannotSubmitAgainModal}
              center
            >
            <br />




            <p>You have already submitted a claim for this event.</p>


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





TravelExpenseClaimSelectionPage.propTypes = {
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
})(TravelExpenseClaimSelectionPage)
