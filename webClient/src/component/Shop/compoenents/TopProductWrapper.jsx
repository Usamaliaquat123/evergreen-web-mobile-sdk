/* eslint-disable no-unused-vars */
import React from 'react'
import './Styles/TopProductWrapper.css'
import SERVER_URL from '../../../environment'

export default function TopProductWrapper({name,price,img,cat}) {
    return (
     
        <div className="card top-product-wrapper">
        <div className='card-img'>
            <img alt='' src={`${SERVER_URL}/${img}`} className="img-fluid top-product-image" />
        </div>
        </div>

    )
}
