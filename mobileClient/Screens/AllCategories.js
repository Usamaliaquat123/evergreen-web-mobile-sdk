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
import CategoryWrapper from '../components/Custom/CategoryWrapper';
import ResponseScreen from '../components/Ui/ResponseScreen';
import categoriesService from '../services/category.service';
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

export default function AllCategories(props) {
  /**
   * Navigate --helpers
   *** navigation.goBack()
   *** navigation.navigate()
   *** navigation.push()
   *** navigation.pop()
   */

  const [state, setState] = React.useState([]);
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    categoriesService.getAllCategories().then((res) => {
      console.log('====================================');
      console.log(' categoriesService.getAllCategories() --success');
      console.log('====================================');
      setState(res.categories);
      setLoad(true);
    }).catch((err) => {
      console.log('====================================');
      console.log('Error=>', err);
      console.log('====================================');
      setLoad(true);
    });
  }, []);
  const Content = () => (
    <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {load && state && state.length && state.map((item, index) => (<CategoryWrapper location="ViewCategory" key={item._id} {...props} name={item.name} img={item.img} id={item._id}></CategoryWrapper>))}
    </ScrollView>
  );

  return <ResponseScreen ChildComponent={() => <Content />}></ResponseScreen>;
}
