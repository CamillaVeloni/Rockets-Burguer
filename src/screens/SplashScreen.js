import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';

import { authenticate } from '../store/actions/auth';
import { View, Text, StyleSheet } from 'react-native';

// Usado para verificar se o usuário já está logado no aplicativo
// E mandar ele ou para a tela de autenticação ou para home page
const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryAutoLogin = async () => {
      try {
        const credentials = await SecureStore.getItemAsync('userData');
        if (!credentials) {
          // Se não o usuário não estiver re-logando
          navigation.replace('Auth');
          return;
        }

        const transformedCredentials = JSON.parse(credentials);
        const { token, userId, expiryDate } = transformedCredentials;

        const expirationDate = new Date(expiryDate);

        if (expirationDate <= new Date() || !token || !userId) {
          // Se a data já expirou, se não achar o token, se não achar userId
          navigation.replace('Auth');
          return;
        }

        const expiresTime = expirationDate.getTime() - new Date().getTime();

        dispatch(authenticate(token, userId, expiresTime));
        navigation.replace('Home');
      } catch (e) {
        console.log('Secure Store não pode ser acessada!', e);
      }
    };

    tryAutoLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <Text>Splash Screen!!</Text>
      <Text>Colocar algo a mais!! pf camila não esqueça</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default SplashScreen;
