/* eslint-disable no-unused-vars */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, ListItem, Avatar } from 'react-native-elements';

export default function CustomListItem(props) {
  const {
    name,
    subtitle,
    img,
    location,
    id,
    iconName,
    navigation,
    avatar_url,
  } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(location || 'Categories');
      }}

    >
      <ListItem button key={id} bottomDivider>
        {/* <Avatar source={{ uri: avatar_url }} /> */}
        <Icon
          raised
          name={iconName || 'heartbeat'}
          type="font-awesome"
          color="#f50"
        />
        <ListItem.Content>
          <ListItem.Title>{name || 'name'}</ListItem.Title>
          <ListItem.Subtitle>{subtitle || 'subtitle'}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
}
