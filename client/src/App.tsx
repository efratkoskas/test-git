import React from 'react';
import './App.css';
import Routers from './routers/Routers';
import NavBar from './components/navbar/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routers />
    </div>
  );
};

export default App;
