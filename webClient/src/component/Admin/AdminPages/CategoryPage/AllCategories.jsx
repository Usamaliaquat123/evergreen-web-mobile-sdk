/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';

import EditIcon from '@material-ui/icons/Edit';

import '../../../Styles/General.css';

import CategoryService from '../../../../services/CategoryService';

import { AppContext } from '../../../../context/appContext';

import SERVER_URL from '../../../../environment';

export default function AllCategories() {
	const { store, methods } = React.useContext(AppContext);
	// css
	const catImageCss = {
		// height:"100px",
		width: '100px',
	};

	//  operations
	const deleteCategory = (catName) => {
		CategoryService.deleteCatgeory(catName)
			.then((res) => {
				if (res.success) methods.deleteCategory(catName);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const editCategory = (catName) => {
		console.log(catName);
	};
	return (
		<div>
			<table className='table'>
				<thead>
					<tr>
						<th className='text-12' scope='col'>
							Name
						</th>
						<th className='text-12' scope='col'>
							Description
						</th>
						<th className='text-12' scope='col'>
							Image
						</th>
						<th className='text-12' scope='col'>
							Operations
						</th>
					</tr>
				</thead>
				<tbody>
					{store &&
						store.allCategories &&
						store.allCategories.map((item) => {
							return (
								<tr key={item._id}>
									<th className='text-12'>{item.name}</th>
									<td className='text-12 '>{item.catDescription || 'no desc'}</td>
									<td className='text-12'>
										<img
											alt=''
											className='img-fluid'
											style={catImageCss}
											// src={`${SERVER_URL}/${ item.img.replace}`}
											src={`${item.img.replace('http://localhost:8080', `${SERVER_URL}`)}`}
										/>
									</td>
									<td className='flex-row text-12 d-flex justify-content-around align-items-center'>
									
										<span
											className='badge badge-success'
											id={item.name}
											onClick={() => {
												editCategory(item.name);
											}}
										>
											<EditIcon />
										</span>
                    <span
											className='badge badge-danger'
											id={item.catName}
											onClick={() => {
												deleteCategory(item.name);
											}}
                    >
											<DeleteIcon />
										</span>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}
