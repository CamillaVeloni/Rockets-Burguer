import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MenuOverviewScreen from '../screens/delivery/MenuOverviewScreen';
import DetailsFoodScreen, {
  screenOptions as DetailsScreenOptions,
} from '../screens/delivery/DetailsFoodScreen';
import CartScreen from '../screens/delivery/CartScreen';
import DefaultHeaderButton from '../components/commons/DefaultHeaderButton';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

const MenuNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={MenuOverviewScreen}
        options={({ navigation }) => ({
          headerTitle: 'Cardápio Rockets',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={DefaultHeaderButton}>
              <Item
                title="Cart"
                iconSize={23}
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => navigation.navigate('Cart')}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="Details"
        component={DetailsFoodScreen}
        options={DetailsScreenOptions}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default MenuNavigation;
