import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon, H2, Spinner } from 'native-base';
import {StyleSheet} from 'react-native';
export default class CoinList extends Component {

    render() {
        let coins = this.props.coinList;
        let navigate = this.props.navigate;

        if (!coins.length) return <Spinner />;

        let coinsView = coins.map((coin) => <CoinItem navigate={navigate} key={coin.id} coin={coin} />);
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
        let navigate = this.props.navigate;

        return (
            <ListItem avatar key={coin.id} navigate={navigate}>
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
    }
});