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

class SelectTravellerPage extends Component {
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

      localStorage.setItem('Traveller_id_Selection',abcd[0]);
      this.openModal();

    }


    componentDidMount() {
      let self = this;
      fetch("/users/traveller/view", {
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
          console.log(data.data[0])
        })
        .catch(err => {
          console.log("caught it !, err");
        });
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

        <div>
        <h4> Please select the traveller  </h4>

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
          <TableHeaderColumn isKey dataField="VSY_IndexNo" filter={{type: 'TextFilter', delay:1000}} width="150">
            VSY_IndexNo
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name" filter={{type: 'TextFilter', delay:1000}} width="150">
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="location" filter={{type: 'TextFilter', delay:1000}} width="150">
            Location
          </TableHeaderColumn>
          <TableHeaderColumn dataField="company" filter={{type: 'TextFilter', delay:1000}} width="150">
            Company
          </TableHeaderColumn>
          <TableHeaderColumn dataField="labor_category" filter={{type: 'TextFilter', delay:1000}}  width="150">
            Labor Category
          </TableHeaderColumn>
          <TableHeaderColumn dataField="labor_rate" filter={{type: 'TextFilter', delay:1000}} width="150">
            Labor Rate
          </TableHeaderColumn>

            <Modal
              open={this.state.modalIsOpen}
              onClose={this.closeModal}
              center
            >
            <br />


            <div><p>Click "OK" to proceed to adding dates.</p></div>
            <br />
            <br />

            <button  type= "submit"  >
            <a href= '/addTraveller' class="text-muted"> OK </a>
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





SelectTravellerPage.propTypes = {
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
})(SelectTravellerPage)
