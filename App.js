import React, { Component } from 'react';
import { Root, View } from 'native-base';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import CoinMarketList from './Screens/CoinMarket/CoinMarketList';
import About from "./Screens/About/About";
import Drawer from "./Components/Drawer";
import CoinDetails from "./Screens/CoinMarket/CoinDetails";

const CoinMarketNavigator  = StackNavigator({
    CoinMarketList: {
        screen: CoinMarketList,
    },
    CoinDetails: {
        screen: CoinDetails
    }
}, {
    initialRouteName: "CoinMarketList",
    headerMode: "none"
});
const AboutNavigator = StackNavigator({
    About: {screen: About}
}, {
    initialRouteName: "About",
    headerMode: "none"
});

const AppNavigator = DrawerNavigator({
    CoinMarketModule: {screen: CoinMarketNavigator},
    AboutModule: {screen: AboutNavigator},
}, {
    initialRouteName: "CoinMarketModule",
    contentComponent: Drawer,
    backBehavior: "none"
});
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
        };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState(prevState => {
            prevState.fontsLoaded = true;
            return prevState;
        })
    }
  render() {
      return this.state.fontsLoaded
          ?
            <Root>
                <View
                    style={{
                        height: 24,
                        backgroundColor: "#6DBDD6",
                    }}
                />
                <AppNavigator/>
            </Root>
          : null;
  }
}