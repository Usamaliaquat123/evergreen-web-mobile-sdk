/* eslint-disable no-console */
import React, { createContext, useState, useEffect } from 'react';

import { BoxLoading } from 'react-loadingg';

import { useMethods } from 'react-use';

import categoryService from '../services/CategoryService';

import productService from '../services/productService';

const initialState = {
	allCategories: [],
	allProducts: [],
};

function createMethods(state) {
	return {
		reset() {
			return initialState;
		},
/**
 * CATEGORIES
 */
		initCategories(allCategories) {
			return { ...state, allCategories };
		},
		addNewCategory(category) {
			return { ...state, allCategories: state.allCategories.concat(category) };
		},
		deleteCategory(catName) {
			return { ...state, allCategories: state.allCategories.filter((u) => catName !== u.catName) };
		},
		editCategory(user) {
			const updatedUsers = [];
			// eslint-disable-next-line array-callback-return
			state.allCategories.map((item) => {
				if (user.id === item.id) updatedUsers.push(user);
				else updatedUsers.push(item);
			});
			return { ...state, allCategories: updatedUsers };
		},

		/**
 * PRODUCTS
 */
		 initProducts(allProducts) {
			return { ...state, allProducts };
		},
	};
}

export const AppContext = createContext();

export default ({ children }) => {
	const [loaded, setLoaded] = useState(false);
	const [store, methods] = useMethods(createMethods, initialState);

	useEffect(async () => {
		try {
			/**
			 * ALL CATEGORIES 
			 */
			const allCategories = await categoryService.allCatgories();
			await methods.initCategories(allCategories.data);
			/**
			 * ALL PRODUCTS 
			 */
			 const allProducts = await productService.allProducts();
			 await methods.initProducts(allProducts.data);

			setLoaded(true);
		} catch (err) {
			console.log(err);
			setLoaded(true);
		}
	}, []);
	return (
		<div>
			{!loaded ? (
				<BoxLoading />
			) : (
				<AppContext.Provider
					value={{
						store,
						methods,
					}}
				>
					{children}
				</AppContext.Provider>
			)}
		</div>
	);
};
