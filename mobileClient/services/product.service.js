import axios from 'axios';
import SERVER_URL from '../src/environment';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const productService = {
  getAllProducts: () => axios.get(`${SERVER_URL}/product/all_products`, headers).then((res) => res.data).catch((err) => err),
  getProductsByCategory: (id) => axios.get(`${SERVER_URL}/product/get-products-by-category?id=${id}`, headers).then((res) => res.data).catch((err) => err),
  addNewProduct: (categoryObject) => {
    console.log('====================================');
    console.log(categoryObject.productImage.name,
      categoryObject.productImage.type,
      categoryObject.productImage.uri);
    console.log('====================================');
    const formData = new FormData();
    formData.append('name', `${categoryObject.productName}`);
    formData.append('cat', `${categoryObject.productCategory}`);
    formData.append('price', `${categoryObject.productPrice}`);
    formData.append('img', {
      name: categoryObject.productImage.name,
      type: categoryObject.productImage.type,
      uri: categoryObject.productImage.uri,
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

export default productService;
