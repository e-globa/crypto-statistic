import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon, H2 } from 'native-base';
import {StyleSheet} from 'react-native';
import { getCoinList} from '../Request/Coinmarket';
import { coinListObj} from '../Request/Cryptocompare';
export default class CoinmarketList extends Component {
    // noinspection JSAnnotator
    constructor (props) {
        super(props);

        this.state = {
            coinMarketCoinList: [],
            cryptoCompareCoinObj: {},
            percenSortOption: false,
            totalSortOption: false
        };
        coinListObj()
            .then(obj => {
                this.setState(prev => {
                    prev.cryptoCompareCoinObj = obj;
                    return prev;
                });
            });
        getCoinList()
            .then(arr => {
                this.setState(prev => {
                    prev.coinMarketCoinList = arr;
                    return prev;
                });
            });

        this.coinItemView = this.coinItemView.bind(this);
        this.sortCoinList = this.sortCoinList.bind(this);
        this.totalSortCoinList = this.totalSortCoinList.bind(this);
    }
    sortCoinList() {
        let arr = this.state.coinMarketCoinList;
        if (this.state.percenSortOption) {
            arr = arr.sort((i,j) => {return parseFloat(i.percent_change_24h) > parseFloat(j.percent_change_24h) ? 1 : -1;} );
        } else {
            arr.sort((i,j) => {return parseFloat(j.percent_change_24h) - parseFloat(i.percent_change_24h);} );
        }
        this.setState((prev => {return {
            coinMarketCoinList: arr,
            percenSortOption: !prev.percenSortOption
        }}));
    }
    totalSortCoinList() {
        let arr = this.state.coinMarketCoinList;
        if (this.state.totalSortOption) {
            arr = arr.sort((i,j) => {return parseFloat(i.price_usd) - parseFloat(j.price_usd);} );
        } else {
            arr.sort((i,j) => {return parseFloat(j.price_usd) - parseFloat(i.price_usd);} );
        }
        this.setState((prev => {return {
            coinMarketCoinList: arr,
            totalSortOption: !prev.totalSortOption
        }}));
    }
    coinItemView = function (coin) {
        let imgUrl = this.state.cryptoCompareCoinObj[coin.symbol] ? this.state.cryptoCompareCoinObj[coin.symbol] : 'https://www.cryptocompare.com/media/19782/ltc.png';
        return (
            <ListItem avatar key={coin.id}>
                <Left>
                    <Thumbnail source={{ uri: imgUrl}} />
                </Left>
                <Body>
                    <Text>{coin.name}</Text>
                    <Text note>{coin.price_usd} $</Text>
                </Body>
                <Right>
                    { (coin.percent_change_24h > 0)
                        ?  <Text style={styles.coinRise} note>{coin.percent_change_24h} %</Text>
                        :  <Text style={styles.coinDown} note>{coin.percent_change_24h} %</Text>

                    }
                </Right>
            </ListItem>);
    };
    render() {
        return (
            <Container>
                <Header>
                    <Left></Left>
                    <Body>

                            <Button iconRight transparent info onPress={this.totalSortCoinList}>
                                <Text>Coins info</Text>
                                { this.state.totalSortOption
                                    ?  <Icon name='arrow-round-up' />
                                    :  <Icon name='arrow-round-down' />


                                }
                            </Button>
                    </Body>

                    <Right>
                        <Button iconRight transparent info onPress={this.sortCoinList}>
                            { this.state.percenSortOption
                                ?  <Icon name='arrow-up' />
                                :  <Icon name='arrow-down' />


                            }
                        </Button>

                    </Right>
                </Header>
                <Content>
                    <List>
                        {this.state.coinMarketCoinList.map(this.coinItemView)}
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    coinRise: {
        color: 'green'
    },
    coinDown: {
        color: 'red'
    }
});