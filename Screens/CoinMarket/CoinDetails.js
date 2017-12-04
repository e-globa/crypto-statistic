import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View,Title } from "native-base";
import {StyleSheet, Image} from 'react-native';
import {getPrices} from '../../Request/Coinmarket';
export default class CoinDetails extends React.Component {
    constructor(props) {
        super(props);
        let coin = this.props.navigation.state.params.coin;
        this.state = {
            prices: []
        };

        let pricesArr = getPrices(coin.id);
        pricesArr.forEach(promise => {
            promise.then(obj => {
                this.setState(prev => {
                    prev.prices.push(obj);
                    return prev;
                });

            });
        });
    }

    render() {
        let coin = this.props.navigation.state.params.coin;
        return (
            <Content style={{flex: 0}}>
                <Header>
                    <Left>
                        <Button transparent  onPress={() => {this.props.navigation.goBack()}}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Coin overview</Title>
                    </Body>
                    <Right />
                </Header>
                <CoinTitle coin={coin}/>
                <PercentageInfo coin={coin}/>
                <Prices coin={coin} prices={this.state.prices}/>
            </Content>
        );
    }
}

class CoinTitle extends React.Component {
    render () {
        let coin = this.props.coin;
        return (
            <Card style={styles.centredCard}>
                <CardItem>
                        <Image style={styles.icon} source={{uri: coin.imgUrl }}/>
                </CardItem>
                <CardItem>
                    <Text style={styles.textLabel}>{coin.name}</Text>
                </CardItem>
                <CardItem style={{marginTop: -13}}>
                    <Text note style={styles.textLabel}>{coin.symbol}</Text>
                </CardItem>
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
            <CardItem style={{paddingLeft: 15, paddingTop: 10, paddingRight: 15}} key={rate.title}>
                <Body>
                    <Text>{rate.title}</Text>
                </Body>
                <Right>
                    { (rate.rate > 0)
                        ?  <Text style={styles.coinRise} note>{rate.rate} %</Text>
                        :  <Text style={styles.coinDown} note>{rate.rate} %</Text>
                    }
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
        let prices = this.props.prices;
        let rates = [
            {title: "USD", rate: coin.price_usd},
            {title: "BTC", rate: coin.price_btc},
            ...prices
        ];

        let cardItemView = ((rate) =>
            <CardItem style={{paddingLeft: 15, paddingTop: 10, paddingRight: 15}} key={rate.title}>
                <Body>
                    <Text style={styles.price}>{rate.title}</Text>
                </Body>
                <Right>
                    <Text style={styles.price}>{parseFloat(rate.rate).toLocaleString('en-EN',{ style: 'currency', currency: rate.title,minimumFractionDigits: 3, maximumFractionDigits: 3 })}</Text>
                </Right>
            </CardItem>);

        if (!prices.length) return <Spinner />;

        return (
            <Card>
                <H3 style={{paddingLeft: 15, paddingTop: 10}}>Prices:</H3>
                {rates.map(cardItemView)}
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    coinRise: {
        color: 'green'
    },
    coinDown: {
        color: 'red'
    },
    price: {
        color: '#67BCDB'
    },
    textLabel: {
        color: '#67BCDB'
    },
    icon: {
        width: 75,
        height: 75
    },
    centredCard: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});