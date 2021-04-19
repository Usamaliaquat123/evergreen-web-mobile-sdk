/* eslint-disable no-unused-vars */
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(100),
    height: wp(100),
    padding: 5,
    borderColor: 'green',
    borderWidth: 5,
  },

});

function ResponseScreen(props) {
  const { ChildComponent } = props;
  return (
    <View style={styles.container}>
      <ChildComponent />
    </View>
  );
}

export default ResponseScreen;
