import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backend from './Layouts/Backend';
import { InfoboxProject } from './UI/Infobox';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions';
import Loading from './Helpers/Loading';

class TravelPlanExplorer extends Component {
     componentWillMount() {
         this.props.dispatch(actionCreators.fetchProjects());
     }

    render() {
        let results = this.props.projects.map((project) => {
            return <InfoboxProject key={project.id} project={project} />
        });

        return (
            this.props.isFetching ? <Backend><div className="content-inner"><Loading /></div></Backend> :
            <Backend>
                <div className="content-inner-mobilefix">
                    <div className="projects">
                        {results}
                    </div>
                </div>
            </Backend>
        );
    }
}

TravelPlanExplorer.propTypes = {
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
})(TravelPlanExplorer)
