import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import Empty from './Layouts/Empty';

// eslint-disable-next-line
import { Button }  from './UI/Button';

export default class TravellerLoginPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      name: "",
      VSY_IndexNo: "",
      password: ""

    }
  }


  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });


    this.setState({
      [e.target.name]: e.target.value
    })

    localStorage.setItem('VSY_IndexNo',this.state.VSY_IndexNo);
    localStorage.setItem('traveller_name', this.state.name)
  };

  handlelogin = (e) => {
    e.preventDefault();
    var data = {
      VSY_IndexNo: this.state.VSY_IndexNo,
      password: this.state.password

    }

    let self = this;
    fetch("/users/login/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response){
        if(response.code === 204){
          throw new Error("Password doesnt match");
          self.props.history.push('/travellerloginpage',self.state)
        }
      })
      .then(function(data) {
        self.props.history.push('/travellerdashboard', self.state);
        console.log(data);
        if (data === "success") {
          this.setState({
            msg: "Item has been inserted."
          })
        }
      })
      .catch(err => {
        console.log("caught it !, err");
        window.alert("VSY_IndexNo and password do not match. Please try again.")
        self.props.history.push('/travellerloginpage',self.state);
      })
  };








    render() {

        return (
            <Empty>
                <h1>Travel Plan Portal Login</h1>

                <form>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" value={this.state.name}
                    onChange={e => this.change(e)}/>
                </div>

                    <div className="form-group">
                        <label>VSY_IndexNo</label>
                        <input type="text" name="VSY_IndexNo" className="form-control" value={this.state.VSY_IndexNo}
                        onChange={e => this.change(e)}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" name="password"  className="form-control" value={this.state.password}
                        onChange={e => this.change(e)}/>
                    </div>

                    <div className="form-group form-group-button">
                        <div className="form-group-button-description">
                            <a href="/forgot" class="text-muted" >I forgot password</a>
                        </div>



                      <button className="button button-primary button-right" onClick={e => this.handlelogin(e)}>
                        Login
                      </button>


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
