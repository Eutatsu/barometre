import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import DataProcessor from "./Components/DataProcessor";
import Barometre from './Components/Barometre'
import LlistaDiades from './Components/LlistaDiades'
import ScoreTable from './Components/ScoreTable'
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

      <div class="footer">
        <p>
          Per <a href="https://twitter.com/HuguetAndreu" rel="noreferrer" target="_blank">Andreu Huguet</a> i <a href="https://twitter.com/uriiisegura" rel="noreferrer" target="_blank">Oriol Segura</a>.
        </p>
        <p>
          Especial agraïment a <a href="https://twitter.com/ndreu99" rel="noreferrer" target="_blank">Andreu Roig</a> i a tothom involucrat per la seva col·laboració i professionalitat.
        </p>
        <p>
          Codi obert al <a href="https://github.com/Huguet57/barometre" rel="noreferrer" target="_blank">GitHub</a>, col·labora-hi tu també!
        </p>
      </div>
    </>
  );
}

export default App;
