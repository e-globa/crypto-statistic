import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title } from "native-base";

import { StyleSheet } from 'react-native';
import AdMobBannerComponent from '../../Components/AdMobBannerComponent';

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { navigate } = this.props.navigation;
        return (
            <Content navigate={navigate}>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => {
                            navigate('DrawerOpen')
                        }}>
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>About</Title>
                    </Body>
                    <Right/>
                </Header>
                <Card>
                    <CardItem>
                        <Body>
                        <Text>Crypto statistic it is all about crypto currencies prices and percentage rates</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>App version 0.0.1-alpha</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text>We will do our best to add features you are looking for.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <AdMobBannerComponent/>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3B3738'
    }
});