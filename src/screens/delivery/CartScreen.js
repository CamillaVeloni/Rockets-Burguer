import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import CartCardItem from '../../components/delivery/CartCardItem';
import DefaultButton from '../../components/commons/DefaultButton';

// Tela carrinho com todas as comidas selecionadas
const CartScreen = () => {
  const cartTotalAmount = useSelector(({ cart }) => cart.totalAmount);
  const cartItems = useSelector(({ cart: { items } }) => {
    const cartAsArray = []; // Transformando items de objeto para array
    for (const key in items) {
      cartAsArray.push({
        foodId: key,
        foodTitle: items[key].foodTitle,
        foodPrice: items[key].foodPrice,
        quantity: items[key].quantity,
        sum: items[key].sum,
      });
    }
    return cartAsArray;
  });

  return (
    <View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.foodId}
        renderItem={({ item }) => <CartCardItem title={item.foodTitle}/>}
      />
      <View>
        <DefaultButton>Fazer Pedido</DefaultButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
