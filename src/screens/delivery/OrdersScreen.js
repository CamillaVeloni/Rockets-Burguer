import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import { useSelector } from 'react-redux';

const OrdersScreen = () => { 
    const orders = useSelector(({ orders }) => orders.userOrders);

    console.log(orders);
    return ( 
     <View> 
         <Text>Pedidos</Text>
     </View>
)};

const styles = StyleSheet.create({});

export default OrdersScreen;
