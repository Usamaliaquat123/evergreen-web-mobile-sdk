import React from 'react';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers';

import * as Yup from 'yup';

import { NotificationManager } from 'react-notifications';

import categoryService from '../../../../services/CategoryService';

import { AppContext } from '../../../../context/appContext';

/* Validation starts here */
const schema = Yup.object().shape({
	// name: Yup.string().required(() => {
	// 	NotificationManager.error('Category Name  is Required');
	// }),
	// desc: Yup.string().required(() => {
	// 	NotificationManager.error('Category Description is  Required');
	// }),
	catName: Yup.string().required('Category Name is required...'),
	catDesc: Yup.string().required('Category Description is required...'),
	// catImage: Yup.string().required('Category Image is required...'),
});

/* Validation ends here */
/* Functional componennet starts here */

const AddCategoryForm = () => {
	const { methods } = React.useContext(AppContext);
	const { register, handleSubmit, reset, errors } = useForm({
		resolver: yupResolver(schema),
		// mode: 'onSubmit',
		// reValidateMode: 'onSubmit',
		// criteriaMode: 'firstError',
		// shouldFocusError: true,
		// shouldUnregister: true,
	});

	React.useEffect(() => {
		console.log('====================================');
		console.log(errors);
		console.log('====================================');
	}, [errors]);

	const onSubmit = async (formData) => {
		// setLoader(false);
		const categoryExist = await categoryService.categoryAlreadyExist(formData.catName);
		if (categoryExist.data) {
			NotificationManager.error(categoryExist.msgBody);
		} else {
    const catObject={name:formData.catName,desc:formData.catDesc,image:formData.catImage}
			categoryService
				.createCategory(catObject)
				.then((res) => {
					if (res.success) {
						NotificationManager.success(res.msgBody);
						methods.addNewCategory(res.payload);
						reset();
					} else {
						NotificationManager.error(res.msgBody);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-12'>
					<form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
						<div className=''>
							<div className='row'>
								<div className='p-3 col-md-3 d-flex justify-content-start align-items-center'>
									<label className="form-control form-control-sm" htmlFor='catName'> Category Name </label>
								</div>
								<div className='p-3 col-md-9 d-flex justify-content-center align-items-center'>
									<input
										type='text'
										className={`form-control form-control-sm border-${
											errors.name?.message === '' ? 'success' : 'danger'
										}`}
										name='catName'
										id='catName'
										ref={register}
									/>
									{errors.name?.message !== '' ? (
										<span>{errors?.name?.message}</span>
									) : (
										<span></span>
									)}
								</div>
							</div>
							<div className='row'>
								<div className='p-3 col-md-3 d-flex justify-content-start align-items-center'>
									<label className="form-control form-control-sm" htmlFor='catDesc'> Category Description </label>
								</div>
								<div className='p-3 col-md-9 d-flex justify-content-center align-items-center'>
									<textarea
										className={`form-control form-control-sm border-${
											errors.desc?.message === '' ? 'success' : 'danger'
										}`}
										name='catDesc'
										id='catDesc'
										type='text'
										ref={register}
										required
									></textarea>
									{errors.desc?.message !== '' ? (
										<span>{errors?.desc?.message}</span>
									) : (
										<span></span>
									)}
								</div>
							</div>
							<div className='row'>
								<div className='p-3 col-md-3 d-flex justify-content-start align-items-center'>
									<label className="form-control form-control-sm" htmlFor='catDesc'> Category Image </label>
								</div>
								<div className='p-3 col-md-9 d-flex justify-content-center align-items-center'>
									<input
										className={`form-control form-control-sm border-${
											errors.name?.message === '' ? 'success' : 'danger'
										}`}
										name='catImage'
										id='catImage'
										type='file'
										ref={register}
										required
									/>
									{errors.catImage?.message !== '' ? (
										<span>{errors?.catImage?.message}</span>
									) : (
										<span></span>
									)}
								</div>
							</div>
                            <div className='row'>
								<div className='p-3 col-md-3 d-flex justify-content-start align-items-center'>
									
								</div>
								<div className='p-3 col-md-9 d-flex justify-content-center align-items-center'>
									<button type="submit" className="btn btn-sm btn-success"><i className="text-white fa fa-user"></i> Add</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default AddCategoryForm;
