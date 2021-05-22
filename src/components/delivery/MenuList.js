import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import * as cartActions from '../../store/actions/cart';
import MenuItemCard from './MenuItemCard';

const MenuList = ({ menu, navigation }) => {
  const dispatch = useDispatch();

  return (
    <FlatList
      data={menu}
      columnWrapperStyle={{ justifyContent: 'center' }}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MenuItemCard
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onDetailPress={() => navigation.navigate('Details', { foodId: item.id, title: item.title })}
          onCartPress={() => dispatch(cartActions.addToCart(item, 1, item.price))}
        />
      )}
    />
  );
};

export default MenuList;
