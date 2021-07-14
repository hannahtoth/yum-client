import {useState} from 'react';
import './App.css';
import AppLoggedIn from './components/AppLoggedIn';
import Portal from './components/Portal';

function App() {
  
  return (
    <div className="App">

     {/* {loggedIn ? <AppLoggedIn /> : <Portal/>} */}
     <Portal/>
    </div>
  );
}

export default App;
