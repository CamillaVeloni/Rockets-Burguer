import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import DeliveryNavigator from './DeliveryNavigator';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <DeliveryNavigator />
    </NavigationContainer>
  );
};

export default RootNavigation;
