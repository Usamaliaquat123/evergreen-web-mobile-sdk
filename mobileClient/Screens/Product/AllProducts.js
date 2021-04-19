/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/style-prop-object */
import React from 'react';
import { Container, Text } from 'native-base';
// import Logo from '../assets/images/evergreen-pine-tree-logo-design-inspiration-evergreen-pine-tree-logo-design-inspiration-vector-134609964.jpg';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProductWrapper from '../../components/Custom/ProductWrapper';
import ResponseScreen from '../../components/Ui/ResponseScreen';
import { AppContext } from '../../context/appContext';
/**
 *
 */

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(0.5),

  },
});

export default function AllProducts(props) {
  const { store } = React.useContext(AppContext);
  console.log('====================================');
  console.log(store.allProducts[0]);
  console.log('====================================');
  const [state, setState] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  React.useEffect(() => {
    setState(store.allProducts);
    setLoad(true);
  }, []);

  const Content = () => (
    <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {load && state && state.length && state.map((item, index) => (<ProductWrapper location="ViewCategory" key={item._id} {...props} name={item.name} price={item.price} cat={item.cat} img={item.img} id={item._id}></ProductWrapper>))}
    </ScrollView>
  );

  return <ResponseScreen ChildComponent={() => <Content />}></ResponseScreen>;
}
