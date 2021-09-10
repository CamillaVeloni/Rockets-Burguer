import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DefaultButton from './DefaultButton';

const EmptyComponent = ({ label, onRetryPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      {onRetryPress && (
        <DefaultButton
          style={styles.retryButton}
          styleText={styles.retryText}
          onPress={onRetryPress}
        >
          Tentar outra vez
        </DefaultButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontFamily: 'Mont-regular',
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    margin: 10,
  },
  retryText: {
    paddingVertical: 6,
  },
});

export default EmptyComponent;
