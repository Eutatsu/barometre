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
				if (castell[1].includes("(actx)")) return;
				
				const descarregat = castell[2] === 'Descarregat';
				if (!(castell[1] in castells))
					castells[castell[1]] = {};
				if (!(name in castells[castell[1]]))
					castells[castell[1]][name] = [0, 0];
				
				if (descarregat)
					castells[castell[1]][name][0] += 1;
				else
					castells[castell[1]][name][1] += 1;
			});
		});
	});
	const castells_arrays = Object.keys(castells).map(key => {
		return [key, castells[key]];
	});
	castells_arrays.sort((a, b) => {
		try {
			const gA = 100000*parseInt(puntuacions[a[0]]['Grup'])+10000*parseInt(puntuacions[a[0]]['Subgrup'])+parseInt(puntuacions[a[0]]['Descarregat']);
			const gB = 100000*parseInt(puntuacions[b[0]]['Grup'])+10000*parseInt(puntuacions[b[0]]['Subgrup'])+parseInt(puntuacions[b[0]]['Descarregat']);
			return gB - gA;
		} catch {
			return 0;
		}
	});

	let castells_rows, castells_rows_names, desCar_rows, colles_rows, colles_rows_names, colles_rows_names_two, table_length;
	let reset_rows = true;
	return (
		<>
			<div id="stats" style={{display: 'none'}}>
				<h1>Estadístiques de la temporada actual</h1>
				{
					castells_arrays.map((castell, i) => {
						const name = castell[0];
						let grup;
						try {
							grup = parseInt(puntuacions[name]["Grup"]);
						} catch {}

						if (reset_rows) {
							castells_rows = [];
							castells_rows_names = [];
							desCar_rows = []
							colles_rows = [];
							colles_rows_names = [];
							colles_rows_names_two = [];
							table_length = 1;
							reset_rows = false;
						}
						castells_rows.push(<th className={"grup"+grup} colSpan="2">{name}</th>);
						castells_rows_names.push(name);
						desCar_rows.push(<><th className={"grup"+grup}>D</th><th className={"grup"+grup}>C</th></>);
						table_length += 2;

						[...Object.values(castell[1])].forEach((colla, j) => {
							const colla_name = Object.keys(castell[1])[j];
							if (!colles_rows_names.includes(colla_name))
								colles_rows_names.push(colla_name);
						});

						if (i+1 < castells_arrays.length) {
							let nextGroup;
							try {
								nextGroup = parseInt(puntuacions[castells_arrays[i+1][0]]["Grup"]);
							} catch {}
							if (nextGroup === grup) return <></>;
							reset_rows = true;
						}

						colles_rows_names.forEach(colla => {
							const colla_res = [];
							castells_rows_names.forEach(castell => {
								try {
									const descarregats = castells[castell][colla][0];
									const carregats = castells[castell][colla][1];
									if (descarregats === 0)
										colla_res.push(<><td></td><td className="carregats">{carregats > 0 ? carregats : ""}</td></>);
									else if (carregats === 0)
										colla_res.push(<><td className="descarregats">{descarregats > 0 ? descarregats : ""}</td><td></td></>);
									else
										colla_res.push(<><td className="descarregats">{descarregats > 0 ? descarregats : ""}</td><td className="carregats">{carregats > 0 ? carregats : ""}</td></>);
								} catch {
									colla_res.push(<><td></td><td></td></>);
								}
							})
							if (!colles_rows_names_two.includes(colla)) {
								colles_rows.push(<tr><td className={colla.toLowerCase()}>{colla}</td>{colla_res}</tr>);
								colles_rows_names_two.push(colla);
							}
						});
						return (
							<>
								<div className="table-wrap"><table>
									<thead>
										<tr><th className={"grup"+grup} colSpan={table_length}>Castells del grup {grup}</th></tr>
										<tr><th className={"grup"+grup} rowSpan="2">Colles</th>{castells_rows}</tr>
										<tr>{desCar_rows}</tr>
									</thead>
									<tbody>
										{colles_rows}
									</tbody>
								</table></div>
							</>
						);
					})
				}
			</div>
		</>
	);
}

export default Stats;
