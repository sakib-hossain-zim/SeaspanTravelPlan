import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return(
            <div className="navigation">
                <ul>
                    <li>
                        <NavLink to="/TravellerDashboard" exact={true} activeClassName="active">
                             <i className="md-icon">dashboard</i> <span>Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/TravelTracker" activeClassName="active">
                            <i className="md-icon">folder_open</i> <span>Travel Explorer</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/FormSubmission" activeClassName="active">
                            <i className="md-icon">folder_open</i> <span>Forms</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/ApprovedTravelPlan" activeClassName="active">
                            <i className="md-icon">done</i> <span>Approved</span>
                        </NavLink>
                    </li>




                </ul>

                {/* <strong>Additional Links</strong>

                <ul>
                    <li>
                        <NavLink to="/login" activeClassName="active">
                            <i className="md-icon">arrow_forward</i> <span>Login</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/icons" activeClassName="active">
                            <i className="md-icon">grid_on</i> <span>Icons</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/forms" activeClassName="active">
                            <i className="md-icon">input</i> <span>Forms</span>
                        </NavLink>
                    </li>
                </ul> */}
            </div>
        );
    }
}
