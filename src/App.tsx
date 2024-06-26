import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <NavBar/>
      {/* <div className='padder'/> */}
      <div className="main-content">
        <Dashboard/>
      </div>
    </div>
  );
}

export default App;
