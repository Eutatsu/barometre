import { useEffect, useState } from "react";
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
  }, [puntuacions])

  useEffect(() => {
    //console.log(diades)
  }, [diades])

  return (
    <>
      <DataProcessor {...exports} />
      
      <Barometre {...exports} />
      <div className="space_between"></div>
      <ScoreTable {...exports} />
      <div className="space_between"></div>
      <LlistaDiades {...exports} />

      <p className="credits">
        per <a href="https://twitter.com/HuguetAndreu" target="_blank">Andreu Huguet</a> i <a href="https://twitter.com/uriiisegura" target="_blank">Oriol Segura</a>.<br/>
        Especials gràcies a <a href="https://twitter.com/ndreu99" target="_blank">Andreu Roig</a> i a tothom involucrat per la seva col·laboració i professionalitat.<br/>
        Codi obert al <a href="https://github.com/Huguet57/barometre" target="_blank">GitHub</a>, col·labora-hi tu també!
      </p>
    </>
  );
}

export default App;
