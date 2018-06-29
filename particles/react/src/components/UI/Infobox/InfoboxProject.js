import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../UI/Button';
import { NavLink } from 'react-router-dom';

export default class InfoboxProject extends Component {
    render() {
        return (
            <div className="infobox">
                <div className="infobox-inner">
                    <div className="infobox-header">
                        <div className="infobox-header-content">
                            <h3>{this.props.project.name}</h3>
                            <h4>{this.props.project.client_name}</h4>
                        </div>

                        <div className="infobox-header-action">

                          <Button classes="button-default" to="/decisionPage" exact={true} activeClassName="active">

                              <span> Vote</span>
                          
                         </Button>

                        </div>
                    </div>

                    <div className="infobox-meta">
                        <ul>
                            <li>
                                <span>Voters</span>
                                <strong>{this.props.project.tasks}</strong>
                            </li>

                            <li>
                                <span>Days Left</span>
                                <strong>{this.props.project.days}</strong>
                            </li>

                            <li>
                                <span>Due</span>
                                <strong>{this.props.project.due}</strong>
                            </li>
                        </ul>
                    </div>

                    <div className="infobox-content">
                        <div className="infobox-content-avatars">
                            {/* <strong>Description:</strong> */}
                            <p>{this.props.project.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

InfoboxProject.propTypes = {
    project: PropTypes.object.isRequired
};
