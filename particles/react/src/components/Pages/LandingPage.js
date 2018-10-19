import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backend_LandingPage from '../Layouts/Backend_LandingPage';
import { InfoboxProject } from '../UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../actions';
import Loading from '../Helpers/Loading';
import PageTitle from '../Helpers/PageTitle'
import Box from '../UI/Box';
import PageHeader from '../Helpers/PageHeader'


class LandingPage extends Component {

  constructor(props){
    super(props);
    //bind the functions this instance

  }


  handleClick() {

    //Check1: Step1: Use the control number fetched from the forms (saved in variable) to query the sql database
   let speech = 'Are you sure?';

   alert(speech);
 }


    render() {
        return (

            <Backend_LandingPage>




                
                  <div className="content-inner padding-top padding-left no-padding-right">



                   <PageHeader/>



                   <div className="content-inner-mobilefix">


                   <Box classes="side-margins vertical-center">
                   <div><img src={require('../../media/logo.png')} alt="Seaspan_logo" style={{height: 50, marginLeft: 100,marginBottom: 30}}/></div>
                   <button type = "submit" className = "button-new"  bsSize="large" >
                    <a href= '/travellerloginpage' class="text-muted"> Traveller </a>
                      </button>
                      <span>   </span>
                      <button  type= "submit" className = "button-new" bsSize="large"  >
                    <a href= '/controllerloginpage' class="text-muted"> Coordinator </a>
                      </button>

                    </Box>





                </div>
                </div>
            </Backend_LandingPage>
        );
    }
  }


LandingPage.propTypes = {
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
})(LandingPage)
