import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MenuOverviewScreen from '../screens/delivery/MenuOverviewScreen';
import DetailsFoodScreen from '../screens/delivery/DetailsFoodScreen';
import CartScreen from '../screens/delivery/CartScreen';

const Stack = createStackNavigator();

const MenuNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Menu" component={MenuOverviewScreen} />
            <Stack.Screen name="Details" component={DetailsFoodScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
    )
}

export default MenuNavigation;