import React, {Component} from 'react';
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Body,
    Left,
    Right,
    Button,
    Icon,
    Input,
    H2,
    Spinner,Item
} from 'native-base';
import {StyleSheet} from 'react-native';
import CoinList from '../../Components/CoinMarket/CoinList';

export default class CoinMarketList extends Component {
    constructor(props) {
        super(props);
       /* this.state = {
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
*/
        this.sortCoinList = this.sortCoinList.bind(this);
    }

    sortCoinList(sortOption, sortField) {
        console.log(this.state[sortOption]);
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

    render() {
        const {navigate} = this.props.navigation;
        let onItemPres = () => navigate.navigation('Details');
        return (
            <Container >
                <Header style={styles.header}>
                    <Left>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search" />
                            <Icon name="ios-people" />
                        </Item>
                    </Left>
                    <Body>
                    <Button iconRight transparent info onPress={(() => {
                        this.sortCoinList('totalSortOption', 'price_usd')
                    })}>
                        <Text>Coins info</Text>
                        {this.state.totalSortOption
                            ? <Icon name='arrow-round-up'/>
                            : <Icon name='arrow-round-down'/>
                        }
                    </Button>
                    </Body>

                    <Right>
                        <Button iconRight transparent info onPress={(() => {
                            this.sortCoinList('percenSortOption', 'percent_change_24h')
                        })}>
                            {this.state.percenSortOption
                                ? <Icon name='arrow-up'/>
                                : <Icon name='arrow-down'/>
                            }
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <CoinList onItemPres={onItemPres} coinList={this.state.coinMarketCoinList}/>
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
    },
    header: {
        backgroundColor: '#F5F3EE',
        height: 48

    }
});