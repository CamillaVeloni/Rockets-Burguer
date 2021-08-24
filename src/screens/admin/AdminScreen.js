import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { deleteItem } from '../../store/actions/menu';
import DefaultButton from '../../components/commons/DefaultButton';
import MenuItemCard from '../../components/delivery/MenuItemCard';

const MenuEdit = ({ navigation }) => {
  const availableMenu = useSelector(({ menu }) => menu.availableMenu);
  const dispatch = useDispatch();

  const editItemHandler = (id) => {
    navigation.dispatch(
      CommonActions.navigate('EditItem', { itemId: id })
    );
  };

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
          onSelected={() => {
            editItemHandler(item.id);
          }}
        >
          <DefaultButton
            onPress={() => {
              editItemHandler(item.id);
            }}
          >
            <Ionicons
              name={
                Platform.OS === 'android' ? 'md-construct' : 'ios-construct'
              }
              size={20}
              color="white"
            />
          </DefaultButton>
          <DefaultButton
            onPress={() => {
              dispatch(deleteItem(item.id));
            }}
            style={{ backgroundColor: 'red' }}
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
