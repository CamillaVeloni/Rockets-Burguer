import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { MenuNavigator, UserNavigator, AdminNavigator } from './StackNavigator';

const Tab = createBottomTabNavigator();

// Tab de Menu e Tab 'Meus Pedidos'
const DeliveryNavigator = () => {
  // Dummy para administrador ~~ só para verificar as funcionalidades do admin
  // Obs: depois usar o auth
  const admin = false;

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
      {admin ? (
        <Tab.Screen
          name="Dashboard"
          component={AdminNavigator}
          options={{
            tabBarIcon: (props) => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="User"
          component={UserNavigator}
          options={{
            title: 'Pedidos',
            tabBarIcon: (props) => (
              <Ionicons
                name={
                  Platform.OS === 'android'
                    ? 'md-document-text'
                    : 'ios-document-text'
                }
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default DeliveryNavigator;
