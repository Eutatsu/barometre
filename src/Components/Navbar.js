import { useState } from "react"
import { Link } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
	const [isNavExpanded, setIsNavExpanded] = useState(false);

	return (
		<nav id="navigation">
			<span className="title" onClick={() => { setIsNavExpanded(!isNavExpanded); }}>
				<Link to="/">
					<img alt="" src="/favicon.ico"/>
					Baròmetre Universitari
				</Link>
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
			<div id="navMenu" className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"} onClick={() => { setIsNavExpanded(!isNavExpanded); }}>
        		<ul>
					<li><Link to="/">Baròmetre</Link></li>
					<li><Link to="/score">Taula de puntuacions</Link></li>
					<li><Link to="/stats">Estadístiques</Link></li>
					<li><Link to="/calendar">Calendari</Link></li>
					<li><Link to="/diades">Llista de diades</Link></li>
					<li><Link to="/collaborate">Col·labora-hi</Link></li>
        		</ul>
    		</div>
		</nav>
	);
}

export default Navbar;
