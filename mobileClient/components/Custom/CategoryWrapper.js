import React from 'react';
import {
  View, Text, StyleSheet, ImageBackground, TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SERVER_URL from '../../src/environment';

const styles = StyleSheet.create({
  container: {
    margin: wp(0.5),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  textContainer: {
    backgroundColor: '#000',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 3,
    // textAlign: 'center',
    // backgroundColor: '#000000a0',
  },
  image: {
    height: hp(25),
    width: wp(45),
    resizeMode: 'cover',
  },
});
export default function CategoryWrapper(props) {
  const {
    name, img, id, location,
  } = props;

  // const newImage = img.replace('http://localhost:8080', 'http://192.168.18.252:8080');
  const newImage = img.replace(
    'http://localhost:8080',
    `${SERVER_URL}`,
  );
  console.log('====================================');
  console.log('newImage', img);
  console.log('====================================');
  return (
    <TouchableOpacity button onPress={() => { props.navigation.navigate(location, { data: props }); }}>
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: newImage }}
        style={styles.image}
      ></ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name || 'Name'}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
}
