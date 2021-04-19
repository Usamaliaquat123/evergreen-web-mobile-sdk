import React from 'react';
import { View, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Label({ title }) {
  return (
        <View style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 25,
          width: wp(100),
        }}
        ><Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>{title || 'All Products'}</Text></View>
  );
}
