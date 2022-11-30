import { useEffect, useState } from "react";
import DataProcessor from "./Components/DataProcessor";
import Barometre from './Components/Barometre'
//import LlistaDiades from './Components/LlistaDiades'
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
      <p className="credits">per Andreu Huguet i Oriol Segura</p>
    </>
  );
}

export default App;
