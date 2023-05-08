import { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
	expandNav() {
		document.getElementById('navMenu').classList.toggle('expanded');
	}
	render() {
		return (
			<nav className="navbar">
				<span className="title">
					<Link to="/">
						<img alt="" src="/favicon.ico"/>
						Baròmetre Universitari
					</Link>
				</span>
				<button className="hamburger" onClick={this.expandNav}>
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
				<div id="navMenu" className="navigation-menu" onClick={this.expandNav}>
					<ul>
						<li><Link to="/">Baròmetre</Link></li>
						<li><Link to="/score">Taula de puntuacions</Link></li>
						<li><Link to="/stats">Estadístiques</Link></li>
						<li><Link to="/calendar">Calendari</Link></li>
						<li><Link to="/diades">Llista de diades</Link></li>
						{/*<li><Link to="/calculadora">Calculadora</Link></li>*/}
						<li><Link to="/collaborate">Col·labora-hi</Link></li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;
