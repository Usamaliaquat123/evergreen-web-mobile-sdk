import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function SubmitButton({ title, onPress }) {
  const styles = StyleSheet.create({
    wrapper: {
      justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingBottom: 5,
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: '#009688',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: wp(40),
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',

    },
    appButtonText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
      alignSelf: 'center',
      textTransform: 'uppercase',
    },
  });
  return (
    <View style={styles.wrapper}>
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Icon
    type="feather"
      name="send"
      size={15}
      color="white"
    />
     <Text style={styles.appButtonText}>{title || 'no title'}</Text>
  </TouchableOpacity>
  </View>
  );
}
