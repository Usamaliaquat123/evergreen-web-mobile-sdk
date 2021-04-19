/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DocumentPicker from 'react-native-document-picker';
import { useFormik, Formik } from 'formik';
import * as yup from 'yup';
import SubmitButton from '../../components/ReusableComponents/SubmitButton';
import TopBanner from '../../components/ReusableComponents/TopBanner';
import Label from '../../components/ReusableComponents/Label';
import { AppContext } from '../../context/appContext';
import UploadImageField from '../../components/ReusableComponents/UploadImageField';
import categoryService from '../../services/category.service';
/**
 * Yup Validation Schema
 *
 */
const loginValidationSchema = yup.object().shape({
  productName: yup.string().required('Product Name is required'),
  productPrice: yup
    .number()
    .min(1, ({ min }) => `Price must be at least ${min} characters`)
    .required('Price is required'),
  productCategory: yup.string().required('Product category is required'),
});

const styles = StyleSheet.create({
  input: {
    height: 45,
    width: wp(90),
    margin: 12,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  pickerWrapper: {
    width: wp(90),
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  picker: {
    width: wp(90),
    height: 50,
  },
  pickerItem: {},
  imagePreviewWrapper: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AddNewCategory = () => {
  const { store } = React.useContext(AppContext);
  const allCategoriesList = store.allCategories.map((item) => ({
    label: item.name,
    value: item._id,
  }));
  const [state, setState] = React.useState({
    productImg: '',
    productCategory: '',
    allCategories: allCategoriesList,
  });

  const uploadImageHanlder = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
        );
        setState({ ...state, productImg: res });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const onSubmit = () => {};

  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{
        productName: '',
        productPrice: '',
        productCategory: '',
      }}
      onSubmit={(values, { resetForm }) => {
        if (state.productImg !== '') {
          const categoryObject = {
            productCategory: values.productCategory, productName: values.productName, productPrice: values.productPrice, productImage: state.productImg,
          };
          console.log('Img is preasent', categoryObject);
          categoryService.addNewCategory(categoryObject).then((resData) => {
            if (resData.success) {
              console.log('category inserted successfully');
              setState({ ...state, productImg: '' });
              ToastAndroid.show('Catgeory inserted successfully...', ToastAndroid.SHORT);
              resetForm();
            } else {
              console.log('====================================');
              console.log('failed to insert category');
              console.log('====================================');
              ToastAndroid.show('Catgeory insertion failed...', ToastAndroid.SHORT);
            }
          }).catch((err) => {
            console.log('====================================');
            console.log('insideError', err);
            console.log('failed to insert category');
            console.log('====================================');
            ToastAndroid.show('Something went wrong...', ToastAndroid.SHORT);
          });
        } else {
          console.log('Img is required');
        }
      }}
    >
      {({
        handleChange, handleBlur, handleSubmit, values, errors, isValid,
      }) => (
        <SafeAreaView>
          <TopBanner title=" Add New Product" />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Label title="Product Name " />
            <TextInput
              name="productName"
              placeholder="@product name"
              style={styles.input}
              onChangeText={handleChange('productName')}
              onBlur={handleBlur('productName')}
              value={values.productName}
            />
            {errors.productName && (
              <Text style={{ fontSize: 10, color: 'red' }}>
                {errors.productName}
              </Text>
            )}
            <Label title="Product Price " />
            <TextInput
              name="productPrice"
              placeholder="@product price"
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange('productPrice')}
              onBlur={handleBlur('productPrice')}
              value={values.productPrice}
            />
            {errors.productPrice && (
              <Text style={{ fontSize: 10, color: 'red' }}>
                {errors.productPrice}
              </Text>
            )}
            <Label title="Product Category " />
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={state.productCategory}
                style={styles.picker}
                name="productCategory"
                itemStyle={styles.pickerItem}
                onValueChange={(value, index) => { handleChange('productCategory'); setState({ ...state, productCategory: value }); }}
                onBlur={handleBlur('productCategory')}
              >
                <Picker.Item label="Select Category" value="" />
                {state.allCategories.length > 0
                  && state.allCategories.map((item, index) => (
                    <Picker.Item
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
              </Picker>
            </View>
            <Label title="Product Image " />

          </View>
          {state.productImg !== '' ? (
          <View style={styles.imagePreviewWrapper}>
            <Image
              source={{ uri: state.productImg.uri }}
              style={{ height: 100, width: 100 }}
            ></Image>

          </View>
          ) : (<UploadImageField onPress={uploadImageHanlder} />)}
          {/* Preview Image Start */}

          {/*  Preview Image End */}
          <SubmitButton onPress={handleSubmit} title="Add" />
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default AddNewCategory;
