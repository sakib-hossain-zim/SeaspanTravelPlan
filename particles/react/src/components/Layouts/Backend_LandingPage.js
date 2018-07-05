import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExamplePanel from '../Helpers/ExamplePanel';
import Footer from '../Helpers/Footer';
import PageTitle from '../Helpers/PageTitle';
import Sidebar from '../Helpers/Sidebar';
import Toolbar from '../Helpers/Toolbar';

export default class Backend_LandingPage extends Component {
    render() {
        return(
          <div className="page-inner">



              <div className="main">


                <div className="content">
                 
                  {this.props.children}
                </div>


              </div>



          </div>
        );
    }
}

Backend_LandingPage.propTypes = {
  children: PropTypes.node.isRequired
}
