import React from 'react';
import { View, Text } from 'react-native';
import ViewCategoryWrapper from '../../components/Custom/ViewCategoryWrapper';

export default function ViewCategory({ navigation }) {
  const category = navigation.state.params.data;
  return (
        <ViewCategoryWrapper name={category.name} id={category.id} img={category.img}>
            <Text></Text>
            </ViewCategoryWrapper>
  );
}
