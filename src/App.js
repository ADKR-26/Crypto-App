import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [listOfCoins, setListOfCoins] = useState([]);
  
  useEffect(() => {
    console.log('useEffect');

    axios.get('http://api.coinstats.app/public/v1/coins?skip=0&limit=10')
    .then((response => {
      const data = response.data.coins;
      // console.log(data);
      setListOfCoins(data);
    }))

  }, []);

  return (
    <div className="App">

      <div className='cryptoHeader'>

      </div>

      <div className='cryptoDisplay'>
        {listOfCoins.map((coins) => {
          return <h1> {coins.name} </h1>
        })}
      </div>

    </div>
  );
}

export default App;
