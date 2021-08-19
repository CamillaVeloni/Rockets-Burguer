import React from 'react';
import { FlatList, Platform, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as cartActions from '../../store/actions/cart';
import MenuItemCard from '../../components/delivery/MenuItemCard';
import DefaultButton from '../../components/commons/DefaultButton';

const MenuList = ({ navigation }) => {
  const availableMenu = useSelector(({ menu }) => menu.availableMenu);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={availableMenu}
      columnWrapperStyle={{ justifyContent: 'center' }}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MenuItemCard
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelected={() =>
            navigation.navigate('Details', {
              foodId: item.id,
              title: item.title,
            })
          }
        >
          <Text style={styles.price}>{item.price.toFixed(2)} R$</Text>
          <DefaultButton
            onPress={() => {
              dispatch(cartActions.addToCart(item, 1, item.price));
            }}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={20}
              color="white"
            />
          </DefaultButton>
        </MenuItemCard>
      )}
    />
  );
};

const styles = StyleSheet.create({
  price: {
    fontFamily: 'Mont-bold',
    fontSize: 14,
  },
});

export default MenuList;
