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
  categoryName: yup.string().required('Category Name is required'),

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
    categoryImg: '',
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
        setState({ ...state, categoryImg: res });
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
        categoryName: '',
      }}
      onSubmit={(values, { resetForm }) => {
        if (state.categoryImg !== '') {
          const categoryObject = {
            categoryName: values.categoryName, categoryImage: state.categoryImg,
          };
          console.log('Img is preasent', categoryObject);
          categoryService.addNewCategory(categoryObject).then((resData) => {
            if (resData.success) {
              console.log('category inserted successfully');
              setState({ ...state, categoryImg: '' });
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
          <TopBanner title=" Add New Category" />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Label title="Category Name " />
            <TextInput
              name="categoryName"
              placeholder="@category name"
              style={styles.input}
              onChangeText={handleChange('categoryName')}
              onBlur={handleBlur('categoryName')}
              value={values.categoryName}
            />
            {errors.categoryName && (
              <Text style={{ fontSize: 10, color: 'red' }}>
                {errors.categoryName}
              </Text>
            )}
            </View>

          {state.categoryImg !== '' ? (
          <View style={styles.imagePreviewWrapper}>
            <Image
              source={{ uri: state.categoryImg.uri }}
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
