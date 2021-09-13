import React, { useState, useReducer, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  const [authForm, dispatch] = useReducer(authReducer, {
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
      dispatch({
        type: UPDATE_FORM,
        id: identifier,
        value: inputValue,
        isValid: inputValidity,
      });
    },
    [dispatch]
  );

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
      <View style={styles.containerForm}>
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
        <DefaultButton
          style={styles.authButton}
          styleText={styles.authTextDefault}
        >
          Login
        </DefaultButton>
      </View>
      <View style={styles.containerActionChange}>
        <Text style={styles.authTextDefault}>Ainda não possui uma conta?</Text>
        <TouchableOpacity>
          <Text style={styles.textAction}>
            Clique aqui para se cadastrar já!
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
  containerForm: {
    width: '90%',
    maxHeight: 400,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  authInput: {
    borderRadius: 20,
    color: Colors.primaryColor,
  },
  errorStyle: {
    color: '#B71C1C',
  },
  authButton: {
    paddingVertical: 8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
  containerActionChange: {
    alignItems: 'center',
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
