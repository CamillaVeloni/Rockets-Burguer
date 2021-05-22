import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const DefaultButton = ({ children, onPress, styleText, style }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={[styles.textButton, styleText]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: Colors.primaryColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 20,
  },
  textButton: {
    fontFamily: 'Mont-regular',
    fontSize: 15,
  },
});

export default DefaultButton;
