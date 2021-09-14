import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Platform, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import useFetch from '../../hooks/useFetch';
import * as menuActions from '../../store/actions/menu';
import * as cartActions from '../../store/actions/cart';
import MenuItemCard from '../../components/delivery/MenuItemCard';
import DefaultButton from '../../components/commons/DefaultButton';
import Spinner from '../../components/commons/Spinner';
import EmptyComponent from '../../components/commons/EmptyComponent';

const MenuOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const availableMenu = useSelector(({ menu }) => menu.availableMenu);
  const { loading, serverError, refresh, dispatchHandler } = useFetch(menuActions.fetchMenu());
  
  if (loading) return <Spinner />;

  if (serverError)
    return <EmptyComponent label={serverError} onRetryPress={() => {}} />;

  return (
    <FlatList
      data={availableMenu}
      refreshing={refresh}
      onRefresh={dispatchHandler}
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

export default MenuOverviewScreen;
