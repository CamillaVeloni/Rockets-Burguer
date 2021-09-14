import React, {useState} from 'react'; 
import { View, Text, StyleSheet} from 'react-native'; 

const DashboardScreen = () => { 
    return ( 
     <View style={styles.container}> 
         <Text>Dashboard</Text>
         <Text>Tem todos os pedidos!!</Text>
     </View>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default DashboardScreen;
