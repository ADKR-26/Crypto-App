import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CoinData from './components/coin';

function App() {

  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    console.log('useEffect');

    axios.get('https://api.coinstats.app/public/v1/coins')
      .then((response => {
        const data = response.data.coins;
        setListOfCoins(data);
      }))

  }, []);

  const filteredCoins = listOfCoins.filter((coins) => {
    return coins.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="App">

      <div className='cryptoHeader'>
        <h1> Crypto App </h1>
        <input type="text" placeholder='Search Here' onChange={(event) => setSearchValue(event.target.value)}/>
      </div>

      <div className='cryptoDisplay'>

        {filteredCoins.map((coins) => {
          return <CoinData
            name={coins.name}
            icon={coins.icon}
            price={coins.price}
            symbol={coins.symbol}
          />
        })}
      </div>

    </div>
  );
}

export default App;
