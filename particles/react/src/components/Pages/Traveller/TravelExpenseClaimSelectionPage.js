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
      errorModalIsOpen: false


    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openAlreadySubmittedModal = this.openAlreadySubmittedModal.bind(this);
    this.closeAlreadySubmittedModal = this.closeAlreadySubmittedModal.bind(this);

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



  onRowSelect = (row) => {
    var abcd = [];
    for(const prop in row){
      abcd.push(row[prop]);

      }
      console.log("reached here on click")
      localStorage.setItem('Travel_Auth_No',abcd[0]);
      localStorage.setItem('Request_Form_No',abcd[1]);
      localStorage.setItem('Event_id',abcd[7]);
      localStorage.setItem('TravelPlan_id',abcd[6]);
      this.openModal();

    }



  componentDidMount(){

      let self = this;
      fetch("/users/authorizationplan_otr/check/view/" + this.state.VSY_IndexNo + "/" + this.state.status3, {
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
          <TableHeaderColumn dataField="Travel_Auth_no" filter={{type: 'TextFilter', delay:1000}} width="200">
              Travel Completion Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Travel_Auth_no" filter={{type: 'TextFilter', delay:1000}} width="200">
              Travel Program
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Travel_Auth_no" filter={{type: 'TextFilter', delay:1000}} width="200">
             Event Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Travel_Auth_no" filter={{type: 'TextFilter', delay:1000}} width="200">
              Event Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Travel_Auth_no" filter={{type: 'TextFilter', delay:1000}} width="200">
             Travel End Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Travel_Auth_no" filter={{type: 'TextFilter', delay:1000}} width="200">
             Approved Budget
          </TableHeaderColumn>

          <TableHeaderColumn isKey dataField="Travel_Auth_no" filter={{type: 'TextFilter', delay:1000}} width="200">
              Travel_Auth_No
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
