import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const Input = props => {

    const inputChangeHandler = () => {}

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        onChangeText={() => {}}
      />
      {/* {!formState.inputValidities.title && (
        <Text>{props.errorText}</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Mont-regular',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
});

export default Input;
