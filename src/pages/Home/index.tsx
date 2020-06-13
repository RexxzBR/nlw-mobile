import React, { useState, useEffect, ChangeEvent } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform, Vibration, Picker } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from '../../services/api';

interface UF {
  sigla: string,
}
interface City {
  nome: string
}

const Home = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('0');

  function handleNavigationPoints() {
    if (selectedCity === '0' || selectedUf === '0' || 
    selectedUf === null || selectedCity === null) {
      Vibration.vibrate(500);
      return;
    }
    navigation.navigate('Points', { selectedUf, selectedCity });
  }

  useEffect(() => {
    axios.get<UF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    })
  }, []);

  useEffect(() => {
    axios.get<City[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cities = response.data.map(cities => cities.nome);

      setCities(cities);
    });
  }, [selectedUf]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}>
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
          </View>
        </View>
        <Picker style={styles.input}
          selectedValue={selectedUf}
          onValueChange={(itemValue, itemIndex) => setSelectedUf(itemValue)}>
          <Picker.Item label="Selecione uma UF" value={null}></Picker.Item>
          {ufs.map(uf => (
            <Picker.Item value={uf} label={uf} key={uf}></Picker.Item>
          ))}
        </Picker>
        <Picker style={styles.input}
          selectedValue={selectedCity}
          onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}>
          <Picker.Item label="Selecione uma cidade" value="selectState"></Picker.Item>
          {cities.map(city => (
            <Picker.Item  value={city} label={city} key={city}></Picker.Item>
          ))}
        </Picker>
        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleNavigationPoints}>
            <View
              style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF"></Icon>
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#f0f0f5'
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});


export default Home;