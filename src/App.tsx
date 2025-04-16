import React from 'react';
import { Moon, Wind, BookOpen, Play, ChevronRight } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Relax from './pages/Relax';
import Sounds from './pages/Sounds';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/relax" element={<Relax />} />
        <Route path="/sounds" element={<Sounds />} />
      </Routes>
    </Router>
  );
}

export default App;