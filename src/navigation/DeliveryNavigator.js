import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { MenuNavigator, UserNavigator } from './StackNavigator';

const Tab = createBottomTabNavigator();

// Tab de Menu e Tab 'Meus Pedidos'
const DeliveryNavigator = () => {
  
  return (
    <Tab.Navigator
      initialRouteName="Menu"
      tabBarOptions={{
        activeTintColor: Colors.accentColor,
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          tabBarIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-rocket' : 'ios-rocket'}
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          title: 'Pedidos',
          tabBarIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-document-text' : 'ios-document-text'}
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DeliveryNavigator;
