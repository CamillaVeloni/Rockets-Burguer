import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CartCardItem from './CartCardItem';
import DefaultButton from '../commons/DefaultButton';
import Colors from '../../constants/Colors';

const OrderCardItem = ({ items, amount, date }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.totalText}>Total: {amount.toFixed(2)} R$</Text>
        <Text style={styles.defaultText}>{date}</Text>
      </View>
      <DefaultButton
        style={styles.button}
        onPress={() => setShowDetails((prevState) => !prevState)}
      >
        {showDetails ? 'Ocultar Informações' : 'Mostrar Informações'}
      </DefaultButton>
      {showDetails && (
        <View style={styles.items}>
          {items.map((item) => (
            <CartCardItem
              key={item.foodId}
              title={item.foodTitle}
              image={item.foodImage}
              quantity={item.quantity}
              sum={item.sum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    margin: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  summary: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    color: Colors.primaryColor,
    fontFamily: 'Mont-bold',
    fontSize: 16,
  },
  defaultText: {
    fontFamily: 'Mont-italic',
    fontSize: 14,
    color: Colors.primaryColor,
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
});

export default OrderCardItem;
