import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./Components/Navbar";
import DataProcessor from "./Components/DataProcessor";
import Barometre from './Components/Barometre'
import ScoreTable from './Components/ScoreTable'
import Stats from './Components/Stats'
import Calendar from './Components/Calendar'
import LlistaDiades from './Components/LlistaDiades'
import Footer from './Components/Footer'
import './style.css'

function App() {
  const [diades, setDiades] = useState({});
  const [calendari, setCalendari] = useState({});
  const [puntuacions, setPuntuacions] = useState({});

  const exports = {
    'diades': diades,
    'setDiades': setDiades,
    'calendari': calendari,
    'setCalendari': setCalendari,
    'puntuacions': puntuacions,
    'setPuntuacions': setPuntuacions,
  };

  useEffect(() => {
    //console.log(puntuacions)
  }, [puntuacions]);

  useEffect(() => {
    //console.log(calendari)
  }, [calendari]);

  useEffect(() => {
    //console.log(diades)
  }, [diades]);

  return (
    <>
      <DataProcessor {...exports} />

      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div id="root"><Barometre {...exports} /></div>}/>
          <Route path="/score" element={<div id="root"><ScoreTable {...exports} /></div>}/>
          <Route path="/stats" element={<div id="root"><Stats {...exports} /></div>}/>
          <Route path="/calendar" element={<div id="root"><Calendar {...exports} /></div>}/>
          <Route path="/diades" element={<div id="root"><LlistaDiades {...exports} /></div>}/>
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
