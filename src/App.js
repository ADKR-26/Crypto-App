import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CoinData from './components/coin';
import VisitCount from './components/VisitCount';
import DeviceData from './components/DeviceData';

// Import Firebase and initialize it with your Firebase config
import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDL5dEGpcSC6VFpZ_lJa20EfTFWQUi-35o",
  authDomain: "portfolio-174c9.firebaseapp.com",
  projectId: "portfolio-174c9",
  storageBucket: "portfolio-174c9.appspot.com",
  messagingSenderId: "882529091555",
  appId: "1:882529091555:web:84d2aef6f05c253de22ad6",
  measurementId: "G-07LGR4W416"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  console.log("TESTT", analytics);
  

  useEffect(() => {
    axios.get('https://api.coinstats.app/public/v1/coins')
      .then((response => {
        const data = response.data.coins;
        setListOfCoins(data);
      }))
      .catch(error => {
        console.error('Error fetching cryptocurrency data:', error);
      });

    // Log an analytics event when the component mounts
    firebase.analytics().logEvent('app_loaded');
  }, []);

  const filteredCoins = listOfCoins.filter((coins) => {
    return coins.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="App">
      <DeviceData />

      <div className='cryptoHeader'>
        <h1> Crypto App </h1>
        <input type="text" placeholder='Search Here' onChange={(event) => setSearchValue(event.target.value)}/>
      </div>

      <VisitCount />

      <div className='cryptoDisplay'>
        {filteredCoins.map((coins) => {
          return (
            <CoinData
              key={coins.id} // Add a unique key for each coin
              name={coins.name}
              icon={coins.icon}
              price={coins.price}
              symbol={coins.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
