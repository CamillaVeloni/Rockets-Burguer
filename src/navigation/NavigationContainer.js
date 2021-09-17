import React, { useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigationActions,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';

import SplashScreen from '../screens/SplashScreen';
import { AuthNavigator } from './StackNavigator';
import DeliveryNavigator from './DeliveryNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const isAuth = useSelector(({ auth }) => !!auth.token);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      {!isAuth ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Home" component={DeliveryNavigator} />
      )}
    </Stack.Navigator>
  );
};

const NavContainer = () => {
  /*  const navRef = useRef();

  const isAuth = useSelector(({ auth }) => !!auth.token);
  useEffect(() => {
    if (!isAuth)
      navRef.current.dispatch(Comm.navigate({ routeName: 'Auth'}))
  }, [isAuth]);  */

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default NavContainer;
