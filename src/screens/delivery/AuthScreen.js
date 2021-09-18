import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as authActions from '../../store/actions/auth';
import DefaultButton from '../../components/commons/DefaultButton';
import Input from '../../components/commons/Input';
import Spinner from '../../components/commons/Spinner';
import Colors from '../../constants/Colors';

const UPDATE_FORM = 'updateForm';

const authReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const updatedInputValues = {
        ...state.inputValues,
        [action.id]: action.value,
      };
      const updatedInputValidities = {
        ...state.inputValidities,
        [action.id]: action.isValid,
      };
      let updatedIsFormValid = true;
      for (const key in updatedInputValidities) {
        updatedIsFormValid = updatedIsFormValid && updatedInputValidities[key];
      }
      return {
        inputValues: updatedInputValues,
        inputValidities: updatedInputValidities,
        isFormValid: updatedIsFormValid,
      };

    default:
      return state;
  }
};

const AuthScreen = () => {
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);

  const [authForm, authDispatch] = useReducer(authReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    isFormValid: false,
  });

  const inputFormHandler = useCallback(
    (identifier, inputValue, inputValidity) => {
      authDispatch({
        type: UPDATE_FORM,
        id: identifier,
        value: inputValue,
        isValid: inputValidity,
      });
    },
    [authDispatch]
  );

  useEffect(() => {
    if(error) {
      Alert.alert('Algo deu errado', error, [{ text: 'Okay' }])
    }
  }, [error]);

  const submitFormHandler = async () => {
    if (!authForm.isFormValid) {
      // form não é valido!
      Alert.alert(
        'O formulário está inválido!',
        'Por favor, verifique os requisitos do formulário.',
        [{ text: 'Ok' }]
      );
      return;
    }

    let action;
    if (isSignup) {
      action = authActions.signupUser(
        authForm.inputValues.email,
        authForm.inputValues.password
      );
    } else {
      action = authActions.signinUser(
        authForm.inputValues.email,
        authForm.inputValues.password
      );
    }

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      // Vai logar automaticamente dps disso
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.containerLogo}>
        <Ionicons
          name="md-rocket-outline"
          size={120}
          color={Colors.primaryColor}
        />
        <Ionicons name="md-fast-food" size={100} color={Colors.primaryColor} />
      </View>
      <View style={styles.cardContainer}>
        <Input
          id="email"
          label="Digite seu e-mail"
          inputStyle={styles.authInput}
          labelStyle={styles.authTextDefault}
          onInputChange={inputFormHandler}
          initialValue=""
          returnKeyType="next"
          autoCapitalize="none"
          required
          email
          errorText="Por favor, digite um e-mail válido!"
          errorStyle={styles.errorStyle}
        />
        <Input
          id="password"
          label="Digite sua senha"
          inputStyle={styles.authInput}
          labelStyle={styles.authTextDefault}
          onInputChange={inputFormHandler}
          initialValue=""
          autoCapitalize="none"
          autoCorrect={false}
          required
          secureTextEntry
          minLength={8}
          errorText="Por favor, digite uma senha válida!"
          errorStyle={styles.errorStyle}
        />
      </View>
      {isLoading ? (
        <Spinner containerStyle={styles.buttonContainer} />
      ) : (
        <DefaultButton
          style={styles.buttonContainer}
          styleText={styles.authTextDefault}
          onPress={submitFormHandler}
        >
          {isSignup ? 'Cadastrar' : 'Login'}
        </DefaultButton>
      )}
      <View style={styles.containerActionChange}>
        <Text style={styles.authTextDefault}>
          {isSignup ? 'Já possui uma conta?' : 'Ainda não possui uma conta?'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIsSignup((prevState) => !prevState);
          }}
        >
          <Text style={styles.textAction}>
            Clique aqui para{' '}
            {isSignup ? 'voltar ao login' : 'criar uma conta já!'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accentColor,
  },
  containerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%',
    maxWidth: 400,
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  authInput: {
    borderRadius: 20,
    color: Colors.primaryColor,
  },
  errorStyle: {
    color: '#B71C1C',
  },
  buttonContainer: {
    flex: 0,
    marginTop: 15,
    alignSelf: 'stretch',
    borderRadius: 20,
    marginHorizontal: 30,
    paddingVertical: 4,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primaryColor,
  },
  containerActionChange: {
    alignItems: 'center',
    marginTop: 10,
  },
  authTextDefault: {
    fontSize: 16,
    fontFamily: 'Mont-bold',
    color: Colors.primaryColor,
  },
  textAction: {
    fontSize: 14,
    fontFamily: 'Mont-regular',
    color: Colors.primaryColor,
  },
});

export default AuthScreen;
