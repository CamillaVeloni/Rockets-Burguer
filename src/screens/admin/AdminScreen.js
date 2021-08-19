import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { deleteItem } from '../../store/actions/menu';
import DefaultButton from '../../components/commons/DefaultButton';
import MenuItemCard from '../../components/delivery/MenuItemCard';

const MenuEdit = ({ menu, navigation }) => {
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
          onSelected={() => {}}
        >
          <DefaultButton
            onPress={() => {}}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-construct' : 'ios-construct'}
              size={20}
              color="white"
            />
          </DefaultButton>
          <DefaultButton
            onPress={() => {
              dispatch(deleteItem(item.id))
            }}
            style={{ backgroundColor: 'red'}}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={20}
              color="white"
            />
          </DefaultButton>
        </MenuItemCard>
      )}
    />
  );
};

export default MenuEdit;
