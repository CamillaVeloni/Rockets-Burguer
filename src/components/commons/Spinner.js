import React from 'react'; 
import { View, ActivityIndicator, StyleSheet } from 'react-native'; 
import Colors from '../../constants/Colors';

const Spinner = () => { 
    return ( 
     <View style={styles.container}> 
         <ActivityIndicator size="large" color={Colors.accentColor} />
     </View>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default Spinner;
