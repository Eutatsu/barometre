import { Component } from "react";
import COLLES_INICIALS from "./../data/colles.json";
import GetTemporada from "./../functions/GetTemporada";
import GetHighContrast from "./../functions/GetHighContrast";

class Stats extends Component {
	render() {
		const { diades, puntuacions } = this.props;

		const castells = {};
		const colors_colla = COLLES_INICIALS[GetTemporada(new Date())];

		const fromEuropean = (dateString) => {
			const [day, month, year] = dateString.split("/");
			return new Date(`${month}/${day}/${year}`);
		};

		const isFromTemporada = (date, temporada) => {
			const start_temporada = new Date(`09/01/${temporada.split('-')[0]}`);
			const end_temporada = new Date(`08/31/${temporada.split('-')[1]}`);
			return start_temporada <= date && date <= end_temporada;
		};

		const getTemporada = (data) => {
			let year;
			try {
				year = data.getFullYear();
			} catch {
				data = fromEuropean(data);
				year = data.getFullYear();
			}
			
			if (isFromTemporada(data, year+'-'+(year+1)))
				return year+'-'+(year+1);
			return (year-1)+'-'+year;
		};

		const diades_array = [...Object.values(diades)].filter(d => isFromTemporada(fromEuropean(d["info"]["DATA"]), getTemporada(new Date())));

		diades_array.forEach(diada => {
			const colles = [...Object.values(diada["colles"])];
			colles.forEach((colla, i) => {
				const collaName = Object.keys(diada["colles"])[i];
				const actuacio = [...Object.values(colla)];
				if (Number.isInteger(actuacio[actuacio.length - 1]))
					actuacio.pop();
				actuacio.forEach(castell => {
					castell = [...Object.values(castell)];
					// if ((castell[2] !== 'Descarregat' && castell[2] !== 'Carregat') || castell[1].includes("(")) return;
					if (!(castell[1] in puntuacions)) return;
					
					if (!(castell[1] in castells))
						castells[castell[1]] = {};
					if (!(collaName in castells[castell[1]]))
						castells[castell[1]][collaName] = [0, 0, 0, 0];
					
					switch (castell[2]) {
						case 'Descarregat':
							castells[castell[1]][collaName][0] += 1;
							break;
						case 'Carregat':
							castells[castell[1]][collaName][1] += 1;
							break;
						case 'Intent':
							castells[castell[1]][collaName][2] += 1;
							break;
						case 'Intent desmuntat':
							castells[castell[1]][collaName][3] += 1;
							break;
						default:
							console.log(`ERROR: ${castell[2]} no és un estat vàlid.`);
							break;
					}
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

		return (<>
			<section>
				<h2>Estadístiques de la temporada actual</h2>
				{
					castells_arrays.length === 0 ? <h5>(Encara no s'han fet castells aquesta temporada)</h5> : <></>
				}
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
						castells_rows.push(<th className={"grup"+grup} colSpan="4">{name}</th>);
						castells_rows_names.push(name);
						desCar_rows.push(<><th className={"grup"+grup}>D</th><th className={"grup"+grup}>C</th><th className={"grup"+grup}>IF</th><th className={"grup"+grup}>ID</th></>);
						table_length += 4;

						[...Object.values(castell[1])].forEach((_, j) => {
							const colla_name = Object.keys(castell[1])[j];
							if (!colles_rows_names.includes(colla_name))
								colles_rows_names.push(colla_name);
						});

						if (i+1 < castells_arrays.length) {
							let nextGroup;
							try {
								nextGroup = parseInt(puntuacions[castells_arrays[i+1][0]]["Grup"]);
							} catch {}
							if (nextGroup === grup)
								return <></>;
							reset_rows = true;
						}

						colles_rows_names.forEach(colla => {
							const colla_res = [];
							castells_rows_names.forEach(castell => {
								try {
									if (castells[castell][colla][0] !== 0)
										colla_res.push(<td className="descarregats">{castells[castell][colla][0]}</td>);
									else
										colla_res.push(<td></td>);

									if (castells[castell][colla][1] !== 0)
										colla_res.push(<td className="carregats">{castells[castell][colla][1]}</td>);
									else
										colla_res.push(<td></td>);

									if (castells[castell][colla][2] !== 0)
										colla_res.push(<td className="intents">{castells[castell][colla][2]}</td>);
									else
										colla_res.push(<td></td>);

									if (castells[castell][colla][3] !== 0)
										colla_res.push(<td className="intents_desmuntats">{castells[castell][colla][3]}</td>);
									else
										colla_res.push(<td></td>);
								} catch {
									colla_res.push(<><td></td><td></td><td></td><td></td></>);
								}
							})
							if (!colles_rows_names_two.includes(colla)) {
								colles_rows.push(<tr><td style={{backgroundColor: colors_colla[colla], color: GetHighContrast(colors_colla[colla])}}>{colla}</td>{colla_res}</tr>);
								colles_rows_names_two.push(colla);
							}
						});
						return (
							<>
								<div className="table-wrap"><table className="stats-tb">
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
			</section>
		</>);
	}
}

export default Stats;
