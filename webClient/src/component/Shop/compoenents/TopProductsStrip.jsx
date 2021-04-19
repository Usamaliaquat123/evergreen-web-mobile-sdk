/* eslint-disable no-underscore-dangle */
import React from 'react'
import TopProductWrapper from './TopProductWrapper'

export default function TopProductsStrip({TopProducts}) {
    return (
        <div className="flex-row d-flex justify-content-around align-items-center">
          
          {TopProducts.length> 0 && TopProducts.map((item)=>{return(
                                <TopProductWrapper
                                key={item._id}
								name={item.name}
								price={item.price}
								img={item.img}
								cat={item.cat}
                                /> 
          )})} 
        </div>
    )
}
