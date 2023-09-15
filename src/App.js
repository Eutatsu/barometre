import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import DataProcessor from "./components/DataProcessor";
import Barometre from "./pages/Barometre";
import ScoreTable from "./pages/ScoreTable";
import Stats from "./pages/Stats";
import Calendar from "./pages/Calendar";
import LlistaDiades from "./pages/LlistaDiades";
import Calculadora from "./pages/Calculadora";
import Collaborate from "./pages/Collaborate";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import './css/normalize.css';
import './css/main.css';

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
		// console.log(puntuacions)
	}, [puntuacions]);

	useEffect(() => {
		// console.log(diades)
	}, [diades]);

	return (<>
		<DataProcessor {...exports} />

		<Router>
			<Navbar />
			<ScrollToTop />
			<main className="page">
				<Routes>
					<Route path="/" element={<Barometre {...exports}/>}/>
					<Route path="/barometre/:yy" element={<Barometre {...exports}/>}/>
					<Route path="/score" element={<ScoreTable {...exports}/>}/>
					<Route path="/stats" element={<Stats {...exports}/>}/>
					<Route path="/calendar" element={<Calendar />}/>
					<Route path="/diades" element={<LlistaDiades {...exports}/>}/>
					<Route path="/calculadora" element={<Calculadora {...exports}/>}/>
					<Route path="/collaborate" element={<Collaborate {...exports}/>}/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</Router>

		<Footer />
	</>);
}

export default App;
