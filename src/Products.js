import React from 'react'

function Products({ data, setStoredData }) {
    console.log('rendering products list')
    
    return (
        <div className='productsListing'>
            {data?.map(({ id, title, image }) => (
                <div key={id} className='card' onClick={() => setStoredData({ id: { id }, image: image, title: title })}>
                    <img src={image} alt='image' style={{ width: '30%', height: '30%' }} />
                    <h6>{title}</h6>
                </div>
            ))}
        </div>
    )
}

export default React.memo(Products)
