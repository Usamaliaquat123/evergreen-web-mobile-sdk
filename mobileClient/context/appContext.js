/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react';

import { useMethods } from 'react-use';

import { View, Text, TouchableOpacity } from 'react-native';

import productService from '../services/product.service';

import categoryService from '../services/category.service';

const initialState = {
  allProducts: [],
  allCategories: [],
};

function createMethods(state) {
  return {
    reset() {
      return initialState;
    },
    initProducts(allProducts) {
      return { ...state, allProducts };
    },
    initCategories(allCategories) {
      return { ...state, allCategories };
    },
  };
}

export const AppContext = createContext();

export default ({ children }) => {
  //   const { isAuthenticated } = React.useContext(AuthContext);
  const [load, setLoad] = useState(false);
  const [store, methods] = useMethods(createMethods, initialState);

  useEffect(async () => {
    const allProducts = await productService.getAllProducts();
    await methods.initProducts(allProducts.data);
    const allCategories = await categoryService.getAllCategories();
    await methods.initCategories(allCategories.categories);
    setLoad(true);
  }, []);
  return (
    <View>
    {load ? (
      <AppContext.Provider
      value={{
        store,
        methods,
      }}
      >
        <Text>{children}</Text>
    </AppContext.Provider>
    )
      : (<View><Text>Loading</Text></View>)}
     </View>
  );
};
