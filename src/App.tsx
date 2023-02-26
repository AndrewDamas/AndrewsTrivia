import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Game from './components/CategorySpinWheel';
import Leaderboard from './components/Leaderboard';
import Rules from './components/Rules';
import CategorySpinWheel from './components/CategorySpinWheel';
import Question from './components/Question';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category_spin_wheel' element={<CategorySpinWheel />} />
          <Route path='/question' element={<Question />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/game_over' element={<Rules />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
