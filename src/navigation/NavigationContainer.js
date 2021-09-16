import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { AuthNavigator } from './StackNavigator';
import DeliveryNavigator from './DeliveryNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const token = false;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Home" component={DeliveryNavigator} />
    </Stack.Navigator>
  );
};
const NavContainer = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default NavContainer;
