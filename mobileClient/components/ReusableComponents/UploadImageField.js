import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(100),
    height: wp(40),
    // borderWidth: 2,
    // borderColor: 'green',
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,

  },
});

export default function UploadImageField({ onPress }) {
  return (
<TouchableOpacity
    onPress={onPress}
    style={styles.input}
>
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <Text style={styles.text}>
        Upload Image

      </Text>
<Text> <Icon name="upload" size={25} color="#201" /></Text>
    </View>
  </TouchableOpacity>
  );
}
