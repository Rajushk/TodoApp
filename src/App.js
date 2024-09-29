import logo from './logo.svg';
import './App.css';
import Navbar from "./component/Navbar"
import Home from './pages/Home';
import { useState } from 'react';

function App() {
  const [theme, setTheme]=useState(true)
  return (
   <div>
    <Navbar theme={theme} setTheme={setTheme}/>
    <Home  theme={theme}/>
   </div>
  );
}

export default App;
