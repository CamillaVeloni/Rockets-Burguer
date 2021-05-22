import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import { useSelector } from 'react-redux';
// Tela carrinho com todas as comidas selecionadas
const CartScreen = () => { 
    const cart = useSelector(({ cart }) => cart);
    
    console.log(cart.items);
    console.log(cart.totalAmount);
    return ( 
     <View> 
         <Text>Carrinho</Text>
     </View>
    );
};

const styles = StyleSheet.create({});

export default CartScreen;
