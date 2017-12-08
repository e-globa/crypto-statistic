import React from 'react';
import { Body, H1, Header, Icon, Left, List, ListItem,  Text, View } from "native-base";
import { StyleSheet } from 'react-native';

export default class Drawer extends React.Component {
    constructor(props) {
        super(props);

        const { navigate } = this.props.navigation;

        this.state = {
            selectedModule: 'CoinMarketModule',
            navigate: navigate
        };

        this.setModule = this.setModule.bind(this);
    }

    setModule(module) {
        this.state.navigate(module);
        this.setState((prev) => {
            prev.selectedModule = module;
            return prev;
        });
    }

    render() {
        return (
            <View>
                <Header style={styles.header}>
                    <Left>
                        <Icon style={styles.textColor} name='menu'/>
                    </Left>
                    <Body>
                        <H1 style={styles.textColor}>Menu</H1>
                    </Body>
                </Header>
                <List>
                    <ListItem itemDivider={this.state.selectedModule === 'CoinMarketModule'} button noBorder onPress={() => this.setModule('CoinMarketModule')}>
                        <Left>
                            <Icon name="trending-up" />
                            <Body>
                            <Text>Coin Market</Text>
                            </Body>
                        </Left>
                    </ListItem>

                    <ListItem itemDivider={this.state.selectedModule === 'AboutModule'} button noBorder onPress={() => this.setModule('AboutModule')}>
                        <Left>
                            <Icon name="md-search" />
                            <Body>
                            <Text>About</Text>
                            </Body>
                        </Left>
                    </ListItem>
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        marginTop: 30
    },
    header: {
        backgroundColor: '#3B3738'
    },
    textColor: {
        color: '#FFFFFF'
    }
});