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

                                <table>
                                  <thead>
                                    <tr>
                                      <th>Question</th>
                                      <th>Answer</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    

                                  </tbody>
                                </table>

                  </div>
              </div>
            </Backend>
        );
    }
}
