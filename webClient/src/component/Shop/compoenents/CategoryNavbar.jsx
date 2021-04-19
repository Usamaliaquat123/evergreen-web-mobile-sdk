/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react'
import {AppContext} from '../../../context/appContext'
import './Styles/CategoryNavbar.css'

export default function CategoryNavbar() {
    const {store}=React.useContext(AppContext);
    const [state,setState]=React.useState(store.allCategories)
    return (
               <div className="flex-row category-navbar-wrapper d-flex justify-content-around align-items-center">
               {state.length > 0 && state.map((item)=>(<button key={item._id} type="button" className="nav-link category-link" onClick={()=>{console.log("clciked")}}>{item.name}</button>))}
               </div>
         
    )
}
