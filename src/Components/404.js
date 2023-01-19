import "./404.css"

function NotFound() {
	return (
		<div id="notfound">
			<h1>Error 404</h1>
			<p>
				Vaja, sembla que la pàgina que busques no existeix o no es troba en l'adreça especificada. Si creus que es tracta d'un error contacta'ns per Twitter a <a href="https://twitter.com/BarometreUni" rel="noreferrer" target="_blank">@BarometreUni</a> o per correu electrònic a <a href="mailto:barometreuniversitari@gmail.com" rel="noreferrer" target="_blank">barometreuniversitari@gmail.com</a>.
			</p>
			<div className="image">
				<img alt="" src="/favicon.png"/>
				<p>
					Atentament, l'equip del Baròmetre Universitari
				</p>
			</div>
		</div>
	);
}

export default NotFound;
