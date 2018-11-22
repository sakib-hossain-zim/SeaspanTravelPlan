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

class TravelExpenseClaimApprovalSelectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      te_data: [],


      modalIsOpen: false,
      errorModalIsOpen: false,
      category_GSTHST_treatment: localStorage.getItem('TravelExpenseClaim_TravellerCategory'),
      nss_program: localStorage.getItem('TravelExpenseClaimSelection_TravelProgram')


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

      localStorage.setItem('Coordinator_InvoiceNo',abcd[0]);
      localStorage.setItem('Coordinator_VSY_IndexNo', abcd[2]);
      localStorage.setItem('Coordinator_TravelPlan_id', abcd[3]);
      localStorage.setItem('Coordinator_Event_id', abcd[4]);
      this.openModal();

    }



  componentDidMount(){

      let self = this;
      fetch("/users/travelexpenseclaimselection_approval/view/" + this.state.category_GSTHST_treatment + "/" +this.state.nss_program , {
        method: "GET"
      })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad Response from server");
          }
          return response.json();
        })
        .then(function(te_data) {
          self.setState({ te_data: te_data.te_data });
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
      <div className="container" style={{marginTop:20}}>

        <div>
        <h4> Please select a Travel Expense Claim to review  </h4>

        <br />
        <br />

        <div>
          <BootstrapTable
            data={this.state.te_data}
            hover
            striped
            responsive
            exportCSV
            csvFileName="data.csv"
            selectRow={selectRowProp}
            height='350'
            scrollTop={'Bottom'}
          >
          <TableHeaderColumn isKey dataField="Invoice_No" filter={{type: 'TextFilter', delay:1000}} width="150">
            Travel Expense Claim No
          </TableHeaderColumn>
          <TableHeaderColumn  dataField="name" filter={{type: 'TextFilter', delay:1000}} width="200">
           Traveller Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="VSY_IndexNo" filter={{type: 'TextFilter', delay:1000}} width="100">
            Traveller Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_name" filter={{type: 'TextFilter', delay:1000}} width="200">
            Event Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="travel_end_date" filter={{type: 'TextFilter', delay:1000}} width="150">
            Travel End Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="claims_date" filter={{type: 'TextFilter', delay:1000}} width="150">
            Date requested
          </TableHeaderColumn>
          <TableHeaderColumn dataField="coordinator_approval" filter={{type: 'TextFilter', delay:1000}} width="150">
            Status
          </TableHeaderColumn>
            <Modal
              open={this.state.modalIsOpen}
              onClose={this.closeModal}
              center
            >
            <br />


            <div><p>Click "OK" to proceed to Item Approval Page.</p></div>
            <br />
            <br />

            <button  type= "submit"  >
            <a href= '/travelexpenseclaimapproval' class="text-muted"> OK </a>
            </button>

            </Modal>




          </BootstrapTable>
        </div>



        </div>



        </div>
        </div>
        </div>

              </Backend>
            );
          }

        }





TravelExpenseClaimApprovalSelectionPage.propTypes = {
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
})(TravelExpenseClaimApprovalSelectionPage)
