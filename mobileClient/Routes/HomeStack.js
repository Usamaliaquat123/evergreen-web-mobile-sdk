/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SignUp from '../Screens/SignUp';
import AdminPanel from '../Screens/AdminPanel';
import AllCategories from '../Screens/AllCategories';
import CategoryAdmin from '../Screens/CategoryAdmin';
import ViewCategory from '../Screens/Category/ViewCategory';
import AddNewCategory from '../Screens/Category/AddNewCategory';
import AddNewProduct from '../Screens/Product/AddNewProduct';
import AllProducts from '../Screens/Product/AllProducts';
import ProductAdmin from '../Screens/Product/ProductAdmin';
import AppProvider from '../context/appContext';

const screens = {

  AdminPanel: {
    screen: AdminPanel,
    // screen: <AppProvider><AdminPanel /></AppProvider>,
  },
  /**
   *  Category Screens Start
  */
  CategoryAdmin: {
    screen: CategoryAdmin,
  },
  AllCategories: {
    screen: AllCategories,
  },
  AddNewCategory: {
    screen: () => <AppProvider><AddNewCategory /></AppProvider>,
    // screen: AddNewCategory,
  },
  ViewCategory: {
    screen: ViewCategory,
  },

  /**
   *  Category Screens End
  */
  /**
   *  Products Screens Start
  */
  ProductAdmin: {
    screen: ProductAdmin,
  },
  AllProducts: {
    screen: () => <AppProvider><AllProducts /></AppProvider>,
  },
  AddNewProduct: {
    screen: () => <AppProvider><AddNewProduct /></AppProvider>,
    // screen: AddNewCategory,
  },
  /**
   *  Products Screens End
  */

  SignUp: {
    screen: SignUp,
  },
};
const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
