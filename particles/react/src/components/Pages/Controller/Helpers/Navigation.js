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
                        <NavLink to="/travelplan" class="text-muted" activeClassName="active">
                            <i className="md-icon">add</i> <span>Create Travel Plan</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/eventSelectionPage" class="text-muted" activeClassName="active">
                            <i className="md-icon">add</i> <span>Create Event</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/createTraveller" class="text-muted" activeClassName="active">
                            <i className="md-icon">create</i> <span>Create Traveller Profile</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/addTravellerToEventSelectionPage" class="text-muted" activeClassName="active">
                            <i className="md-icon">add</i> <span>Add Traveller to Event</span>
                        </NavLink>
                    </li>


                    <li>
                        <NavLink to="/budgetSelectionPage" class="text-muted" activeClassName="active">
                            <i className="md-icon">create</i> <span>Create Budget</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/editBudgetSelectionPage" class="text-muted" activeClassName="active">
                            <i className="md-icon">add</i> <span>View/Edit Budget</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/onlinetravelrequestSelectionPage" class="text-muted" activeClassName="active">
                            <i className="md-icon">done</i> <span>Process Travel Authorization Requests</span>
                        </NavLink>
                     </li>
                     <li>
                         <NavLink to="/travelStatusUpdate" class="text-muted" activeClassName="active">
                             <i className="md-icon">create</i> <span>Update Travel Status</span>
                         </NavLink>
                      </li>
                    <li>
                        <NavLink to="/travelProgramSelectionPageForTravelExpenseClaimApproval" class="text-muted" activeClassName="active">
                            <i className="md-icon">done</i> <span>Process Expense Claims</span>
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
