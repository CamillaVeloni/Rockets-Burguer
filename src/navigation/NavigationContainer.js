import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthScreen from '../screens/delivery/AuthScreen';
import DeliveryNavigator from './DeliveryNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
      />
      <Stack.Screen 
        name="Home"
        component={DeliveryNavigator}
      />
    </Stack.Navigator>
  )
}
const NavContainer = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default NavContainer;
