import React from 'react'

export default function AdminCard({title,count,color}) {

    const cardStyle={
        height:"100px",
    }
    return (
        <div className={`card p-1  bg-${color}`} style={cardStyle}>
        <div className="w-100 h-50 d-flex flex-row justify-content-center align-items-start">{title}</div>
        <div className="w-100 h-50 d-flex flex-row justify-content-end align-items-end">{count}</div>
        </div>
    )
}
