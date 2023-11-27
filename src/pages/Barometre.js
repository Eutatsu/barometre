import { Component } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Bars from "./../components/Bars";
import COLLES_INICIALS from "./../data/colles.json";
import GetTemporada from "./../functions/GetTemporada";
import GetHighContrast from "./../functions/GetHighContrast";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class Barometre extends Component {
	render() {
		const { diades, puntuacions } = this.props;
		const { yy } = this.props.params;

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

		let yy_date = new Date();
		if (yy)
			yy_date = new Date(`${parseInt(yy)+1}-08-31`);
		const now_temporada = GetTemporada(new Date());
		const selected_temporada = GetTemporada(yy_date);
		const colles_inicials = COLLES_INICIALS[selected_temporada];

		if (colles_inicials === undefined) {
			return (<>
				<section>
					<h2>Temporada {yy === '2020' ? '2020-2021' : 'no vàlida'}</h2>
					{
						yy === '2020' && <p style={{marginTop: '1rem'}}>Durant la temporada 2020-2021 no hi va haver castells universitaris a causa de l'aturada de l'activitat provocada per la COVID-19.</p>
					}
					<p style={{marginTop: '1rem'}}>Fes click <NavLink to="/">aquí</NavLink> per tornar a la temporada actual.</p>
				</section>
			</>);
		}

		const isWindows = window.navigator["platform"].includes("Win");
		if (Object.keys(puntuacions).length === 0) return <></>;

		let castells_puntuats = {};
		let pilars_puntuats = {};
		let data_pilars = {};
		let data_castells = {};

		let castells_puntuats_lastWeek = {};
		let pilars_puntuats_lastWeek = {};

		let maxPuntuacio = -1;
		let maxCastell = '';

		const llista_diades = [...Object.values(diades)];
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

		const top3 = Object.keys(colles_inicials).map(colla => {
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
		top3.forEach(colla => colla.puntuacio_total = colla.puntuacio_castells + parseInt(colla.topPilarPuntuacio[0]));

		const lastWeek = new Date();
		lastWeek.setDate(lastWeek.getDate() - 8);
		const ultima_setmana = aquesta_temporada.filter(diada => fromEuropean(diada["info"]["DATA"]) < lastWeek);
		ultima_setmana.sort((a,b) => fromEuropean(b["info"]["DATA"]) - fromEuropean(a["info"]["DATA"]));
		ultima_setmana.forEach(diada => {
			const colles = Object.keys(diada["colles"]);
			colles.forEach(colla => {
				diada["colles"][colla].forEach(castell => {
					if (castell["CASTELL"] in puntuacions && (castell["RESULTAT"] === "Descarregat" || castell["RESULTAT"] === "Carregat")) {
						const punts = puntuacions[castell["CASTELL"]][castell["RESULTAT"]];
						const res = castell["RESULTAT"] === "Carregat" ? 'C' : '';
						
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
		Object.keys(pilars_puntuats_lastWeek).forEach(colla => {
			if (!(colla in castells_puntuats_lastWeek)) {
				top3_lastWeek.push({
					"colla": colla,
					"puntuacio_castells": 0,
					"topPilarPuntuacio": Object
						.entries(pilars_puntuats_lastWeek[colla])
						.sort(([, a],[, b]) => b-a)
						.slice(0,1)
						.map(([, n])=> parseInt(n))
				});
			}
		});
		top3_lastWeek.forEach(colla => colla.puntuacio_total = colla.puntuacio_castells + parseInt(colla.topPilarPuntuacio[0]));

		let lastPoints = 0;
		top3_lastWeek.sort((a,b) => a.puntuacio_total < b.puntuacio_total ? 1 : -1)
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

		const different_temporada = GetTemporada(yy_date) !== GetTemporada(new Date());

		return (<>
			<section>
				<h2>Temporada {selected_temporada}</h2>
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
							.sort((a,b) => a.puntuacio_total < b.puntuacio_total ? 1 : -1)
							.map((colla, i) => {
								let pos = lastPoints === colla.puntuacio_total ? i : i+1;
								const difference = lastWeek_pos[colla.colla]-pos === 0 || now_temporada !== selected_temporada ? "same" : lastWeek_pos[colla.colla]-pos > 0 ? "up" : lastWeek_pos[colla.colla] ? "down" : "up";
								lastPoints = colla.puntuacio_total;
								const pilar_score = puntuacions[colla.topPilar[0].replace("C","")];
								const colla_color = COLLES_INICIALS[selected_temporada][colla.colla];
								return (
									<tr className="colla" key={colla.colla}>
										<td className={parseInt(colla.puntuacio_total) === 0 ? 'same' : difference}></td>
										<td>{parseInt(colla.puntuacio_total) === 0 ? '' : pos ? pos : pos + 1}</td>
										<td style={{backgroundColor: colla_color, color: GetHighContrast(colla_color)}}>{colla.colla}</td>
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
							Object.keys(COLLES_INICIALS).map((y, i) => {
								return <NavLink className={`${!(y === selected_temporada) && 'unsel'}`} to={`/barometre/${y.split('-')[0]}`} key={`other-years-${i}`}>
									{y}
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
