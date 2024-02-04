import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import LiveRates from './pages/live/LiveRates';
import History from './pages/history/History';
import Convert from './pages/convert/Convert';
import Timeframe from './pages/timeframe/Timeframe';
import Change from './pages/change/Change';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/latest' element={<LiveRates />} />
        <Route path='/history' element={<History />} />
        <Route path='/convert' element={<Convert />} />
        <Route path='/timeframe' element={<Timeframe />} />
        <Route path='/change' element={<Change />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
