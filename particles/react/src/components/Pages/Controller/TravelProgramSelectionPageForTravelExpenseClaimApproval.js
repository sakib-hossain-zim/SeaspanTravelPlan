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

class TravelProgramSelectionPageForTravelExpenseClaimApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
     data: [],
     travel_program: "",


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

      localStorage.setItem('TravelExpenseClaimSelection_TravelProgram',abcd[0]);



      this.openModal();

    }



  componentDidMount(){

      let self = this;
      fetch("/users/travelprogram/view" , {
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
      <div className="container" style={{marginTop:10}}>

        <div>
        <h4> Please select a Travel Program  </h4>

        <br />
        <br />

        <div style={{width: 552.5,
                  padding: 10,
                  border: 5,
                  margin: 0}}
                  >
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
          <TableHeaderColumn isKey dataField="travel_program" filter={{type: 'TextFilter', delay:1000}} width="500">
            Travel Program
          </TableHeaderColumn>
            <Modal
              open={this.state.modalIsOpen}
              onClose={this.closeModal}
              center
            >
            <br />


            <div><p>Click "OK" to go to the Traveller Type Selection.</p></div>
            <br />
            <br />

            <button  type= "submit"  >
            <a href= '/travellerTypeSelectionPage' class="text-muted"> OK </a>
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





TravelProgramSelectionPageForTravelExpenseClaimApproval.propTypes = {
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
})(TravelProgramSelectionPageForTravelExpenseClaimApproval)
