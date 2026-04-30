import React from 'react';
import { ElectionJourney } from './components/ElectionJourney';
import { CivicGuruSidebar } from './components/CivicGuruSidebar';
import './App.css';

function App() {
  return (
    <>
      <ElectionJourney />
      <CivicGuruSidebar />
    </>
  );
}

export default App;
