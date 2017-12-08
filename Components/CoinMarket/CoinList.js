import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon, H2, Spinner } from 'native-base';
import {StyleSheet} from 'react-native';

export default class CoinList extends Component {

    render() {
        let coins = this.props.coinList;
        let onItemPres = this.props.onItemPres;
        if (!coins.length) return <Spinner />;

        let coinsView = coins.map((coin) => <CoinItem key={coin.id} coin={coin} onItemPres={onItemPres} />);
        return (
            <List>
                {coinsView}
            </List>
        );
    }
}
class CoinItem extends React.Component {
    render () {
        let coin = this.props.coin;
        let onItemPres = this.props.onItemPres;
        return (
            <ListItem style={styles.coinList} button onPress={() => { onItemPres(coin);}} avatar key={coin.id} >
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
            </ListItem>
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
    coinList: {
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 15,
        marginLeft: 0
    }
});