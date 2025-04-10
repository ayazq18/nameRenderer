import React from 'react'

function ProductsDetails({ storeddata, counter, setCounter }) {
    
    return (
        <div className='selectedProd'>
            {storeddata.image && storeddata.title ?
                <div className='card'>
                    <img src={storeddata?.image} alt='image' style={{ width: '30%', height: '30%' }} />
                    <h6>{storeddata?.title}</h6>
                </div>

                :
                <>
                    <span className='circle'>
                        {counter}
                    </span>

                    <button onClick={() => setCounter(counter + 1)}>Click</button>
                    <button onClick={() => console.log('hi')}>Click me</button>

                </>
            }
        </div>
    )
}

export default ProductsDetails
