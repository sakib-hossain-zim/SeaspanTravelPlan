import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return(
            <div className="navigation">
                <ul>
                    <li>
                        <NavLink to="/Dashboard" exact={true} activeClassName="active">
                             <i className="md-icon">dashboard</i> <span>Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/votes" activeClassName="active">
                            <i className="md-icon">folder_open</i> <span>Upcoming</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/past" activeClassName="active">
                            <i className="md-icon">done</i> <span>Past</span>
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
