import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon, H2, Spinner } from 'native-base';
import {StyleSheet} from 'react-native';
import { getCoinList} from '../Request/Coinmarket';
import CoinList from '../Components/CoinMarket/CoinList';
export default class CoinmarketList extends Component {
    // noinspection JSAnnotator
    constructor (props) {
        super(props);

        this.state = {
            coinMarketCoinList: [],
            percenSortOption: false,
            totalSortOption: false
        };

        getCoinList()
            .then(arr => {
                this.setState(prev => {
                    prev.coinMarketCoinList = arr;
                    return prev;
                });
            });

        this.coinItemView = this.coinItemView.bind(this);
        this.sortCoinList = this.sortCoinList.bind(this);
    }
    sortCoinList(sortOption, sortField) {
        let arr = this.state.coinMarketCoinList.sort((i,j) => {
            return sortOption
                ? parseFloat(i[sortField]) - parseFloat(j[sortField])
                : parseFloat(j[sortField]) - parseFloat(i[sortField]);
        });
        this.setState((prev => {
            prev['coinMarketCoinList'] = arr;
            prev[sortOption] = !prev[sortOption];
            return prev;
        }));
    }
    coinItemView = function (coin) {
        return (
            <ListItem avatar key={coin.id}>
                <Left>
                    <Thumbnail source={{ uri: coin.imgUrl}} />
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
                    <Left />
                    <Body>
                            <Button iconRight transparent info onPress={(() => {this.sortCoinList('totalSortOption', 'price_usd')})}>
                                <Text>Coins info</Text>
                                { this.state.totalSortOption
                                    ?  <Icon name='arrow-round-up' />
                                    :  <Icon name='arrow-round-down' />
                                }
                            </Button>
                    </Body>

                    <Right>
                        <Button iconRight transparent info onPress={(() => {this.sortCoinList('percenSortOption','percent_change_24h')})}>
                            { this.state.percenSortOption
                                ?  <Icon name='arrow-up' />
                                :  <Icon name='arrow-down' />
                            }
                        </Button>

                    </Right>
                </Header>
                <Content>
                    <CoinList coinList={this.state.coinMarketCoinList}/>
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