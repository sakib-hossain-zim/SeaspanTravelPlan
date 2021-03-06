import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return(
            <div className="navigation">
                <ul>
                    <li>
                        <NavLink to="/TravellerDashboard" class="text-muted" exact={true} activeClassName="active">
                             <i className="md-icon">dashboard</i> <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/TravelTracker" class="text-muted" activeClassName="active">
                            <i className="md-icon">find_in_page</i> <span>View Travel Plan Events</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/TravelRequestSelectionPage" class="text-muted" activeClassName="active">
                            <i className="md-icon">library_books</i> <span>Request Travel Auth</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/ApprovedTravelPlan" class="text-muted" activeClassName="active">
                            <i className="md-icon">done</i> <span>View Request Status</span>
                        </NavLink>
                    </li>


                    <li>
                        <NavLink to="/TravelExpenseClaimSelectionPage" class="text-muted" activeClassName="active">
                            <i className="md-icon">library_books</i> <span>Submit Expense Claim</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/ViewExpenseClaimStatus" class="text-muted" activeClassName="active">
                            <i className="md-icon">library_books</i> <span>View Travel Expense Claim Status</span>
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
