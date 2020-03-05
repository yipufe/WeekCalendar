import React from 'react';
import './app.scss';
import Calendar from './Components/Calendar/Calendar';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Calendar />
    </div>
  );
}

export default App;
