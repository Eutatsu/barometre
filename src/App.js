import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import DataProcessor from "./Components/DataProcessor";
import Barometre from './Components/Barometre'
import LlistaDiades from './Components/LlistaDiades'
import ScoreTable from './Components/ScoreTable'
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
        <LlistaDiades {...exports} />
      </div>

      <Footer />
    </>
  );
}

export default App;
