import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CreateTravellerForm from "./Helpers/CreateTravellerForm";
import CreateTravellerTable from "./Helpers/CreateTravellerTable";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-responsive-modal";
import './Helpers/Event.css'


import PropTypes from 'prop-types';

import Backend from './Layouts/Backend';
import { InfoboxProject } from './UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions';
import Loading from './Helpers/Loading';

class CreateTraveller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      VSY_IndexNo: "",
      name: "",
      company: "",
      location: "",
      laborCategory: "",
      laborRate: ""

    };

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
      })
      .catch(err => {
        console.log("caught it !, err");
      });
  }

  render() {
    return (
      this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
      <Backend>



      <div className= "content-inner">
      <div className="content-side-wrapper">
      <h3>Create New Traveller</h3>
      <MuiThemeProvider>
      <div className="container">
      <CreateTravellerForm
      onSubmit={submission =>
        this.setState({
          data: [...this.state.data, submission]
        })}
        />

        </div>



        </MuiThemeProvider>
        <br />
        <br />


        <div className= 'card-event'>
        <div className= 'card-title-event'>Traveller Viewer </div>
        <div className='card-content'>

        <div className="container" style={{marginTop:20}}>
          <CreateTravellerTable data={this.state.data} />
        </div>

         </div>
        </div>



          </div>
          </div>


              </Backend>
            );
          }

        }






CreateTraveller.propTypes = {
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
})(CreateTraveller)
