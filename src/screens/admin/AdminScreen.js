import React, { useEffect, useState } from 'react';
import { CommonActions } from '@react-navigation/native';
import { Alert, FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { deleteItem } from '../../store/actions/menu';
import Spinner from '../../components/commons/Spinner';
import DefaultButton from '../../components/commons/DefaultButton';
import MenuItemCard from '../../components/delivery/MenuItemCard';

const AdminScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // States para loading spinner (esperando resposta da api) e para erro na requisição
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Pegando Cardápio do redux
  const availableMenu = useSelector(({ menu }) => menu.availableMenu);

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
          onPress: async () => {
            // dispachando action deleteItem em actions/menu
            setError(null);
            setIsLoading(true);
            try {
              await dispatch(deleteItem(id));
            } catch (e) {
              setError(e.message);
            }
            setIsLoading(false);
          },
        },
      ]
    );
  };

  if (isLoading) return <Spinner />;

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
