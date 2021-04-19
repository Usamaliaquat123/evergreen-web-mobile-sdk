/* eslint-disable no-unused-vars */
import React from 'react'
import AdminCard from './AdminCompoenets/AdminCard'
import {AppContext} from '../../context/appContext'

export default function Dashboard() {
    const {store}=React.useContext(AppContext);
    const [state,setState]=React.useState({
        productsCount:store.allProducts.length,
        categoryCount:store.allCategories.length,
        
    })
    return (
        <div className="row">
        <div className="col-md-3 col-sm-12 col-xl-4 ">
            <AdminCard title="Admin" count={state.productsCount} color="success" />
        </div>
        <div className="col-md-3 col-sm-12 col-xl-4 ">
            <AdminCard title="Products" count={state.categoryCount} color="danger" />
        </div>
        <div className="col-md-3 col-sm-12 col-xl-4 ">
            <AdminCard title="User" count={state.productsCount} color="primary" />
        </div>
        <div className="col-md-3 col-sm-12 col-xl-4 ">
            <AdminCard title="Admin" count={state.productsCount} color="secondary" />
        </div>
        </div>
    )
}
