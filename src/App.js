import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import DataProcessor from "./components/DataProcessor";
import Barometre from './components/Barometre'
import ScoreTable from './components/ScoreTable'
import Stats from './components/Stats'
import Calendar from './components/Calendar'
import LlistaDiades from './components/LlistaDiades'
import Footer from './components/Footer'
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
      <div id="root">
        <Barometre {...exports} />
        <div className="space_between"></div>
        <ScoreTable {...exports} />
        <div className="space_between"></div>
        <Stats {...exports} />
        <div className="space_between"></div>
        <Calendar {...exports} />
        <div className="space_between"></div>
        <LlistaDiades {...exports} />
      </div>

      <Footer />
    </>
  );
}

export default App;
