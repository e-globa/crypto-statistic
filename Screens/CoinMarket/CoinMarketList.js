import React, {Component} from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon, Input, H2, Spinner,Item, Footer, FooterTab, Title} from 'native-base';
import { Platform,StyleSheet} from 'react-native';
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
                <Button full style={styles.sortBtn} onPress={(() => { this.sortCoinList('totalSortOption', 'price_usd')})}>
                    <Icon name='ios-arrow-dropup-circle-outline' style={styles.sortIcon} />
                    <Text style={styles.sortText}>Price up</Text>
                </Button>);
        let priceDown = (
                <Button full style={styles.sortBtn} onPress={(() => { this.sortCoinList('totalSortOption', 'price_usd')})}>
                    <Icon name='ios-arrow-dropdown-circle-outline' style={styles.sortIcon} />
                    <Text style={styles.sortText}>Price down</Text>
                </Button>);
        let percentageUp = (
                <Button full style={styles.sortBtn} onPress={(() => { this.sortCoinList('percenSortOption', 'percent_change_24h')})}>
                    <Icon name='ios-arrow-dropup-circle-outline'  style={styles.sortIcon} />
                    <Text style={styles.sortText}>Percentage up</Text>
                </Button>);
        let percentageDown = (
                <Button full style={styles.sortBtn} onPress={(() => { this.sortCoinList('percenSortOption', 'percent_change_24h')})}>
                    <Icon name='ios-arrow-dropdown-circle-outline' style={styles.sortIcon} />
                    <Text style={styles.sortText}>Percentage down</Text>
                </Button>);
        return (
            <Container>
                <Header style={styles.header} transparent>
                    <Left>
                        <Button transparent onPress={() => {navigate('DrawerOpen')}}>
                            <Icon style={{textAlign: 'center'}} name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Coins list</Title>
                    </Body>
                    <Right/>
                </Header>
                <Item style={styles.container}>
                    <Icon name="ios-search" style={{marginLeft: 15}} />
                    <Input bordered placeholder="Search" value={this.state.queryString} onChangeText={this.queryStringUpdate} />
                    <Button transparent onPress={this.clearSearch}>
                        <Icon name="ios-close-circle-outline" />
                    </Button>
                </Item>
                <Content>
                    <CoinList onItemPres={onItemPres} coinList={this.state.coinMarketCoinList}/>
                </Content>
                <Footer style={styles.footer}>
                    <FooterTab style={{ backgroundColor: '#3B3738'}}>
                        {this.state.totalSortOption ? priceUp : priceDown}
                    </FooterTab>
                    <FooterTab style={{ backgroundColor: '#3B3738'}}>
                        {this.state.percenSortOption ? percentageUp : percentageDown }
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
        height: 50,
        marginTop: (Platform.OS === 'ios') ? -15 : 0,
        backgroundColor: '#3B3738'
    },
    footer: {
        height: 48,
        backgroundColor: '#3B3738'
    },
    sortText: {
        fontSize: 12,
        color: '#FFFFFF'
    },
    sortIcon: {
        width: 30,
        height: 30,
        color: '#FFFFFF'
    },
    sortBtn: {
        paddingBottom: 15
    },
    container: { borderRadius: 4, borderWidth: 0.5, borderColor: '#d6d7da' }
});