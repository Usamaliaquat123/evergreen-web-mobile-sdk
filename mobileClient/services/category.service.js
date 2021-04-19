/* eslint-disable no-undef */
import axios from 'axios';
import SERVER_URL from '../src/environment';

const categoriesService = {
  // getAllCategories: () => new Promise((resolve, reject) => {
  //   const ref = firebase.database().ref('categories/');
  //   ref.on(
  //     'value',
  //     (snapshot) => resolve(snapshot.val()),
  //     (error) => {
  //       console.log('Error');
  //       return reject(error.code);
  //     },
  //   );
  // }),
  getAllCategories: () => {
    console.log('====================================');
    console.log(`${SERVER_URL}/category/all_categories`);
    console.log('====================================');
    const config = {
      method: 'get',
      url: `${SERVER_URL}/category/all_categories`,
      headers: { },
    };
    return axios(config)
      .then((response) => response.data)
      .catch((err) => err);
  },
  addNewCategory: (categoryObject) => {
    const formData = new FormData();
    formData.append('name', `${categoryObject.categoryName}`);
    formData.append('img', {
      name: categoryObject.categoryImage.name,
      type: categoryObject.categoryImage.type,
      uri: categoryObject.categoryImage.uri,
      // Platform.OS === 'android' ? categoryObject.productImage.uri : categoryObject.productImage.uri.replace('file://', ''),      uri: categoryObject.productImage.uri,

    });
    // formdata.append('img', categoryObject.files[0], 'download (2).jpeg');
    return axios({
      method: 'POST',
      url: `${SERVER_URL}/category/insert`,
      data: formData,
      headers: {
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
      },
    }).then((response) => response.data)
      .catch((error) => {
        console.log('====================================');
        console.log('insideError', error);
        console.log('====================================');
        // console.log(error.response);
      });
  },
};

export default categoriesService;
