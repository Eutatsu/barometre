import "./LlistaDiades.css"

function LlistaDiades(props) {
    const { diades, puntuacions } = props;

	const fromEuropean = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return new Date(`${month}/${day}/${year}`);
    };

	const areThereCastellsInRonda = (diada_colles, ronda) => {
		const castells = [...Object.values(diada_colles)][0];
		const castellsInRonda = getCastellsRonda(castells, ronda);
		const areInRonda = castellsInRonda.map(arr => arr !== []).reduce((prev, curr) => prev || curr, false);
		return areInRonda;
	};

	const getCastellsRonda = function (castells, ronda) {
		let castells_of_round = [];
		for (const castell of castells)
			if (castell["RONDA"] === ronda)
			castells_of_round.push(castell)
		return castells_of_round;
	}

	const formatRonda = (castells) => {
		let res = "";
		for (const castell of castells) {
			if (castell["RESULTAT"] === "Descarregat")
				res += castell["CASTELL"]
			else if (castell["RESULTAT"] === "Carregat")
				res += castell["CASTELL"]+"C"
			else if (castell["RESULTAT"] === "Intent desmuntat")
				res += "id"+castell["CASTELL"]
			else
				res += "i"+castell["CASTELL"]
			res += "+"
		}
		return res.slice(0,-1);
	}

    const llista_diades = [...Object.values(diades)];
	llista_diades.sort((a,b) => fromEuropean(b["info"]["DATA"]) - fromEuropean(a["info"]["DATA"]));

	return (
        <>
			<div id="diades">
            <h1>Llista de Diades Universitàries</h1>
			{
				llista_diades.map((diada, i) => {
					return (
						<>
							<h2>{diada["info"]["DIADA"]}</h2>
							<h3>{diada["info"]["DATA"] + " - " + diada["info"]["LLOC"]}</h3>
							<div className="table_wrap"><table>
								<thead>
									<tr>
										<th>Colla</th>
										{ areThereCastellsInRonda(diada["colles"], "Entrada") && <th>Entrada</th> }
										{ areThereCastellsInRonda(diada["colles"], "1") && <th>Ronda #1</th> }
										{ areThereCastellsInRonda(diada["colles"], "2") && <th>Ronda #2</th> }
										{ areThereCastellsInRonda(diada["colles"], "3") && <th>Ronda #3</th> }
										{ areThereCastellsInRonda(diada["colles"], "4") && <th>Ronda #4</th> }
										{ areThereCastellsInRonda(diada["colles"], "5") && <th>Ronda #5</th> }
										{ areThereCastellsInRonda(diada["colles"], "Pilar") && <th>Pilar</th> }
										{ areThereCastellsInRonda(diada["colles"], "Sortida") && <th>Sortida</th> }
									</tr>
								</thead>
								<tbody>
									{
										[...Object.values(diada["colles"])].map((castells, i) => {
											return (
												<>
													<tr>
														<td className={Object.keys(diada["colles"])[i].toLowerCase()}>{Object.keys(diada["colles"])[i]}</td>
														{ areThereCastellsInRonda(diada["colles"], "Entrada") && <td>{formatRonda(getCastellsRonda(castells, "Entrada"))}</td> }
														{ areThereCastellsInRonda(diada["colles"], "1") && <td>{formatRonda(getCastellsRonda(castells, "1"))}</td> }
														{ areThereCastellsInRonda(diada["colles"], "2") && <td>{formatRonda(getCastellsRonda(castells, "2"))}</td> }
														{ areThereCastellsInRonda(diada["colles"], "3") && <td>{formatRonda(getCastellsRonda(castells, "3"))}</td> }
														{ areThereCastellsInRonda(diada["colles"], "4") && <td>{formatRonda(getCastellsRonda(castells, "4"))}</td> }
														{ areThereCastellsInRonda(diada["colles"], "5") && <td>{formatRonda(getCastellsRonda(castells, "5"))}</td> }
														{ areThereCastellsInRonda(diada["colles"], "Pilar") && <td>{formatRonda(getCastellsRonda(castells, "Pilar"))}</td> }
														{ areThereCastellsInRonda(diada["colles"], "Sortida") && <td>{formatRonda(getCastellsRonda(castells, "Sortida"))}</td> }
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
