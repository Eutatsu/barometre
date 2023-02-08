import "./Collaborate.css"

function Collaborate() {
	window.scrollTo(0, 0);

	return (
		<>
			<div id="collaborate">
				<h1>Col·labora-hi!</h1>
				<p>
					Un dels objectius del Baròmetre Universitari és recollir totes les actuacions universitàries de la història. Estem contactant amb gent de totes les colles per tal de recollir tots els castells, colla per colla.
				</p>
				<p>
					Ja tenim col·laboradors en algunes de les colles, però encara ens en queden moltes! Si vols ajudar en aquest projecte només cal que et posis en conctacte amb nosaltres; ho pots fer per <a rel="noreferrer" target="_blank" href="https://twitter.com/BarometreUni">Twitter</a> o <a rel="noreferrer" target="_blank" href="mailto:barometreuniversitari.com">correu electrònic</a>.
				</p>
				<div className="image">
					<img alt="" src="favicon.png" />
				</div>
			</div>
		</>
	);
}

export default Collaborate;
