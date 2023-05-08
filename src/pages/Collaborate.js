import { Component } from "react";

class Collaborate extends Component {
	render() {
		return (<>
			<section id="collaborate">
				<h2 style={{marginBottom: '1rem'}}>Col·labora-hi!</h2>
				<p>
					Un dels objectius del Baròmetre Universitari és recollir totes les actuacions universitàries de la història. Estem contactant amb gent de totes les colles per tal de recollir tots els castells, colla per colla.
				</p>
				<p>
					Ja tenim col·laboradors en algunes de les colles, però encara ens en queden moltes! Si vols ajudar en aquest projecte només cal que et posis en conctacte amb nosaltres; ho pots fer per <a rel="noreferrer" target="_blank" href="https://twitter.com/BarometreUni">Twitter</a> o <a rel="noreferrer" target="_blank" href="mailto:barometreuniversitari.com">correu electrònic</a>.
				</p>
				<div className="image">
					<img alt="" src="favicon.png" />
				</div>
			</section>
		</>);
	}
}

export default Collaborate;
