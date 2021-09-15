import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import useFetch from '../../hooks/useFetch';
import { fetchOrders } from '../../store/actions/order';
import OrderCardItem from '../../components/delivery/OrderCardItem';
import Spinner from '../../components/commons/Spinner';
import EmptyComponent from '../../components/commons/EmptyComponent';

const OrdersScreen = () => {
  
  const { loading, serverError, dispatchHandler } = useFetch(fetchOrders());

  const orders = useSelector(({ orders }) => orders.userOrders);

  if (loading) return <Spinner />
  if (serverError)
    return <EmptyComponent label={serverError} onRetryPress={dispatchHandler} />;

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OrderCardItem
          items={item.items}
          amount={item.totalAmount}
          date={item.readableDate}
        />
      )}
    />
  );
};

export default OrdersScreen;
