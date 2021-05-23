import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as cartActions from '../../store/actions/cart';
import DefaultButton from '../../components/commons/DefaultButton';
import Colors from '../../constants/Colors';

// Tela mostrando detalhes da comida selecionada, botão para adicionar no carrinho
const DetailsFoodScreen = ({ route }) => {
  const id = route.params.foodId; // Puxando parametro que veio da lista (MenuList)
  const selectedFood = useSelector(({ menu }) =>
    menu.availableMenu.find((food) => food.id === id)
  ); // Procurando pelo redux e armazenando a comida selecionada

  const dispatch = useDispatch();

  const [totalItem, setTotalItem] = useState(1);
  const [sum, setSum] = useState(selectedFood.price);

  const totalItemHandler = (action) => {
    if (totalItem === 1 && action === 'remove') {
      return;
    }
    if (action === 'add') {
      setTotalItem(totalItem + 1);
      setSum(sum + selectedFood.price);
    } else {
      setTotalItem(totalItem - 1);
      setSum(sum - selectedFood.price);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: selectedFood.imageUrl }} borderRadius={20} />
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.defaultText}>{selectedFood.title}</Text>
        <View style={styles.rowContainer}>
          <DefaultButton onPress={totalItemHandler.bind(this, 'remove')}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-remove' : 'ios-remove'}
              size={18}
              color="white"
            />
          </DefaultButton>
          <Text style={[styles.defaultText, styles.totalItem]}>
            {totalItem}
          </Text>
          <DefaultButton onPress={totalItemHandler.bind(this, 'add')}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
              size={18}
              color="white"
            />
          </DefaultButton>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{selectedFood.description}</Text>
        <Text style={styles.descriptionText}>
          Tempo de entrega: <Text style={styles.time}>40 min</Text>
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.defaultText}>Preço total:</Text>
          <Text style={styles.defaultText}>{sum.toFixed(2)} R$</Text>
        </View>
        <DefaultButton
          style={styles.cartButton}
          onPress={() =>
            dispatch(cartActions.addToCart(selectedFood, +totalItem, +sum))
          }
        >
          Adicionar no carrinho
        </DefaultButton>
      </View>
    </ScrollView>
  );
};

export const screenOptions = ({ route }) => {
  const title = route.params.title;
  return {
    headerTitle: title,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  imageContainer: {
    width: '100%',
    height: 280,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  defaultText: {
    fontFamily: 'Mont-bold',
    fontSize: 18,
  },
  rowContainer: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalItem: {
    marginHorizontal: 8,
  },
  descriptionContainer: {
    justifyContent: 'flex-start',
    margin: 10,
  },
  descriptionText: {
    fontFamily: 'Mont-regular',
    marginBottom: 5,
    fontSize: 16,
    color: Colors.grayishColor,
  },
  time: {
    fontFamily: 'Mont-bold',
    color: 'black',
  },
  cartButton: {
    paddingVertical: 10,
  },
});

export default DetailsFoodScreen;
