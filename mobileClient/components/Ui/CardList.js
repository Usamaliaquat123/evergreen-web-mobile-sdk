import React from 'react';
import {
  Container, Header, Content, Card, CardItem, Text, Icon, Right,
} from 'native-base';

export default function CardList() {
  return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Icon active name="arrow-down" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
        </Content>
      </Container>
  );
}
