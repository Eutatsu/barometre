import { useState } from "react";
import DataProcessor from "./Components/DataProcessor";
import DataFormatter from "./Components/DataFormatter";

function App() {
  const [diades, setDiades] = useState({});

  const exports = {
    'diades': diades,
    'setDiades': setDiades,
  };

  return (
    <>
      <DataProcessor setDiades={setDiades} />
      <DataFormatter diades={diades} />
    </>
  );
}

export default App;