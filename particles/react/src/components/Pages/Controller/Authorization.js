import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backend from './Layouts/Backend';
import { InfoboxProject } from './UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions';
import Loading from './Helpers/Loading';
import Box from './UI/Box';

class Authorization extends Component {
     componentWillMount() {
         this.props.dispatch(actionCreators.fetchProjects());
     }

    render() {


        return (
            this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
            <Backend>
            <Box classes="side-margins new">
            <button type = "submit" className = "button-new"  bsSize="large" >
             <a href= '/onlinetravelrequestapproval' class="text-muted"> Online Travel Requests </a>
               </button>
               <span>   </span>
               <button  type= "submit" className = "button-new" bsSize="large"  >
             <a href= '/controllerloginpage' class="text-muted"> Travel Expense Claims </a>
               </button>
               </Box>
            </Backend>
        );
    }
}

Authorization.propTypes = {
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
})(Authorization)
