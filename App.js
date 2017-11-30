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
  render() {
    return (
        <Root>
            <View
                style={{
                    height: 24,
                    backgroundColor: "#DFE2DB",
                }}
            />
            <AppNavigator/>
        </Root>

    );
  }
}
/*<Container>
           <Header style={{height:48}}>
               <Left>
                   <Button transparent>
                       <Icon name='menu' />
                   </Button>
               </Left>
           </Header>
           <Content>

           </Content>
           <Footer>
               <FooterTab>
                   <Button vertical active>
                       <Icon name="list" active/>
                       <Text>All</Text>
                   </Button>
                   <Button vertical>
                       <Icon name="ios-star-outline" />
                       <Text>Favorites</Text>
                   </Button>
               </FooterTab>
           </Footer>
       </Container>*/