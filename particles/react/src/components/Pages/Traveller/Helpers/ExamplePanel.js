import React, { Component } from 'react';

// eslint-disable-next-line
import { Panel, PanelUser, PanelAction, PanelActionWrapper, PanelList, PanelListItem, PanelListTitle, PanelListWrapper } from '../UI/Panel';

export default class ExamplePanel extends Component {
    render() {
        return (
            <Panel>
                <PanelUser name="User Name" subtitle="Traveller" />

                <PanelListWrapper>

                    <PanelListTitle>Welcome to Seaspan Travel Portal!</PanelListTitle>

                    <PanelList>
                        <PanelListItem>Travel Plan Portal is your one stop travel planner and approval process tracker</PanelListItem>
                    </PanelList>

                    <PanelListTitle></PanelListTitle>



                </PanelListWrapper>

                {/* <PanelActionWrapper>
                    <PanelAction title="Create" icon="bookmark_border" />
                    <PanelAction title="Phone" icon="phone" />
                    <PanelAction title="Status" icon="show_chart" />
                    <PanelAction title="Search" icon="search" />
                    <PanelAction title="Create" icon="group_add" />
                    <PanelAction title="Chat" icon="chat_bubble_outline" />
                </PanelActionWrapper> */}
            </Panel>
        );
    }
}
