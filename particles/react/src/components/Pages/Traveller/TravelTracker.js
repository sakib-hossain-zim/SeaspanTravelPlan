import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Backend from './Layouts/Backend';
import { InfoboxProject } from './UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions';
import Loading from './Helpers/Loading';
import TravelPlanTable from "./Helpers/TravelPlanTable";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class TravelTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      VSY_IndexNo: localStorage.getItem('VSY_IndexNo')

    };

  }



  componentDidMount(){

      let self = this;
      fetch("/users/traveller/travelplan/" + this.state.VSY_IndexNo, {
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

  };

  render() {
    return (
      this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
      <Backend>



      <div className= "content-inner">
      <div className="content-side-wrapper">

        <div>
        <h4> Travel Plan Viewer </h4>
        <div className="container" style={{marginTop:20}}>
          <TravelPlanTable data={this.state.data} />
        </div>
        </div>



        </div>
        </div>

              </Backend>
            );
          }

        }





TravelTracker.propTypes = {
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
})(TravelTracker)
