import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Navigation from './Navigation';

export default class Toolbar extends Component {
    toggleActionsBodyClass() {
        document.body.classList.toggle('toolbar-actions-open');
    }

    toggleSearchBodyClass() {
        document.body.classList.toggle('toolbar-search-open');
    }

    render() {
        return (
            <div className="toolbar">
                <div className="toolbar-inner">
                    <div className="logo">
                        {/* <img src="/img/logo.svg" alt="" /> */}
                        <i className="md-icon">check</i>
                    </div>

                    <ul className="top">
                        <li>
                            <a onClick={this.toggleActionsBodyClass.bind(this)}>
                                <i className="md-icon">add</i>
                            </a>
                        </li>

                        {/* <li>
                            <a  onClick={this.toggleSearchBodyClass.bind(this)}>
                                <i className="md-icon">search</i>
                            </a>
                        </li> */}
                    </ul>

                    <Navigation />

                    <ul className="bottom">
                        <li>
                            <NavLink to="/login">
                                <i className="md-icon">perm_identity</i>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/logout">
                                <i className="md-icon">power_settings_new</i>
                            </NavLink>
                        </li>
                    </ul>

                    <div className="toolbar-search">
                        <div className="toolbar-slide-overlay" />

                        <div className="toolbar-slide-inner">
                            <div className="toolbar-slide-close" onClick={this.toggleSearchBodyClass.bind(this)}>
                                <i className="md-icon">close</i>
                            </div>

                            <div className="toolbar-slide-content">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Type to search site" />
                                </div>

                                <div className="toolbar-slide-results">
                                    <div className="toolbar-slide-result">
                                        <span>Vote</span>
                                        <strong>Association of Canadian Archavists</strong>
                                    </div>

                                    <div className="toolbar-slide-result">
                                        <span>Member</span>
                                        <strong>David H. Cherry</strong>
                                    </div>

                                    <div className="toolbar-slide-result">
                                        <span>Member</span>
                                        <strong>Nathanael J. Barrett</strong>
                                    </div>

                                    <div className="toolbar-slide-result">
                                        <span>Project</span>
                                        <strong>Internal Tools</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="toolbar-actions">
                        <div className="toolbar-slide-overlay" />

                        <div className="toolbar-slide-inner">
                            <div className="toolbar-slide-close" onClick={this.toggleActionsBodyClass.bind(this)}>
                                <i className="md-icon">close</i>
                            </div>

                            <div className="toolbar-slide-content">
                                <strong>Create New - Comming Soon</strong>

                                <ul>
                                    <li>
                                        <a>
                                            <i className="md-icon">create</i> <span>New Vote</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a>
                                            <i className="md-icon">message</i> <span>New Message</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a>
                                            <i className="md-icon">event_available</i> <span>New Event</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
