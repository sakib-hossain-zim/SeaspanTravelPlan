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

class TravelStatusUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
     data: [],
     Travel_Auth_No: "",
     VSY_IndexNo: "",
     Event_id: "",
     travel_end_date: "",
     status2_bool: "",



      modalIsOpen: false,
      errorModalIsOpen: false


    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.logChange = this.logChange.bind(this);
    this.handleEditStatus = this.handleEditStatus.bind(this);
    this.handleEditDate = this.handleEditDate.bind(this);


  }


  openModal(abcd) {

    this.setState({
      modalIsOpen: true,
      Travel_Auth_No: abcd[0],
      Event_id: abcd[1],
      VSY_IndexNo: abcd[2],
      travel_end_date: abcd[3],
      status2_bool: abcd[4]

    });




  }




  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value //setting value edited by the admin in state.
    });
  }





  onRowSelect = (row) => {
    var abcd = [];
    var check_error_Modal = false;

    for(const prop in row){
      abcd.push(row[prop]);

      }
      console.log("reached here on click")
      this.openModal(abcd);
      console.log(abcd[1]);
      console.log(abcd[2]);

    }





  componentDidMount(){

    var today= new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10){
      dd= '0'+dd
    }
    if(mm<10){
      mm = '0'+ mm
    }

    today = yyyy + '-'+mm+'-'+dd;

      let self = this;
      fetch("/users/travel_status_update/view/" + today ,{
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
          console.log(self.state.VSY_IndexNo);
        })
        .catch(err => {
          console.log("caught it !, err");
        })

  };


  handleEditStatus(event) {
    var self = this;

    var auth_data = {
      Travel_Auth_No: this.state.Travel_Auth_No,
      status2_bool: this.state.status2_bool
    };

          fetch("/users/edit_travel_status", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(auth_data)

          })
          .then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
          })


  }


  handleEditDate(event){
    var self = this;
    var change_data = {
      VSY_IndexNo: this.state.VSY_IndexNo,
      Event_id: this.state.Event_id,
      travel_end_date: this.state.travel_end_date
    };

    fetch("/users/edit_travel_end_date", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(change_data)

    })
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })

  }






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
        <h4> Please select a Travellers travel event to review and update</h4>

        <br />
        <br />

        <div style={{width: 1055,
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
          <TableHeaderColumn  isKey dataField="travel_end_date" filter={{type: 'TextFilter', delay:1000}} width="200">
            Travel End Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="status2_bool" filter={{type: 'TextFilter', delay:1000}} width="200">
            Travel Completion Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Event_id" filter={{type: 'TextFilter', delay:1000}} width="200">
            Event Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="event_name" filter={{type: 'TextFilter', delay:1000}} width="200">
            Event Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name" filter={{type: 'TextFilter', delay:1000}} width="200">
            Traveller Name
          </TableHeaderColumn>


          <Modal
                 open={this.state.modalIsOpen}
                 onClose={this.closeModal}
                 center
               >
               <br />

                 <form onSubmit={this.handleEditStatus}>

                <label>
                     Travel Completion Status:
                     <input
                       type="text"
                       onChange={this.logChange}
                       value={this.state.status2_bool}
                       className="form-control"
                       name="status2_bool"

                      />
               </label>
                   <div className="submit-section">
                     <button>CONFIRM</button>
                   </div>
                 </form>
                 <form onSubmit={this.handleEditDate}>
                 <label>
                      Travel End Date:
                      <input
                        type="text"
                        onChange={this.logChange}
                        value={this.state.travel_end_date}
                        className="form-control"
                        name="travel_end_date"
                       />
                </label>

                   <div className="submit-section">
                     <button>CONFIRM</button>
                   </div>
                 </form>
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





TravelStatusUpdate.propTypes = {
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
})(TravelStatusUpdate)
