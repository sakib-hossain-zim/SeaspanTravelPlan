import React, { Component } from 'react';

import Empty from '../Layouts/Empty';

export default class Login extends Component {
    render() {
        return (
            <Empty>
                <h1>Register an account</h1>

                <form>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password"  className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Re-type Password</label>
                        <input type="password" name="password"  className="form-control"/>
                    </div>                    

                    <div className="form-group form-group-button" style={{flex: 1}}>
                        <button type="submit" className="button button-primary button-right">Creat Account</button>
                    </div>

                    <div className="form-group">
                        <div className="form-group-button-description">
                            <a href="/login">Already have an account? Log in here</a>
                        </div>
                    </div>  

                </form>
            </Empty>
        );
    }
}
