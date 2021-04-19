/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, ListItem, Avatar } from 'react-native-elements';
import CustomListItem from '../../components/Ui/CustomListItem';

export default function ProductAdmin(props) {
  return (
    <View>
      <CustomListItem
        {...props}
        name="All Products"
        subtitle="DryFruits,Dates...."
        id={1}
        iconName="heartbeat"
        location="AllProducts"
        avatar_url="
        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
      />
       <CustomListItem
        {...props}
        name="Add New Product"
        subtitle="DryFruits,Dates...."
        id={1}
        iconName="heartbeat"
        location="AddNewProduct"
        avatar_url="
        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
       />
    </View>
  );
}
