import React, { Component } from 'react';

import Stat, { StatsWrapper } from './UI/Stat';
import Progress, { ProgressWrapper } from './UI/Progress';
import Box from './UI/Box';

// eslint-disable-next-line
import Card, { CardsWrapper } from './UI/Card';

import Backend from './Layouts/Backend';

// eslint-disable-next-line
import Chart from './Helpers/ChartBars';
import PageHeader from './Helpers/PageHeader';

export default class TravellerDashboard extends Component {
    render() {
        return (
            <Backend>
                <div className="content-inner no-padding-top no-padding-left no-padding-right">
                    <PageHeader/>

                    <Box classes="border-bottom side-margins vertical-distance">
                        <StatsWrapper>
                            <Stat title="Travel Plan Update" subtitle="Travel Plans assigned to you"  value="2" labelClass="raising"/>
                            <Stat title="Approval" subtitle="Travel Request Form Approvals"  value="1" labelClass="raising"/>
                            <Stat title="Forms" subtitle="New Travel Expense Claim Form Available" value="2" />
                            <Stat title="Pending" subtitle="Pending for approval" value="1"/>
                        </StatsWrapper>
                    </Box>



                    {/* <Box title="Bar Chart Using Chartist Library" classes="border-bottom side-margins">
                        <Chart/>
                    </Box> */}

                    {/* <Box title="Most Recently Uploaded Files" classes="side-margins">
                        <CardsWrapper>
                            <Card title="Eraesent ut ex a felis imperdiet mollis sit amet nec erat"
                                  subtitle="Quisque tristique erat ut volutpat vehicula"
                                  image="/img/tmp/listing-1.jpg"
                                  date="14/07/2017 13:15"/>

                            <Card title="Eraesent ut ex a felis imperdiet mollis sit amet nec erat"
                                  subtitle="Quisque tristique erat ut volutpat vehicula"
                                  image="/img/tmp/listing-2.jpg"
                                  date="14/07/2017 12:30"/>

                            <Card title="Eraesent ut ex a felis imperdiet mollis sit amet nec erat"
                                  subtitle="Quisque tristique erat ut volutpat vehicula"
                                  filetype="picture_as_pdf"
                                  date="14/07/2017 12:30"/>

                            <Card title="Eraesent ut ex a felis imperdiet mollis sit amet nec erat"
                                  subtitle="Quisque tristique erat ut volutpat vehicula"
                                  filetype="image"
                                  date="14/07/2017 13:15"/>

                            <Card title="Eraesent ut ex a felis imperdiet mollis sit amet nec erat"
                                  subtitle="Quisque tristique erat ut volutpat vehicula"
                                  filetype="image"
                                  date="14/07/2017 13:15"/>
                        </CardsWrapper>
                    </Box> */}
                </div>
            </Backend>
        );
    }
}
