import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SCPList from './components/SCPList';
import Header from './components/Header';

// Main App Component
function App() {
  return (
    <div className="App">
      <Header />
      <SCPList />
    </div>
  );
}

export default App;