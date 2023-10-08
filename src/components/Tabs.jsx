import React from 'react';
import '../styles/tabs.css'
import { Tab, Nav } from 'react-bootstrap';
import InfluencerForm from './InfluencerForm';
import InfluencerList from './InfluencerList';
import Users from './Users';

function Tabs() {
  return (
    <Tab.Container id="my-tabs" defaultActiveKey="tab1">
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="tab1"><i class="bi bi-plus-circle"></i> Add Influencers</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab2"><i class="bi bi-people-fill"></i> Users</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab3"><i class="bi bi-person-fill"></i> Influencers</Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content>
        <Tab.Pane eventKey="tab1">
          <InfluencerForm/>
        </Tab.Pane>
        <Tab.Pane eventKey="tab2" className='influencers-tab'>
          <Users/>
        </Tab.Pane>
        <Tab.Pane eventKey="tab3">
         <InfluencerList/>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}

export default Tabs;
