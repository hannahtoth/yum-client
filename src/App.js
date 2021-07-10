import {useState} from 'react';
import './App.css';
import AppLoggedIn from './components/AppLoggedIn';

function App() {

  const [loggedIn, setLoggedIn] = useState(true)
  return (
    <div className="App">
      {loggedIn ? <AppLoggedIn /> : <></>}
    </div>
  );
}

export default App;
