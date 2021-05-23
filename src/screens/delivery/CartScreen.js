import React from 'react';
import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';
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
        foodImage: items[key].foodImage,
        foodPrice: items[key].foodPrice,
        quantity: items[key].quantity,
        sum: items[key].sum,
      });
    }
    return cartAsArray.sort((a, b) => (a.foodId > b.foodId ? 1 : -1));
  });

  const dispatch = useDispatch();

  const onRemoveHandler = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.foodId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartCardItem
            title={item.foodTitle}
            image={item.foodImage}
            quantity={item.quantity}
            sum={item.sum}
            onDeletePress={onRemoveHandler.bind(this, item.foodId)}
          />
        )}
      />
      <View>
        <Text style={styles.textOrder}>
          Total do Pedido:{' '}
          <Text style={styles.priceOrder}>{cartTotalAmount.toFixed(2)} R$</Text>
        </Text>
        <DefaultButton
          disabled={cartItems.length === 0}
          onPress={() => dispatch(orderActions.addNewOrder('u1', cartItems, cartTotalAmount))}
          style={styles.buttonStyle}
          styleText={styles.buttonTextStyle}
        >
          Fazer Pedido
        </DefaultButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  textOrder: {
    fontFamily: 'Mont-regular',
    fontSize: 18,
    alignSelf: 'center',
  },
  priceOrder: {
    fontFamily: 'Mont-bold',
  },
  buttonStyle: {
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 10,
  },
  buttonTextStyle: {
    fontFamily: 'Mont-bold',
    fontSize: 16,
  },
});

export default CartScreen;
