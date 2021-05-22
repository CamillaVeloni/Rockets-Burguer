import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MenuNavigation from './MenuNavigation';
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <MenuNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
