import { useState } from "react";
import DataProcessor from "./Components/DataProcessor";
import DataFormatter from "./Components/DataFormatter";

function App() {
  const [diades, setDiades] = useState({});
  const [puntuacions, setPuntuacions] = useState({});

  const exports = {
    'diades': diades,
    'setDiades': setDiades,
    'puntuacions': puntuacions,
    'setPuntuacions': setPuntuacions,
  };

  return (
    <>
      <DataProcessor {...exports} />
      <DataFormatter {...exports} />
    </>
  );
}

export default App;