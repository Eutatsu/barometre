import "./Stats.css"

function Stats(props) {
    const { diades, puntuacions } = props;

	const castells = {};

	const diades_array = [...Object.values(diades)];
	diades_array.forEach(diada => {
		const colles = [...Object.values(diada["colles"])];
		colles.forEach((colla, i) => {
			const name = Object.keys(diada["colles"])[i];
			const actuacio = [...Object.values(colla)];
			actuacio.pop();
			actuacio.forEach(castell => {
				castell = [...Object.values(castell)];
				if (castell[2] !== 'Descarregat' && castell[2] !== 'Carregat') return;
				const descarregat = castell[2] === 'Descarregat';
				if (!(name in castells))
					castells[name] = {};
				if (!(castell[1] in castells[name]))
					castells[name][castell[1]] = [0, 0];
				
				if (descarregat)
					castells[name][castell[1]][0] += 1;
				else
					castells[name][castell[1]][1] += 1;
			});
		});
	});

	return (
		<>
			<div id="stats">
            <h1>Estadístiques</h1>
			<div className="en-construccio"></div>
			</div>
		</>
	);
}

export default Stats;
