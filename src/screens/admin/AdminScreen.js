import React, { useEffect, useState } from 'react';
import { CommonActions } from '@react-navigation/native';
import { Alert, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import useFetch from '../../hooks/useFetch';
import useAction from '../../hooks/useAction';
import * as actionsMenu from '../../store/actions/menu';
import Spinner from '../../components/commons/Spinner';
import DefaultButton from '../../components/commons/DefaultButton';
import MenuItemCard from '../../components/delivery/MenuItemCard';
import EmptyComponent from '../../components/commons/EmptyComponent';

const AdminScreen = ({ navigation }) => {
  
  const availableMenu = useSelector(({ menu }) => menu.availableMenu);
  
  // Usando custom hooks para utilizar dispatch
  const { refresh, loading, serverError, dispatchHandler } = useFetch(actionsMenu.fetchMenu());
  const { isLoading, error, dispatchActionHandler } = useAction();

  // Usando useEffect para mostrar alerta de erro (i.e. state error)
  useEffect(() => {
    if (error) Alert.alert('Algo deu errado', error, [{ text: 'Okay' }]);
  }, [error]);
  
  // Handler para navegar para edição de item do cardápio - puxando id
  const editItemHandler = (id) => {
    navigation.dispatch(CommonActions.navigate('EditItem', { itemId: id }));
  };
  // Handler para deletar item do cardápio - puxando id
  const deleteItemHandler = (id) => {
    Alert.alert(
      'Você tem certeza?',
      'Você realmente deseja deletar esse item do cardápio?',
      [
        { text: 'Não', style: 'default' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () => {
            // dispachando action deleteItem em actions/menu
            dispatchActionHandler(actionsMenu.deleteItem(id))
          },
        },
      ]
    );
  };

  if (isLoading || loading) return <Spinner />;
  if (serverError)
  return <EmptyComponent label={serverError} onRetryPress={dispatchHandler} />;

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
            onPress={deleteItemHandler.bind(this, item.id)}
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

export default AdminScreen;
