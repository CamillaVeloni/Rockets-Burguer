import React from 'react'; 
import { View, ActivityIndicator, StyleSheet } from 'react-native'; 
import Colors from '../../constants/Colors';

const Spinner = ({ containerStyle }) => { 
    return ( 
     <View style={[styles.container, containerStyle]}> 
         <ActivityIndicator size="large" color={Colors.primaryColor} />
     </View>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default Spinner;
