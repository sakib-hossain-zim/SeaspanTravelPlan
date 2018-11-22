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

class EditBudgetTravellerSelectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
     data: [],
     travelprogram: localStorage.getItem('BudgetEventSelection_TravelProgram'),
     Event_id: localStorage.getItem('BudgetEventSelection_Event_id'),
     event_name: localStorage.getItem('BudgetEventSelection_EventName'),


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


      localStorage.setItem('BudgetTravellerSelection_VSY_IndexNo', abcd[0]);
      localStorage.setItem('BudgetTravellerSelection_TravellerName', abcd[2]);
      localStorage.setItem('BudgetTravellerSelection_TravelStartDate', abcd[3]);
      localStorage.setItem('BudgetTravellerSelection_TravelEndDate', abcd[4]);
      
      



      this.openModal();

    }



  componentDidMount(){

      let self = this;
      fetch("/users/budgetedit_traveller_selection/view/" + this.state.Event_id , {
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
        .then(function(){
          console.log(self.state.Event_id);
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
        <h4> Please select a traveller  </h4>

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
          <TableHeaderColumn isKey dataField="VSY_IndexNo" filter={{type: 'TextFilter', delay:1000}} width="250">
            Traveller No
          </TableHeaderColumn>
          <TableHeaderColumn  dataField="event_name" filter={{type: 'TextFilter', delay:1000}} width="250">
           Event Name
          </TableHeaderColumn>
          <TableHeaderColumn  dataField="name" filter={{type: 'TextFilter', delay:1000}} width="250">
           Traveller Name
          </TableHeaderColumn>
        

            <Modal
              open={this.state.modalIsOpen}
              onClose={this.closeModal}
              center
            >
            <br />


            <div><p>Click "OK" to go to Budget Editor Page.</p></div>
            <br />
            <br />

            <button  type= "submit"  >
            <a href= '/viewAndEditBudget' class="text-muted"> OK </a>
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





EditBudgetTravellerSelectionPage.propTypes = {
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
})(EditBudgetTravellerSelectionPage)
