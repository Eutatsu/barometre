import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import DataProcessor from "./Components/DataProcessor";
import Barometre from './Components/Barometre'
import ScoreTable from './Components/ScoreTable'
import Stats from './Components/Stats'
import LlistaDiades from './Components/LlistaDiades'
import Footer from './Components/Footer'
import './style.css'

function App() {
  const [diades, setDiades] = useState({});
  const [puntuacions, setPuntuacions] = useState({});

  const exports = {
    'diades': diades,
    'setDiades': setDiades,
    'puntuacions': puntuacions,
    'setPuntuacions': setPuntuacions,
  };

  useEffect(() => {
    //console.log(puntuacions)
  }, [puntuacions]);

  useEffect(() => {
    //console.log(diades)
  }, [diades]);

  return (
    <>
      <Navbar />
      <DataProcessor {...exports} />

      <div id="root">
        <Barometre {...exports} />
        <div className="space_between"></div>
        <ScoreTable {...exports} />
        <div className="space_between"></div>
        <Stats {...exports} />
        <div className="space_between"></div>
        <LlistaDiades {...exports} />
      </div>

      <Footer />
    </>
  );
}

export default App;
