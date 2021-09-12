import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrders } from '../../store/actions/order';
import OrderCardItem from '../../components/delivery/OrderCardItem';
import Spinner from '../../components/commons/Spinner';

const OrdersScreen = () => {
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(({ orders }) => orders.userOrders);

  useEffect(() => {
    const fetchingOrders = async () => {
      setIsLoading(true);
      await dispatch(fetchOrders());
      setIsLoading(false);
    }

    fetchingOrders();
  }, []);

  if(isLoading) return <Spinner />

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
