


import {useState} from 'react';
import './App.css';
import AppLoggedIn from './components/AppLoggedIn';
import Navbar from './components/Navbar';

function App() {

  const [loggedIn, setLoggedIn] = useState(true)
  
  return (
    <div className="App">
      <Navbar />
      {loggedIn ? <AppLoggedIn /> : <></>}
    </div>
  );
}



export default App;
