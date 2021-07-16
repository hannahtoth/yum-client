import { useState } from "react";
import "./App.css";
import AppLoggedIn from "./components/AppLoggedIn";
import Portal from "./components/Portal";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Portal />
    </div>
  );
}

export default App;
