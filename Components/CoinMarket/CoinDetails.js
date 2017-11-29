import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";

export default class CoinDetails extends React.Component {
    render() {
        let coin = this.props.hero;
        let navigate = this.props.navigate;

        if (!coin) return <Spinner />;

        return (
            <Content style={{flex: 0}}>
                <CoinTitle coin={coin}/>
            </Content>
        );
    }
}

class CoinTitle extends React.Component {
    render () {
        let coin = this.props.coin;

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: coin.imgUrl }}/>
                        <Body>
                        <Text>{coin.name}</Text>
                        <Text note>{coin.symbol}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <PercentageInfo coin={coin}/>
                <Prices coin={coin}/>
            </Card>

        );
    }
}

class PercentageInfo extends React.Component {
    render () {
        let coin = this.props.coin;
        let rates = [
            {title: "1 h", rate: coin.percent_change_1h},
            {title: "24 h", rate: coin.percent_change_24h},
            {title: "1 week", rate: coin.percent_change_7d}
        ];
        let cardItemView = ((rate) =>
            <CardItem key={rate.title}>
                <Body>
                <Text>{rate.title}</Text>
                </Body>
                <Right>
                    <Text>{rate.rate}</Text>
                </Right>
            </CardItem>);

        return (
            <Card>
                <H3 style={{paddingLeft: 15, paddingTop: 10}}>Percentage info:</H3>
                {rates.map(cardItemView)}

            </Card>
        );
    }
}


class Prices extends React.Component {
    render () {
        let coin = this.props.coin;
        let rates = [
            {title: "BTC", rate: coin.price_usd},
            {title: "USD", rate: coin.price_btc}
        ];
        let cardItemView = ((rate) =>
            <CardItem key={rate.title}>
                <Body>
                <Text>{rate.rate}</Text>
                </Body>
                <Right>
                    <Text>{rate.title}</Text>
                </Right>
            </CardItem>);

        return (
            <Card>
                <H3 style={{paddingLeft: 15, paddingTop: 10}}>Prices:</H3>
                {rates.map(cardItemView)}
            </Card>
        );
    }
}
