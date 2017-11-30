import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Title } from "native-base";
import {Image} from 'react-native';

export default class Drawer extends React.Component {
    constructor(props) {
        super(props);

        const { navigate } = this.props.navigation;

        this.state = {
            selectedModule: 'CoinMarketModule',
            navigate: navigate
        };

        this.setModule = this.setModule.bind(this);
    }

    setModule(module) {
        this.state.navigate(module);
        this.setState((prev) => {
            prev.selectedModule = module;
            return prev;
        });
    }

    render() {
        return (
            <View>
                <Header style={{backgroundColor: 'white'}}>
                    <Left>
                        <Image name='menu'  style={{width: 76, height: 74}} />
                    </Left>
                    <Body />
                </Header>
                <List>
                    <ListItem itemDivider={this.state.selectedModule === 'CoinMarketModule'} button noBorder onPress={() => this.setModule('CoinMarketModule')}>
                        <Left>
                            <Icon name="trending-up" />
                            <Body>
                            <Text>Coin Market</Text>
                            </Body>
                        </Left>
                    </ListItem>

                    <ListItem itemDivider={this.state.selectedModule === 'AboutModule'} button noBorder onPress={() => this.setModule('AboutModule')}>
                        <Left>
                            <Icon name="question" />
                            <Body>
                            <Text>About</Text>
                            </Body>
                        </Left>
                    </ListItem>
                </List>
            </View>
        );
    }
}