import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return(
            <div className="navigation">
                <ul>
                    <li>
                        <NavLink to="/controllerDashboard" class="text-muted" exact={true} activeClassName="active">
                             <i className="md-icon" >dashboard</i> <span>Home</span>
                        </NavLink>
                    </li>


                    <li>
                        <NavLink to="/event" class="text-muted" activeClassName="active">
                            <i className="md-icon">add</i> <span>Create Event</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/travelplan" class="text-muted" activeClassName="active">
                            <i className="md-icon">add</i> <span>Create Travel Plan</span>
                        </NavLink>
                    </li>


                    <li>
                        <NavLink to="/authorization" class="text-muted" activeClassName="active">
                            <i className="md-icon">done</i> <span>Approvals</span>
                        </NavLink>
                    </li>


                    <li>
                        <NavLink to="/travelplanviewer" class="text-muted" activeClassName="active">
                            <i className="md-icon">find_in_page</i> <span>Travel Plan Explorer</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/invoicing"  class="text-muted"activeClassName="active">
                            <i className="md-icon">insert_drive_file</i> <span>Invoice</span>
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
