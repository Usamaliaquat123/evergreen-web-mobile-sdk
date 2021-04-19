/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, ListItem, Avatar } from 'react-native-elements';
import CustomListItem from '../components/Ui/CustomListItem';

export default function AdminPanel(props) {
  return (
    <View>

        <CustomListItem
          {...props}
          name="Categories"
          subtitle="DryFruits,Dates...."
          id={1}
          iconName="arrow-down"
          location="CategoryAdmin"
          avatar_url="
        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
        />
        <CustomListItem
          {...props}
          name="Products"
          subtitle="Almonds,Pistachio,..."
          id={2}
          iconName="arrow-down"
          location="ProductAdmin"
        />
        <CustomListItem
          {...props}
          name="Users"
          subtitle=""
          id={3}
          iconName="arrow-down"
          location="CategoryAdmin"
        />
        <CustomListItem
          {...props}
          name="Admins"
          subtitle=""
          id={4}
          iconName="arrow-down"
          location="CategoryAdmin"
        />
        <CustomListItem
          {...props}
          name="Shop"
          subtitle=""
          id={5}
          iconName="arrow-down"
          location="CategoryAdmin"
        />

    </View>
  );
}
