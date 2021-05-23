import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DefaultButton from '../commons/DefaultButton';
import Colors from '../../constants/Colors';

const CartCardItem = ({ title, image, quantity, sum, onDeletePress }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: image }} borderRadius={20}/>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.defaultText}>{quantity} unidade(s)</Text>
          <Text style={[styles.defaultText, styles.sum]}>{sum.toFixed(2)} R$</Text>
        </View>
        <View style={styles.rowContainer}>
          <DefaultButton style={styles.buttonAction} onPress={onDeletePress}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={18}
              color={Colors.accentColor}
            />
          </DefaultButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    imageContainer: {
        marginRight: 15,
        width: 120,
        height: 100
    },
    image: {
        width: '100%',
        height: '100%'
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'Mont-bold',
        color: Colors.primaryColor,
        fontSize: 16
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    defaultText: {
        fontFamily: 'Mont-regular',
        marginHorizontal: 5,
        fontSize: 15,
        color: Colors.grayishColor
    },
    sum: {
        color: '#BE3144'
    },  
    buttonAction: {
        backgroundColor: 'transparent',
    }
});

export default CartCardItem;
