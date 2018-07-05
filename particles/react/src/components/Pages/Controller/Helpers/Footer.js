import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-left">
                    &copy; 2018 Created by Seaspan Vancouver Shipyards. All rights reserved.
                </div>

                <div className="footer-right">
                    <ul>
                        <li>
                            <NavLink to="/faq">
                                FAQ
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/contact">
                                Contact
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        );
    }
}
