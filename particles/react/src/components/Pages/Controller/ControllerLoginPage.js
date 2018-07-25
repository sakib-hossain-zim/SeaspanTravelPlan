import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import Empty from './Layouts/Empty';

// eslint-disable-next-line
import { Button }  from './UI/Button';

export default class ControllerLoginPage extends Component {




    render() {

        return (
            <Empty>
                <h1>Travel Plan Portal Login</h1>

                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" name="password"  className="form-control"/>
                    </div>

                    <div className="form-group form-group-button">
                        <div className="form-group-button-description">
                            <a href="/forgot" class="text-muted">I forgot password</a>
                        </div>



                      <button className="button button-primary button-right">
                        <a href="/controllerDashboard" class="text-white">Login</a>
                        </button>


                    </div>

                    <div className="form-group">
                        <div className="form-group-button-description">
                            <a href="/register" class="text-muted">Not a member? Register here</a>
                        </div>
                    </div>

                </form>

                {/* <div className="form-description">
                    <Button to='#' classes="button-block button-google">Login using Google+</Button>
                    <Button to='#' classes="button-block button-facebook">Login using Facebook</Button>
                </div> */}
            </Empty>
        );
    }
}
