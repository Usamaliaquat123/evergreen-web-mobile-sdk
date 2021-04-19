/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Container, Header, Content, Tab, Tabs, Left, Right, Title, Body,
} from 'native-base';
import Tab1 from '../Tabs/Tab1';
import Tab2 from '../Tabs/Tab2';
import Tab3 from '../Tabs/Tab3';

export default function TabContainer() {
  return (
      <Container>
        <Header hasTabs>
          <Left />
          <Body>
            <Title>Admin Controls</Title>
          </Body>
          <Right />
        </Header>
        <Tabs>
          <Tab heading="Tab1">
            <Tab1 />
          </Tab>
          <Tab heading="Tab2">
            <Tab2 />
          </Tab>
          <Tab heading="Tab3">
            <Tab3 />
          </Tab>
        </Tabs>
      </Container>
  );
}
