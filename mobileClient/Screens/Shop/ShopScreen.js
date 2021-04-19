/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Text, View } from 'native-base';
// import Logo from '../assets/images/evergreen-pine-tree-logo-design-inspiration-evergreen-pine-tree-logo-design-inspiration-vector-134609964.jpg';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  Button, Icon, Image, SearchBar,
} from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import ResponseScreen from '../../components/Ui/ResponseScreen';
import productService from '../../services/product.service';
import categoryService from '../../services/category.service';
import SERVER_URL from '../../src/environment';
import TopBanner from '../../components/ReusableComponents/TopBanner';

/**
 *
 */

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapProductWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  productWrapper: {
    width: wp(45),
    height: wp(45),
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 2,
  },
  imageWrapper: {},
  productImageStyles: { width: '100%', height: '80%' },
  cartButtonStyles: {
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    backgroundColor: 'blue',
  },
  cartButtonTitleStyles: { fontSize: 12 },
});

export default function AllCategories() {
  /**
   * Navigate --helpers
   *** navigation.goBack()
   *** navigation.navigate()
   *** navigation.push()
   *** navigation.pop()
   */

  const [state, setState] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState('');
  const [load, setLoad] = React.useState(false);
  const [search, setSearch] = React.useState('');

  /**
   *
   */
  React.useEffect(() => {
    productService
      .getAllProducts()
      .then((res) => {
        console.log('*** getProductsByCategory*** Success');
        setState(res.data);
        setLoad(true);
      })
      .catch((err) => {
        console.log('inside error ');
        console.log(err);
        setLoad(true);
      });
  }, []);
  /**
   *
   */
  React.useEffect(() => {
    categoryService
      .getAllCategories()
      .then((res) => {
        const categoriesList = [];
        res.categories.forEach((item) => categoriesList.push({ label: item.name, value: item._id }));
        setCategories(categoriesList);
        // console.log('*** React.useEffect(() => *** getAllCategories => Success');
        // console.log(categoriesList);
        setLoad(true);
      })
      .catch((err) => {
        console.log('inside error ');
        console.log(err);
        setLoad(true);
      });
  }, []);

  /**
   *
   */
  const itemsByCategory = (id) => {
    console.log(id);
    setLoad(false);
    if (id === undefined || id === '') {
      setCategory('');
      productService
        .getAllProducts()
        .then((res) => {
          setState(res.data);
          setLoad(true);
        })
        .catch((err) => {
          console.log('inside error ');
          console.log(err);
          setLoad(true);
        });
    } else {
      setCategory(id);
      productService
        .getProductsByCategory(id)
        .then((res) => {
          setState(res.data);
          setLoad(true);
        })
        .catch((err) => {
          console.log('inside error ');
          console.log(err);
          setLoad(true);
        });
    }
  };

  const MapProducts = () => (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
          width: wp(100),
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Showing All Products
        </Text>
      </View>
      {state?.length > 0 ? (
        <View style={styles.mapProductWrapper}>
          {state?.map((item) => (
            <View style={styles.productWrapper} key={item._id}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: `${SERVER_URL}/${item.img}` }}
                  style={styles.productImageStyles}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <Button
                titleStyle={styles.cartButtonTitleStyles}
                icon={<Icon name="code" color="#ffffff" />}
                buttonStyle={styles.cartButtonStyles}
                containerStyle={{}}
                title={item.name}
              />
            </View>
          ))}
        </View>
      ) : (
        <View
          tyle={{
            flex: 1,
            flexDirection: 'column',
            height: wp(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Ooopss.... No Items Found</Text>
        </View>
      )}
    </>
  );
  const Content = () => (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* App bar  */}
      <TopBanner title="All Products" />
      {/* App Bar End */}
      {/* Picker Start  */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 1,
          // flex: 1,
          height: 60,
          width: wp(100),
        }}
      >
        <SearchBar
        searchIcon={{ size: 24 }}
        placeholder="Type Here..."
        onChangeText={(text) => setSearch(text)}
        onClear={(text) => setSearch('')}
        containerStyle={{
          flex: 1, width: wp(95), height: wp(10), backgroundColor: 'white',
        }}
        inputContainerStyle={{
          flex: 1, width: wp(95), height: wp(10), backgroundColor: 'white',
        }}
        inputStyle={{}}
        platform="default"
        value={search}
        />
      </View>
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
      }}
      >
        <Picker style={{ height: 50, width: wp(95) }} selectedValue={category || ''} onValueChange={(itemValue, itemIndex) => itemsByCategory(itemValue)}>
          <Picker.Item label="Select Category" value="" />
          {categories.length > 0 && categories.map((item, index) => (<Picker.Item key={item.value} label={item.label} value={item.value} />))}
        </Picker></View>

      {/* Picker End */}
      {load ? <MapProducts /> : <Text>loading</Text>}
    </ScrollView>
  );

  return <ResponseScreen ChildComponent={() => <Content />}></ResponseScreen>;
  // return <View ChildComponent={() => <Text>asd</Text>}></View>;
}
