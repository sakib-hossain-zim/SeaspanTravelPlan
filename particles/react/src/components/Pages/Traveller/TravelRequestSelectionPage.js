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

class TravelRequestSelectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      otr_data:[],


      VSY_IndexNo: localStorage.getItem('VSY_IndexNo'),
      TravelPlan_id: localStorage.getItem('TravelPlan_id'),
      Event_id: localStorage.getItem('Event_id'),
      fetched_otr_date: "",
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
    var check_error_Modal = false;
    var self = this;
    for(const prop in row){
      abcd.push(row[prop]);

      }
      console.log("reached here on click")

      localStorage.setItem('TravelPlan_id',abcd[1]);
      localStorage.setItem('Event_id',abcd[0]);

      fetch("/users/otr/check/view/" + this.state.VSY_IndexNo + "/"+   abcd[1]  +"/"+ abcd[0] , {
        method: "GET"
      })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad Response from server");
          }
          return response.json();
        })
        .then(function(otr_data) {
          self.setState({
            otr_data: otr_data.otr_data
           });
        })
        .then(function() {
          const new_data = self.state.otr_data;
          self.setState({
            fetched_otr_date: new_data[0].request_date
           });

           console.log(self.state.fetched_otr_date);
        })
        .catch(err => {
          console.log("caught it !, err");
        })
        .then(function(){

      if(self.state.otr_data.length == 0){
        localStorage.setItem('TravelPlan_id',abcd[1]);
        localStorage.setItem('Event_id',abcd[0]);

        self.openModal();

      }else {
        self.openAlreadySubmittedModal();
      }

      })






    }



  componentDidMount(){

      let self = this;
      fetch("/users/traveller/event/" + this.state.VSY_IndexNo, {
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
        .then(function(){
          fetch("/users/otr/check/view/" + self.state.VSY_IndexNo + "/"+ self.state.TravelPlan_id+"/"+self.state.Event_id, {
            method: "GET"
          })
            .then(function(response) {
              if (response.status >= 400) {
                throw new Error("Bad Response from server");
              }
              return response.json();
            })
            .then(function(otr_data) {
              self.setState({ otr_data: otr_data.otr_data });
            })
            .catch(err => {
              console.log("caught it !, err");
            })

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
          <TableHeaderColumn dataField="otr_request_status" filter={{type: 'TextFilter', delay:1000}} width="200">
             Travel Request Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="meeting_date" filter={{type: 'TextFilter', delay:1000}} width="200">
            Meeting Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="nss_program" filter={{type: 'TextFilter', delay:1000}} width="175">
            Travel Plan Program
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_name" filter={{type: 'TextFilter', delay:1000}} width="200">
            Event Name
          </TableHeaderColumn>
          <TableHeaderColumn isKey dataField="Event_id" filter={{type: 'TextFilter', delay:1000}} width="200">
            Event ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_location" filter={{type: 'TextFilter', delay:1000}} width="150">
            Event Location
          </TableHeaderColumn>
          <TableHeaderColumn dataField="dummy_status" filter={{type: 'TextFilter', delay:1000}} width="200">
            Travel Request Approval Status
          </TableHeaderColumn>







            <Modal
              open={this.state.modalIsOpen}
              onClose={this.closeModal}
              center
            >
            <br />


            <div><p>Click "OK" to proceed with your travel authorization request.</p></div>
            <br />
            <br />

            <button  type= "submit"  >
            <a href= '/onlinetravelrequestform' class="text-muted"> OK </a>
            </button>

            </Modal>


            <Modal
              open={this.state.errorModalIsOpen}
              onClose={this.closeAlreadySubmittedModal}
              center
            >
            <br />

            <div><p>* You have already submitted a travel authorization request for this event on {this.state.fetched_otr_date} . Please check back on approval status within three business days from request date. <a href = '/approvedtravelplan' class = "text-muted"> Click Here</a> to go to the travel authorization status page. </p></div>
            <br />
            <br />
            <br />
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





TravelRequestSelectionPage.propTypes = {
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
})(TravelRequestSelectionPage)
