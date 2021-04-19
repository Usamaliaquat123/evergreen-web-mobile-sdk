import React from 'react'
import SERVER_URL from '../../../environment'
import './Styles/ProductWrapper.css'

export default function ProductWrapper({name,price,img,cat}) {
    return (
        <div className='p-3 col-md-3'>
                                        <div className="card ">
                                        <div className="text-center card-header">{name}</div>
										<div className='card-img'>
											<img alt='' src={`${SERVER_URL}/${img}`} className="img-fluid product-image" />
										</div>
                                        <div className="card-body">
                                           <p> Category : {cat}</p>
                                        </div>
                                        <div className="text-center card-body">
                                         <button type="button" className="btn btn-sm btn-success"> {`SHOP $${price}`}</button>
                                        </div>
                                        </div>
									</div>
    )
}
