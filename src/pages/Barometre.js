import { Component } from "react";
import { useParams } from "react-router-dom";
import Bars from "./../components/Bars";
import { NavLink } from "react-router-dom";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

const FIRST_YEAR = 1994;
const AVAILABLE_YEARS = [
	2022,
	2023
];

class Barometre extends Component {
	render() {
		const { diades, puntuacions } = this.props;
		const { yy } = this.props.params;
		if (yy) {
			const yy_int = parseInt(yy);
			if (!yy_int || (yy_int < FIRST_YEAR || yy_int > new Date().getFullYear()))
				return (<>
					<section>
						<h2>Temporada no vàlida</h2>
						<p style={{marginTop: '1rem'}}>Fes click <NavLink to="/">aquí</NavLink> per tornar a la temporada actual.</p>
					</section>
				</>);
		}

		const isWindows = window.navigator["platform"].includes("Win");
		const colles_inicials = ['Xoriguers', 'Trempats', 'Penjats', 'Pataquers', 'Passerells', 'Marracos', 'Llunàtics', 'Grillats', 'Ganàpies', 'Engrescats', 'Emboirats', 'Bergants', 'Arreplegats']
		if (Object.keys(puntuacions).length === 0) return <></>;

		let castells_puntuats = {};
		let pilars_puntuats = {};
		let data_pilars = {};
		let data_castells = {};

		let castells_puntuats_lastWeek = {};
		let pilars_puntuats_lastWeek = {};

		const isCarregat = castell => {
			if (castell.slice(-1) === "C") return " carregat";
			return "";
		};

		const donePastWeek = date => {
			if (Math.floor((new Date() - fromEuropean(date)) / (1000*60*60*24)) < 8) return "new";
			return "";
		};

		const fromEuropean = (dateString) => {
			const [day, month, year] = dateString.split("/");
			return new Date(`${month}/${day}/${year}`);
		};

		const getLastSeptember = (date) => {
			if (date.getMonth() >= 9-1)
				return new Date(`09/01/${date.getFullYear()}`);
			else
				return new Date(`09/01/${date.getFullYear()-1}`);
		};

		const formatDate = (date) => {
			const months = ["de gener","de febrer","de març","d'abril","de maig","de juny","de juliol","d'agost","de setembre","d'octubre","de novembre","de desembre"];
			const [day, month, year] = date.split("/");
			return parseInt(day) + " " + months[parseInt(month)-1] + " " + year;
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

		let maxPuntuacio = -1;
		let maxCastell = '';

		const llista_diades = [...Object.values(diades)];
		let yy_date = new Date();
		if (yy)
			yy_date = new Date(`${parseInt(yy)+1}-08-31`);
		const aquesta_temporada = llista_diades.filter(diada => fromEuropean(diada["info"]["DATA"]) >= getLastSeptember(yy_date) && fromEuropean(diada["info"]["DATA"]) <= yy_date);
		aquesta_temporada.sort((a,b) => fromEuropean(b["info"]["DATA"]) - fromEuropean(a["info"]["DATA"]));
		aquesta_temporada.forEach(diada => {
			const colles = Object.keys(diada["colles"]);
			const date = diada["info"]["DATA"];
			colles.forEach(colla => {
				diada["colles"][colla].forEach(castell => {
					if (castell["CASTELL"] in puntuacions && (castell["RESULTAT"] === "Descarregat" || castell["RESULTAT"] === "Carregat")) {
						const punts = puntuacions[castell["CASTELL"]][castell["RESULTAT"]];

						if (parseInt(punts) >= maxPuntuacio) {
							maxPuntuacio = Math.max(parseInt(punts), maxPuntuacio);
							maxCastell = castell["CASTELL"];
						}

						let res = "";
						if (castell["RESULTAT"] === "Carregat")
							res = "C";
						
						if (castell["CASTELL"].toLowerCase().startsWith("p") || castell["CASTELL"].toLowerCase().startsWith("v")) {
							if (!(colla in pilars_puntuats)) {
								pilars_puntuats[colla] = {};
								data_pilars[colla] = {};
							}
							pilars_puntuats[colla][castell["CASTELL"]+res] = punts;
							data_pilars[colla][castell["CASTELL"]+res] = date;
						} else {
							if (!(colla in castells_puntuats)) {
								castells_puntuats[colla] = {};
								data_castells[colla] = {};
							}
							if (res === "C" && castell["CASTELL"] in castells_puntuats[colla])
								return;
							if (res === "" && castell["CASTELL"]+"C" in castells_puntuats[colla])
								delete castells_puntuats[colla][castell["CASTELL"]+"C"];
							castells_puntuats[colla][castell["CASTELL"]+res] = punts;
							data_castells[colla][castell["CASTELL"]+res] = date;
						}
					}
				})
			})
		});

		let date = '';
		try {
			date = formatDate(aquesta_temporada[0]["info"]["DATA"]);
		} catch (e) {}

		const top3 = colles_inicials.map(colla => {
			return {
				"colla": colla,
				"puntuacio_castells": colla in castells_puntuats ? Object
					.entries(castells_puntuats[colla]) // create Array of Arrays with [key, value]
					.sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
					.slice(0,3) // return only the first 3 elements of the intermediate result
					.map(([a,b]) => parseInt(b))
					.reduce((acc, curr) => acc + curr, 0) : 0,
				"puntuacions": colla in castells_puntuats ? Object
					.entries(castells_puntuats[colla]) // create Array of Arrays with [key, value]
					.sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
					.slice(0,3) // return only the first 3 elements of the intermediate result
					.map(([a,b]) => parseInt(b)) : [0, 0, 0],
				"top3": colla in castells_puntuats ? Object
					.entries(castells_puntuats[colla]) // create Array of Arrays with [key, value]
					.sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
					.slice(0,3) // return only the first 3 elements of the intermediate result
					.map(([n])=> n) : ['', '', ''], // and map that to an array with only the name
				"data3": colla in data_castells ? Object
					.entries(castells_puntuats[colla]) // create Array of Arrays with [key, value]
					.sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
					.slice(0,3) // return only the first 3 elements of the intermediate result
					.map(([n])=> data_castells[colla][n]) : ['', '', ''], // and map that to an array with only the name
				"topPilar": colla in pilars_puntuats ? Object
					.entries(pilars_puntuats[colla]) // create Array of Arrays with [key, value]
					.sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
					.slice(0,1) // return only the first 3 elements of the intermediate result
					.map(([n])=> n) : [''], // and map that to an array with only the name
				"topPilarPuntuacio": colla in pilars_puntuats ? Object
					.entries(pilars_puntuats[colla]) // create Array of Arrays with [key, value]
					.sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
					.slice(0,1) // return only the first 3 elements of the intermediate result
					.map(([, n])=> parseInt(n)) : "0", // and map that to an array with only the name
				"dataPilar": colla in data_pilars ? Object
					.entries(pilars_puntuats[colla]) // create Array of Arrays with [key, value]
					.sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
					.slice(0,1) // return only the first 3 elements of the intermediate result
					.map(([n])=> data_pilars[colla][n]) : [''], // and map that to an array with only the name
			};
		});
		top3.forEach(colla => colla.puntuacio_total = colla.puntuacio_castells + colla.topPilarPuntuacio[0]);

		const lastWeek = new Date();
		lastWeek.setDate(lastWeek.getDate() - 8);
		const ultima_setmana = llista_diades.filter(diada => fromEuropean(diada["info"]["DATA"]) < lastWeek);
		ultima_setmana.sort((a,b) => fromEuropean(b["info"]["DATA"]) - fromEuropean(a["info"]["DATA"]));
		ultima_setmana.forEach(diada => {
			const colles = Object.keys(diada["colles"]);
			colles.forEach(colla => {
				diada["colles"][colla].forEach(castell => {
					if (castell["CASTELL"] in puntuacions && (castell["RESULTAT"] === "Descarregat" || castell["RESULTAT"] === "Carregat")) {
						const punts = puntuacions[castell["CASTELL"]][castell["RESULTAT"]];

						let res = "";
						if (castell["RESULTAT"] === "Carregat")
							res = "C";
						
						if (castell["CASTELL"].toLowerCase().startsWith("p") || castell["CASTELL"].toLowerCase().startsWith("v")) {
							if (!(colla in pilars_puntuats_lastWeek))
								pilars_puntuats_lastWeek[colla] = {};
							pilars_puntuats_lastWeek[colla][castell["CASTELL"]+res] = punts;
						} else {
							if (!(colla in castells_puntuats_lastWeek))
								castells_puntuats_lastWeek[colla] = {};
							if (res === "C" && castell["CASTELL"] in castells_puntuats_lastWeek[colla])
								return;
							if (res === "" && castell["CASTELL"]+"C" in castells_puntuats_lastWeek[colla])
								delete castells_puntuats_lastWeek[colla][castell["CASTELL"]+"C"];
							castells_puntuats_lastWeek[colla][castell["CASTELL"]+res] = punts;
						}
					}
				})
			})
		});

		const top3_lastWeek = Object.keys(castells_puntuats_lastWeek).map(colla => {
			return {
				"colla": colla,
				"puntuacio_castells": Object
					.entries(castells_puntuats_lastWeek[colla]) // create Array of Arrays with [key, value]
					.sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
					.slice(0,3) // return only the first 3 elements of the intermediate result
					.map(([a,b]) => parseInt(b))
					.reduce((acc, curr) => acc + curr, 0),
				"topPilarPuntuacio": colla in pilars_puntuats_lastWeek ? Object
					.entries(pilars_puntuats_lastWeek[colla]) // create Array of Arrays with [key, value]
					.sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
					.slice(0,1) // return only the first 3 elements of the intermediate result
					.map(([, n])=> parseInt(n)) : "0" // and map that to an array with only the name
			};
		});
		top3_lastWeek.forEach(colla => colla.puntuacio_total = colla.puntuacio_castells + colla.topPilarPuntuacio[0]);

		let lastPoints = 0;
		top3_lastWeek.sort((a,b) => a.puntuacio_castells === b.puntuacio_castells ? (a.puntuacio_total < b.puntuacio_total ? 1 : -1) : (a.puntuacio_castells < b.puntuacio_castells ? 1 : -1))
			.forEach((colla, i) => {
				top3_lastWeek[i]["pos"] = lastPoints === colla.puntuacio_total ? i : i+1;
				lastPoints = colla.puntuacio_total;
			});
		const lastWeek_pos = {};
		top3_lastWeek.forEach((colla) => {
			const collaName = colla["colla"];
			lastWeek_pos[collaName] = colla["pos"];
		});

		const score = [];
		Object.entries(puntuacions).forEach(([k, v]) => {
			const entry = {};
			entry['grup'] = parseInt(v.Grup);
			entry['subgrup'] = parseInt(v.Subgrup);
			entry['castell'] = k;
			entry['carregat'] = parseInt(v.Carregat);
			entry['descarregat'] = parseInt(v.Descarregat);
			entry['gent'] = 0;
			score.push(entry);
		});

		for (let colla of top3) {
			while (colla.top3.length < 3) {
				colla.top3.push('');
				colla.puntuacions.push(0);
				colla.data3.push('');
			}
		}

		const different_temporada = getTemporada(yy_date) !== getTemporada(new Date());

		return (<>
			<section>
				<h2>Temporada {getTemporada(yy_date)}</h2>
				<h5>({date ? `Actualitzat a ${date}` : `Encara no s'han fet castells aquesta temporada`})</h5>
				{
					different_temporada && <p style={{marginTop: '1rem'}}>Les puntuacions utilitzades són les actuals, no les de la temporada observada.</p>
				}
				<table className="barometre-tb">
					<thead>
						<tr>
							<th></th>
							<th>#</th>
							<th>Colla</th>
							<th colSpan="8">www.barometreuniversitari.cat</th>
							<th>📊 {maxCastell}</th>
						</tr>
					</thead>
					<tbody>
						{
							top3
							.sort((a,b) => a.puntuacio_castells === b.puntuacio_castells ? (a.puntuacio_total < b.puntuacio_total ? 1 : -1) : (a.puntuacio_castells < b.puntuacio_castells ? 1 : -1))
							.map((colla, i) => {
								let pos = lastPoints === colla.puntuacio_total ? i : i+1;
								const difference = lastWeek_pos[colla.colla]-pos === 0 ? "same" : lastWeek_pos[colla.colla]-pos > 0 ? "up" : "down";
								lastPoints = colla.puntuacio_total;
								const pilar_score = puntuacions[colla.topPilar[0].replace("C","")];
								return (
									<tr className="colla" key={colla.colla}>
										<td className={parseInt(colla.puntuacio_total) === 0 ? 'same' : difference}></td>
										<td>{parseInt(colla.puntuacio_total) === 0 ? '' : pos}</td>
										<td className={colla.colla.toLowerCase()}>{colla.colla}</td>
										{colla.top3.map((castell, i) => {
											const castell_score = puntuacions[castell.replace("C","")];
											return (
												<>
													<td key={`${colla}-${i}`} className={donePastWeek(colla.data3[i]) + (isWindows ? " windowsOS" : "")}></td>
													<td key={`${colla}-${castell}`} className={"grup" + (castell_score ? castell_score["Grup"] : '0') + isCarregat(castell)}>{castell}</td>
												</>
											);
										})}
										<td className={donePastWeek(colla.dataPilar[0]) + (isWindows ? " windowsOS" : "")}></td>
										<td className={"grup" + (pilar_score ? pilar_score["Grup"] : '0') + isCarregat(colla.topPilar[0])}>{colla.topPilar[0]}</td>
										<td><Bars castells={colla.puntuacions} pilars={colla.topPilarPuntuacio} topall={maxPuntuacio} /></td>
									</tr>
								);
							})
						}
					</tbody>
				</table>

				<div className="barometre-footer">
					{
						different_temporada && <p>Fes click <NavLink to="/">aquí</NavLink> per tornar a la temporada actual.</p>
					}
					<h5>Consulta altres temporades:</h5>
					<div className="other-seasons">
						{
							[...Array(parseInt(getLastSeptember(new Date()).getFullYear() - FIRST_YEAR + 1)).keys()].map((y, i) => {
								const oy_y = FIRST_YEAR + y;
								const is_this = (yy && parseInt(yy) === oy_y) || (!yy && getLastSeptember(new Date()).getFullYear() === oy_y);
								return <NavLink className={`${!AVAILABLE_YEARS.includes(oy_y) && 'disabled'} ${!is_this && 'unsel'}`} to={`/barometre/${oy_y}`} key={`other-years-${i}`}>
									{oy_y}-{oy_y+1}
								</NavLink>;
							})
						}
					</div>
				</div>
			</section>
		</>);
	}
}

export default withParams(Barometre);
