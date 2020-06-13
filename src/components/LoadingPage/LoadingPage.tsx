import React from 'react';
import { View, Image, StyleSheet, Text, Animated, Easing } from 'react-native';

const LoadingPage = () => {
    return (
        <View style={styles.centered}>
            <Animated.Image source={require('../../assets/icon.png')}/>
            <Text style={styles.loadingText}>Carregando...</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    centered: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    loadingText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        marginTop: 16,
    }
})
export default LoadingPage;