import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import DefaultButton from '../commons/DefaultButton';
import * as cartActions from '../../store/actions/cart';
import MenuItemCard from './MenuItemCard';

const MenuList = ({ menu, navigation, admin }) => {
  const dispatch = useDispatch();

  const config = {
    adminIcon: Platform.OS === Platform.OS === 'android' ? 'md-construct' : 'ios-construct',
    homeIcon: Platform.OS === Platform.OS === 'android' ? 'md-cart' : 'ios-cart',
  }

  const actionBtnHandler = (item) => {
    if(admin) {
      // Está na tela Admin ~~ ajeitar onDetailsPress e actionBtn daqui assim que terminar criar item
      
    } else {
      dispatch(cartActions.addToCart(item, 1, item.price));
    }
  }

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
          onDetailPress={() =>
            navigation.navigate('Details', {
              foodId: item.id,
              title: item.title,
            })
          }
        >
          <DefaultButton onPress={() => actionBtnHandler(item)}>
            <Ionicons
              name={admin ? config.adminIcon : config.homeIcon}
              size={20}
              color="white"
            />
          </DefaultButton>
        </MenuItemCard>
      )}
    />
  );
};

export default MenuList;
