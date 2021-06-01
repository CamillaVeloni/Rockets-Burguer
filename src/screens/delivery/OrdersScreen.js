import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import OrderCardItem from '../../components/delivery/OrderCardItem';

const OrdersScreen = () => {
  const orders = useSelector(({ orders }) => orders.userOrders);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <OrderCardItem items={item.items} amount={item.totalAmount} date={item.readableDate}/>}
    />
  );
};

export default OrdersScreen;
