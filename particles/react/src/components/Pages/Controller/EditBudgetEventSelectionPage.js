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

class EditBudgetEventSelectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
     data: [],
     travelprogram: localStorage.getItem('BudgetEventSelection_TravelProgram'),


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


      localStorage.setItem('BudgetEventSelection_Event_id', abcd[0]);
      localStorage.setItem('BudgetEventSelection_TravelPlan_id', abcd[4]);
      localStorage.setItem('BudgetEventSelection_TravelProgram', abcd[5]);
      localStorage.setItem('BudgetEventSelection_EventName', abcd[1]);
      localStorage.setItem('BudgetEventSelection_EventStartDate', abcd[2]);
      localStorage.setItem('BudgetEventSelection_EventEndDate', abcd[3]);



      this.openModal();

    }



  componentDidMount(){

      let self = this;
      fetch("/users/budgetedit_selection/view/" + this.state.travelprogram , {
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
      <div className="container" style={{marginTop:80}}>

        <div>
        <h4> Please select an Event Name  </h4>

        <br />
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
          <TableHeaderColumn isKey dataField="nss_program" filter={{type: 'TextFilter', delay:1000}} width="250">
            Travel Program
          </TableHeaderColumn>
          <TableHeaderColumn  dataField="event_name" filter={{type: 'TextFilter', delay:1000}} width="250">
           Event Name
          </TableHeaderColumn>
          <TableHeaderColumn  dataField="event_start_date" filter={{type: 'TextFilter', delay:1000}} width="250">
           Event Start Date
          </TableHeaderColumn>
          <TableHeaderColumn  dataField="event_end_date" filter={{type: 'TextFilter', delay:1000}} width="250">
           Event End Date
          </TableHeaderColumn>

            <Modal
              open={this.state.modalIsOpen}
              onClose={this.closeModal}
              center
            >
            <br />


            <div><p>Click "OK" to go Traveller Selection Page.</p></div>
            <br />
            <br />

            <button  type= "submit"  >
            <a href= '/editBudgetTravellerSelectionPage' class="text-muted"> OK </a>
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





EditBudgetEventSelectionPage.propTypes = {
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
})(EditBudgetEventSelectionPage)
