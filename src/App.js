import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import DataProcessor from "./Components/DataProcessor";
import Barometre from './Components/Barometre'
import ScoreTable from './Components/ScoreTable'
import Stats from './Components/Stats'
import Calendar from './Components/Calendar'
import LlistaDiades from './Components/LlistaDiades'
import Collaborate from './Components/Collaborate'
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

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<div id="root"><Barometre {...exports}/></div>}/>
          <Route path="/score" element={<div id="root"><ScoreTable {...exports}/></div>}/>
          <Route path="/stats" element={<div id="root"><Stats {...exports}/></div>}/>
          <Route path="/calendar" element={<div id="root"><Calendar {...exports}/></div>}/>
          <Route path="/diades" element={<div id="root"><LlistaDiades {...exports}/></div>}/>
          <Route path="/collaborate" element={<div id="root"><Collaborate {...exports}/></div>}/>
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;
