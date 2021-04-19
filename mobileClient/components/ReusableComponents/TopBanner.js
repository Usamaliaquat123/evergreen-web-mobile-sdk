import React from 'react';
import { View, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function TopBanner({ title }) {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00ced1',
      height: 60,
      width: wp(100),
    }}
    ><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>{title || 'All Products'}</Text></View>
  );
}
