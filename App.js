import React, { Component } from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Content, Text, Footer, FooterTab } from 'native-base';
import {price, priceMulti,coinList} from 'cryptocompare';
import CoinmarketList from './Screens/CoinmarketList';
export default class App extends Component {
  render() {
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                <Title>Header</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <CoinmarketList/>
            </Content>
            <Footer>
                <FooterTab>
                    <Button vertical active>
                        <Icon name="list" active/>
                        <Text>All</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="ios-star-outline" />
                        <Text>Favorites</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
  }
}
