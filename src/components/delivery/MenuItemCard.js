import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DefaultButton from '../commons/DefaultButton';
import Colors from '../../constants/Colors';

const MenuItemCard = ({ image, title, price, onDetailPress, onCartPress }) => {
  return (
    <View style={styles.gridContainer}>
      <TouchableOpacity onPress={onDetailPress}> 
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={{ uri: image }}
            borderRadius={70}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
      </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.price}>{price.toFixed(2)} R$</Text>
          <DefaultButton onPress={onCartPress}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={20}
              color="white"
            />
          </DefaultButton>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    margin: 10,
    height: 200,
    maxWidth: 150,
    maxHeight: '95%',
  },
  header: {
    width: '100%',
    height: '70%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    marginTop: 5,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Mont-bold',
    fontSize: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Mont-bold',
    fontSize: 14
  },
});

export default MenuItemCard;
