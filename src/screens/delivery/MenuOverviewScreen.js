import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Platform, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as menuActions from '../../store/actions/menu';
import * as cartActions from '../../store/actions/cart';
import MenuItemCard from '../../components/delivery/MenuItemCard';
import DefaultButton from '../../components/commons/DefaultButton';
import Spinner from '../../components/commons/Spinner';
import EmptyComponent from '../../components/commons/EmptyComponent';

const MenuList = ({ navigation }) => {
  const dispatch = useDispatch();

  // state para loading data e erro
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const availableMenu = useSelector(({ menu }) => menu.availableMenu);

  // Função para 'pegar' o menu do firebase
  // Usado em useEffect primeiro launch, no retry press quando tem erro
  // Em useEffect quando tem evento de navegação
  const loadMenu = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(menuActions.fetchMenu());
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  }, [setError, setIsLoading, dispatch]);

  // Loading Menu qnd entrar na tela dnv (por evento de navegação)
  useEffect(() => {
    const willFocusSub = navigation.addListener('focus', loadMenu);

    return willFocusSub;
  }, [loadMenu]);
  
  // Loading do Menu inicial (quando o app launch)
  useEffect(() => {
    loadMenu();
  }, [dispatch, loadMenu]);

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <EmptyComponent label={error} onRetryPress={() => loadMenu} />
    );

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
