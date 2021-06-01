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
import AdminScreen from '../screens/admin/AdminScreen';

import DefaultHeaderButton from '../components/commons/DefaultHeaderButton';
import Colors from '../constants/Colors';
import EditItemScreen from '../screens/admin/EditItemScreen';

const Stack = createStackNavigator();

const defaultScreenOptions = {
  headerTitleStyle: {
    fontFamily: 'Mont-bold',
    fontSize: 20,
  },
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
}

const MenuNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultScreenOptions}
    >
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
      <Stack.Screen name="Cart" component={CartScreen} options={{
        headerTitle: 'Sacola'
      }}/>
    </Stack.Navigator>
  );
};

const UserNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Orders" component={OrdersScreen} options={{
        headerTitle: 'Meus Pedidos'
      }} />
    </Stack.Navigator>
  )
}

const AdminNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Dashboard" component={AdminScreen} options={{
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={DefaultHeaderButton}>
            <Item
              title="Create"
              iconSize={23}
              iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              onPress={() => navigation.navigate('EditItem')}
            />
          </HeaderButtons>
        )
      }}/>
      <Stack.Screen name="EditItem" component={EditItemScreen} />
    </Stack.Navigator>
  )
}

export { MenuNavigator, UserNavigator, AdminNavigator };
