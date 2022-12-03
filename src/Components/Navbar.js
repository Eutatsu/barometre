import { useState } from "react"
import "./Navbar.css"

function Navbar() {
	const [isNavExpanded, setIsNavExpanded] = useState(false);

	return (
		<nav id="navigation">
			<a href="#barometre" className="title">
				BaròmetreUniversitari.cat
			</a>
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
          			<li><a href="#" onClick={() => { hideNavMenu() }}>Baròmetre</a></li>
          			<li><a href="#score" onClick={() => { hideNavMenu() }}>Taula de puntuacions</a></li>
          			<li><a href="#diades" onClick={() => { hideNavMenu() }}>Llista de diades</a></li>
        		</ul>
    		</div>
		</nav>
	);
}

function hideNavMenu () {
	document.getElementById('navMenu').className = 'navigation-menu';
}

export default Navbar;
