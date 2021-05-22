import React from 'react'; 
import { StyleSheet } from 'react-native'; 
import { useSelector } from 'react-redux';

import MenuList from '../../components/delivery/MenuList';

// Tela com cardapio da lanchonete
const MenuOverviewScreen = ({ navigation }) => { 
    const availableMenu = useSelector(({ menu }) => menu.availableMenu);

    return ( 
     <MenuList menu={availableMenu} navigation={navigation} />
    );
};

export default MenuOverviewScreen;
