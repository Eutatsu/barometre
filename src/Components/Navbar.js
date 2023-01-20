import { useState } from "react"
import "./Navbar.css"

function Navbar() {
	const [isNavExpanded, setIsNavExpanded] = useState(false);

	return (
		<nav id="navigation">
			<span onClick={() => { showSection('barometre') }} className="title">
				<img alt="" src="/favicon.ico"/>
				Baròmetre Universitari
			</span>
			<button className="hamburger" onClick={() => { setIsNavExpanded(!isNavExpanded); }}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="white"
				>
					<path
						fillRule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
						clipRule="evenodd"
          			/>
        		</svg>
			</button>
			<div id="navMenu" className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
        		<ul>
					<li><span onClick={() => { hideNavMenu('barometre') }}>Baròmetre</span></li>
          			<li><span onClick={() => { hideNavMenu('score') }}>Taula de puntuacions</span></li>
          			<li><span onClick={() => { hideNavMenu('stats') }}>Estadístiques</span></li>
          			<li><span onClick={() => { hideNavMenu('calendar') }}>Calendari</span></li>
          			<li><span onClick={() => { hideNavMenu('diades') }}>Llista de diades</span></li>
          			<li><span onClick={() => { hideNavMenu('collaborate') }}>Collabora-hi</span></li>
        		</ul>
    		</div>
		</nav>
	);
}

function hideNavMenu (showId) {
	showSection(showId);
	document.getElementById('navMenu').className = 'navigation-menu';
}

function showSection(showId) {
	hideAll();
	const e = document.getElementById(showId);
	if (e !== null)
		e.style.display = 'block';
	window.scrollTo(0,0);
}

function hideAll() {
	const sections = ['barometre', 'score', 'stats', 'calendar', 'diades', 'collaborate'];
	for (const sec of sections) {
		const e = document.getElementById(sec);
		if (e !== null)
			e.style.display = 'none';
	}
}

export default Navbar;
