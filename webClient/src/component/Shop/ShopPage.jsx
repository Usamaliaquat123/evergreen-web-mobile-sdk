/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from 'react';
import { AppContext } from '../../context/appContext';
import SERVER_URL from '../../environment';
import ProductWrapper from './compoenents/ProductWrapper';
import CategoryNavbar from './compoenents/CategoryNavbar';
import TopProductsStrip from './compoenents/TopProductsStrip'
import './compoenents/Styles/ShopPage.css'

export default function ShopPage() {
	const { store } = React.useContext(AppContext);
	const [state, setState] = React.useState({
		allCategories: store.allCategories,
		allProducts: store.allProducts,
	});

	return (
		<div className='container-fluid'>
            {/* Category Navbar Start */}
			<div className='row'>
				<div className='col-md-12'>
					<CategoryNavbar />
				</div>
			</div>
            {/* Category Navbar Ends */}
            {/* Top Products Strip Start */}
            <div className=' row'>
				<div className='mt-3 mb-3 text-center col-md-12'>
				<p className="product-headlines-text">Top Products </p>
				</div>
                <div className=' col-md-12'>
				<TopProductsStrip TopProducts={state.allProducts} />
				</div>
			</div>
            {/* Top Products Strip End  */}
            {/* Products Start */}
			<div className='row'>
            <div className='mt-3 mb-3 text-center col-md-12'>
				<p className="product-headlines-text">All  Products </p>
				</div>
				{state.allProducts?.length > 0 &&
					state.allProducts?.map((item) => {
						return (
							<ProductWrapper
								key={item._id}
								name={item.name}
								price={item.price}
								img={item.img}
								cat={item.cat}
							/>
						);
					})}
			</div>
            {/* Products End */}
		</div>
	);
}
