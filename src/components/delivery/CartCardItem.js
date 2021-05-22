import React from 'react'; 
import { View, Text, StyleSheet} from 'react-native'; 

const CartCardItem = ({ title}) => { 
    return ( 
     <View> 
         <Text>{title}</Text>
     </View>
)};

const styles = StyleSheet.create({});

export default CartCardItem;
