import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const DefaultHeaderBtn = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      color='black'
    />
  );
};

export default DefaultHeaderBtn;