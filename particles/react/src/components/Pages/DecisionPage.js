import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import { InfoboxProject } from '../UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../actions';
import Loading from '../Helpers/Loading';


class Decision extends Component {


  handleClick() {
   let speech = 'Are you sure?';

   alert(speech);
 }


    render() {
        return (
            this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
            <Backend>
                <div className="content-inner">
                    <h1> Do you accept changes to the financial statements? </h1>
                    <div className="projects">
                    <button  bsSize="large" onClick={this.handleClick} >
                  YES
                    </button>

                    <button  bsSize="large" onClick={this.handleClick} >
                  NO
                    </button>

                    </div>
                </div>
            </Backend>
        );
    }
}

Decision.propTypes = {
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
})(Decision)
