import React from 'react';
import { StyleSheet } from 'react-native';
import { AdMobBanner } from 'expo';
import { View } from 'native-base';

const BANNER_ID = `ca-app-pub-6904786805926684/1830713427`;

export default class AdMobBannerComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={styles.container}>
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID={BANNER_ID}
                />
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        marginTop: 30
    }
});