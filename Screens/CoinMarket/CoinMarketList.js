import React, {Component} from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon, Input, H2, Spinner,Item, Footer, FooterTab} from 'native-base';
import {StyleSheet} from 'react-native';
import CoinList from '../../Components/CoinMarket/CoinList';
import {getCoinList} from '../../Request/Coinmarket';

export default class CoinMarketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _coinsList: [],
            coinMarketCoinList: [],
            percenSortOption: false,
            totalSortOption: false,
            isSearchVisible: false,
            queryString: ''
        };

        getCoinList()
            .then(arr => {
                this.setState(prev => {
                    prev._coinsList = arr;
                    prev.coinMarketCoinList = arr;
                    return prev;
                });
            });
        this.sortCoinList = this.sortCoinList.bind(this);
        this.queryStringUpdate = this.queryStringUpdate.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    sortCoinList(sortOption, sortField) {

        this.setState((prev => {
            prev.coinMarketCoinList = prev.coinMarketCoinList.sort((i, j) => {
                return prev[sortOption]
                    ? parseFloat(i[sortField]) - parseFloat(j[sortField])
                    : parseFloat(j[sortField]) - parseFloat(i[sortField]);
            });
            prev[sortOption] = !prev[sortOption];
            return prev;
        }));

    }

    queryStringUpdate(value) {
        this.setState(prev => {
            prev.queryString = value;
            prev.coinMarketCoinList = this.state._coinsList.filter((i) => {
                return i.name.toLowerCase().includes(value.toLowerCase());
            });
            return prev;
        })
    }

    clearSearch() {
        this.setState(prev => {
            prev.coinMarketCoinList = prev._coinsList;
            prev.isSearchVisible = !prev.isSearchVisible;
            prev.queryString = '';
            return prev;
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        let onItemPres = (coin) => navigate('CoinDetails', {coin: coin});
        let priceUp = (
                <Item>
                    <Icon name='ios-arrow-dropup-circle-outline' />
                    <Text>Price up</Text>
                </Item>);
        let priceDown = (
                <Item>
                    <Icon name='ios-arrow-dropdown-circle-outline' />
                    <Text>Price down</Text>
                </Item>);
        let percentageUp = (
                <Item>
                    <Icon name='ios-arrow-dropup-circle-outline' />
                    <Text>Percentage up</Text>
                </Item>);
        let percentageDown = (
                <Item>
                    <Icon name='ios-arrow-dropdown-circle-outline' />
                    <Text>Percentage down</Text>
                </Item>);
        return (
            <Container>

                {/*{
                    this.state.isSorting
                    ? <Spinner/>
                    : */}<Header  style={styles.header} transparent searchBar>
                            <Item style={{backgroundColor: '#6DBDD6'}}>
                                <Icon name="ios-search" />
                                <Input placeholder="Search" value={this.state.queryString} onChangeText={this.queryStringUpdate} />
                                <Icon name="ios-people" />
                            </Item>
                            <Button transparent onPress={this.clearSearch}>
                                <Text>Cancel</Text>
                            </Button>
                        </Header>
                // }
                <CoinList onItemPres={onItemPres} coinList={this.state.coinMarketCoinList}/>
                <Footer style={styles.header}>
                    <FooterTab>
                        <Button full onPress={(() => { this.sortCoinList('totalSortOption', 'price_usd')})}>
                            {this.state.totalSortOption  ? priceUp : priceDown }
                        </Button>
                    </FooterTab>
                    <FooterTab>
                        <Button full onPress={(() => { this.sortCoinList('percenSortOption', 'percent_change_24h')})}>
                            {this.state.percenSortOption  ? percentageUp : percentageDown }
                        </Button>
                    </FooterTab>
                </Footer>
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
    },
    header: {
        backgroundColor: '#c8eac4',
        height: 48
    }
});