import React from 'react';
import { View, Image, StyleSheet, Text} from 'react-native';

const LoadingPage = () => {
    return (
        <View style={styles.centered}>
            <Image source={require('../../assets/icon.png')}></Image>
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
        fontSize: 16,
        marginTop: 8
    }
})
export default LoadingPage;