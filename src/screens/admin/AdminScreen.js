import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import MenuList from '../../components/delivery/MenuList';

const AdminScreen = ({ navigation }) => {
  const availableMenu = useSelector(({ menu }) => menu.availableMenu);

  return <MenuList menu={availableMenu} navigation={navigation} admin/>
};

export default AdminScreen;
