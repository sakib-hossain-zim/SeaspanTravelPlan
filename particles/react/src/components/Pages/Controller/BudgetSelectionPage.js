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

class BudgetSelectionPage extends Component {
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

      localStorage.setItem('BudgetSelection_VSY_IndexNo',abcd[1]);
      localStorage.setItem('BudgetSelection_Event_id', abcd[0]);
      localStorage.setItem('BudgetSelection_TravelPlan_id', abcd[7]);
      localStorage.setItem('BudgetSelection_TravellerName', abcd[9]);
      localStorage.setItem('BudgetSelection_TravelProgram', abcd[8]);
      localStorage.setItem('BudgetSelection_EventName', abcd[4]);
      localStorage.setItem('BudgetSelection_EventStartDate', abcd[5]);
      localStorage.setItem('BudgetSelection_EventEndDate', abcd[6]);
      localStorage.setItem('BudgetSelection_TravelStartDate', abcd[2]);
      localStorage.setItem('BudgetSelection_TravelEndDate', abcd[3]);


      this.openModal();

    }


    dateDiffInDays(a , b){
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1;
  }





  componentDidMount(){

      let self = this;
      fetch("/users/budget_selection/view" , {
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

    const self = this;


    function revertSortFunc(a, b, order) {   // order is desc or asc

      var date1 = new Date(a.travel_start_date);
      console.log(date1);
      var date2 = new Date(b.travel_start_date);
      var diffDays1 = self.dateDiffInDays(date1,date2);
      var diffDays2 = self.dateDiffInDays(date2,date1);


      if (order === 'desc') {
    return diffDays1;
  } else {
    return diffDays2;
  }
}





    return (
      this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
      <Backend>



      <div className= "content-inner-mobilefix">
      <div className="content-side-wrapper">
      <div className="container" style={{marginTop:20}}>

        <div>
        <h4> Please select a record to create budget for  </h4>

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
          <TableHeaderColumn dataField="name" filter={{type: 'TextFilter', delay:1000}} width="250">
            Traveller Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="travel_start_date" dataSort  sortFunc={ revertSortFunc } filter={{type: 'TextFilter', delay:1000}} width="250">
            Travel Start Date
          </TableHeaderColumn>
            <Modal
              open={this.state.modalIsOpen}
              onClose={this.closeModal}
              center
            >
            <br />


            <div><p>Click "OK" to go to Create Budget Page.</p></div>
            <br />
            <br />

            <button  type= "submit"  >
            <a href= '/confirmBudgetDetails' class="text-muted"> OK </a>
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





BudgetSelectionPage.propTypes = {
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
})(BudgetSelectionPage)
