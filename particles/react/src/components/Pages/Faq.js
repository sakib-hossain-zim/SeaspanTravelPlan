import React, { Component } from 'react';

import Backend from '../Layouts/Backend';

export default class Invoice extends Component {
    render() {
        return (
            <Backend>
                <div className="content-inner">
                        <div className="invoice">
                            <div className="invoice-header">
                                <h1>Frequently Asked Questions</h1>
                            </div>


                  <table class="table table-bordered table-striped" id="pastvote_table">
                 <thead class="thead-dark">
                 <tr>
                 <th>Identifier</th>
                  <th>Vote Decision</th>
                  <th>Transaction Id</th>
                  <th>Time Stamp</th>
                  <th>New</th>
                  <th>Old</th>
                  <th>Auth</th>
                  <th>Time Stamp</th>
                  <th>New</th>
                  <th>Old</th>


                 </tr>
                     </thead>
             </table>


                  </div>
              </div>
            </Backend>
        );
    }
}
