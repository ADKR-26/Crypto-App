import React from 'react'

function CoinData({name, price, icon, symbol}) {
    // console.log(icon);
  return (
    <div className='coin'>
        <h1> Name: {name} </h1>
        <img src={icon} alt={icon} />
        
        <h3> Price: {price} </h3>
        <h3> Symbol: {symbol} </h3>
    </div>
  )
}

export default CoinData