import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const DefaultButton = ({ children, onPress, disabled, styleText, style }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        disabled
          ? { ...styles.buttonContainer, ...styles.buttonDisabled }
          : styles.buttonContainer,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.textDefault, styleText]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.accentColor,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  buttonDisabled: {
    backgroundColor: Colors.grayishColor,
  },
  textDefault: {
    textAlign: 'center',
    fontFamily: 'Mont-regular',
    fontSize: 15,
    color: 'white',
  },
});

export default DefaultButton;
