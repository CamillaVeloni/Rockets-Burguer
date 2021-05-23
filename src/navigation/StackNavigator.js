import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MenuOverviewScreen from '../screens/delivery/MenuOverviewScreen';
import DetailsFoodScreen, {
  screenOptions as DetailsScreenOptions,
} from '../screens/delivery/DetailsFoodScreen';
import CartScreen from '../screens/delivery/CartScreen';
import OrdersScreen from '../screens/delivery/OrdersScreen';

import DefaultHeaderButton from '../components/commons/DefaultHeaderButton';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const MenuNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Mont-bold'
        },
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
      }}
    >
      <Stack.Screen
        name="Menu"
        component={MenuOverviewScreen}
        options={({ navigation }) => ({
          headerTitle: 'Cardápio Rockets',
          headerRight: (drawerConfig) => (
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
      <Stack.Screen name="Cart" component={CartScreen} options={{
        headerTitle: 'Sacola'
      }}/>
    </Stack.Navigator>
  );
};

const UserNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Orders" component={OrdersScreen} />
    </Stack.Navigator>
  )
}

export { MenuNavigator, UserNavigator };
