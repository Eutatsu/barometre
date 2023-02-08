import "./LlistaDiades.css"

function LlistaDiades(props) {
	window.scrollTo(0, 0);

	const { diades } = props;

	const fromEuropean = (dateString) => {
		const [day, month, year] = dateString.split("/");
		return new Date(`${month}/${day}/${year}`);
	};

	const areThereCastellsInRonda = (diada_colles, ronda) => {
		const castells = [...Object.values(diada_colles)];
		let areInRonda;
		for (const c of castells) {
			const castellsInRonda = getCastellsRonda(c, ronda);
			areInRonda = castellsInRonda.map(arr => arr !== []).reduce((prev, curr) => prev || curr, false);
			if (areInRonda) return true;
		}
		return areInRonda;
	};

	const getCastellsRonda = function (castells, ronda) {
		let castells_of_round = [];
		for (const castell of castells)
			if (castell["RONDA"] === ronda) castells_of_round.push(castell)
		return castells_of_round;
	}

	const count = (obj) => {
		return Object.keys(obj).length;
	}

	const parseCastells = (castells) => {
		let res = {};
		for (const castell of castells) {
			let name = castell["CASTELL"];
			if (castell["RESULTAT"] === "Carregat")
				name += "C"
			else if (castell["RESULTAT"] === "Intent desmuntat")
				name = "id" + name;
			else if (castell["RESULTAT"] === "Intent")
				name = "i" + name;

			if (name in res)
				res[name] += 1;
			else
				res[name] = 1;
		}
		return formatRonda(res);
	}

	const formatRonda = (castellsDict) => {
		const special = specialRounds(castellsDict);
		if (special !== false)
			return special;
		let res = "";
		for (const [castell, amount] of Object.entries(castellsDict))
			res += formatCastell(amount, castell) + "+";
		return res.slice(0,-1);
	}

	const formatCastell = (amount, castell) => {
		return (amount === 1 ? "" :amount) + castell;
	}

	const specialRounds = (castellsDict) => {
		if (count(castellsDict) === 2 &&
			"Pd4" in castellsDict && castellsDict["Pd4"] === 2 &&
			"Pd5" in castellsDict && castellsDict["Pd5"] === 1)
			return "Vd5";
		if (count(castellsDict) === 2 &&
			"Pd3" in castellsDict && castellsDict["Pd3"] === 2 &&
			"Pd4" in castellsDict && castellsDict["Pd4"] === 1)
			return "Vd4";
		return false;
	}

    const llista_diades = [...Object.values(diades)];
	llista_diades.sort((a,b) => fromEuropean(b["info"]["DATA"]) - fromEuropean(a["info"]["DATA"]));

	return (
        <>
			<div id="diades">
				<h1>Llista de diades universitàries</h1>
				{
					llista_diades.map((diada, i) => {
						const areEntrada = areThereCastellsInRonda(diada["colles"], "Entrada");
						const are1 = areThereCastellsInRonda(diada["colles"], "1");
						const are2 = areThereCastellsInRonda(diada["colles"], "2");
						const are3 = areThereCastellsInRonda(diada["colles"], "3");
						const are4 = areThereCastellsInRonda(diada["colles"], "4");
						const are5 = areThereCastellsInRonda(diada["colles"], "5");
						const arePilar = areThereCastellsInRonda(diada["colles"], "Pilar");
						const areSortida = areThereCastellsInRonda(diada["colles"], "Sortida");
						const colles = Object.keys(diada["colles"]).map(function(key) {
							return [key, diada["colles"][key]];
						});
						colles.sort((a, b) => {
							const ordreA = a[1]["ordre"];
							const ordreB = b[1]["ordre"];
							return ordreA - ordreB;
						});
						return (
							<>
								<h2>{diada["info"]["DIADA"]}</h2>
								<h3>{diada["info"]["DATA"] + " - " + diada["info"]["LLOC"]}</h3>
								<div className="table-wrap"><table>
									<thead>
										<tr>
											<th>Colla</th>
											{ areEntrada && <th>Entrada</th> }
											{ are1 && <th>Ronda #1</th> }
											{ are2 && <th>Ronda #2</th> }
											{ are3 && <th>Ronda #3</th> }
											{ are4 && <th>Ronda #4</th> }
											{ are5 && <th>Ronda #5</th> }
											{ arePilar && <th>Pilar</th> }
											{ areSortida && <th>Sortida</th> }
										</tr>
									</thead>
									<tbody>
										{
											colles.map((colla, i) => {
												const castells = colla[1];
												const entrada = parseCastells(getCastellsRonda(castells, "Entrada"));
												const round1 = parseCastells(getCastellsRonda(castells, "1"));
												const round2 = parseCastells(getCastellsRonda(castells, "2"));
												const round3 = parseCastells(getCastellsRonda(castells, "3"));
												const round4 = parseCastells(getCastellsRonda(castells, "4"));
												const round5 = parseCastells(getCastellsRonda(castells, "5"));
												const pilar = parseCastells(getCastellsRonda(castells, "Pilar"));
												const sortida = parseCastells(getCastellsRonda(castells, "Sortida"));
												return (
													<>
														<tr>
															<td className={colla[0].toLowerCase()}>{colla[0]}</td>
															{ areEntrada && <td className={entrada.includes("(actx)") ? "acotxaneta" : ""}>{entrada}</td> }
															{ are1 && <td className={round1.includes("(actx)") ? "acotxaneta" : ""}>{round1}</td> }
															{ are2 && <td className={round2.includes("(actx)") ? "acotxaneta" : ""}>{round2}</td> }
															{ are3 && <td className={round3.includes("(actx)") ? "acotxaneta" : ""}>{round3}</td> }
															{ are4 && <td className={round4.includes("(actx)") ? "acotxaneta" : ""}>{round4}</td> }
															{ are5 && <td className={round5.includes("(actx)") ? "acotxaneta" : ""}>{round5}</td> }
															{ arePilar && <td className={pilar.includes("(actx)") ? "acotxaneta" : ""}>{pilar}</td> }
															{ areSortida && <td className={sortida.includes("(actx)") ? "acotxaneta" : ""}>{sortida}</td> }
														</tr>
													</>
												);
											})
										}
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

export default LlistaDiades;
