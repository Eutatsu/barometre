import "./LlistaDiades.css"

function LlistaDiades(props) {
    const { diades, puntuacions } = props;

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

	// TODO: Good format (Pd4+Pd4 => 2Pd4, Pd4+Pd5+Pd4 => Vd5, etc.)
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
					if (i==1) return;
					const areEntrada = areThereCastellsInRonda(diada["colles"], "Entrada");
					const are1 = areThereCastellsInRonda(diada["colles"], "1");
					const are2 = areThereCastellsInRonda(diada["colles"], "2");
					const are3 = areThereCastellsInRonda(diada["colles"], "3");
					const are4 = areThereCastellsInRonda(diada["colles"], "4");
					const are5 = areThereCastellsInRonda(diada["colles"], "5");
					const arePilar = areThereCastellsInRonda(diada["colles"], "Pilar");
					const areSortida = areThereCastellsInRonda(diada["colles"], "Sortida");
					return (
						<>
							<h2>{diada["info"]["DIADA"]}</h2>
							<h3>{diada["info"]["DATA"] + " - " + diada["info"]["LLOC"]}</h3>
							<div className="table_wrap"><table>
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
										[...Object.values(diada["colles"])].map((castells, i) => {
											return (
												<>
													<tr>
														<td className={Object.keys(diada["colles"])[i].toLowerCase()}>{Object.keys(diada["colles"])[i]}</td>
														{ areEntrada && <td>{formatRonda(getCastellsRonda(castells, "Entrada"))}</td> }
														{ are1 && <td>{formatRonda(getCastellsRonda(castells, "1"))}</td> }
														{ are2 && <td>{formatRonda(getCastellsRonda(castells, "2"))}</td> }
														{ are3 && <td>{formatRonda(getCastellsRonda(castells, "3"))}</td> }
														{ are4 && <td>{formatRonda(getCastellsRonda(castells, "4"))}</td> }
														{ are5 && <td>{formatRonda(getCastellsRonda(castells, "5"))}</td> }
														{ arePilar && <td>{formatRonda(getCastellsRonda(castells, "Pilar"))}</td> }
														{ areSortida && <td>{formatRonda(getCastellsRonda(castells, "Sortida"))}</td> }
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
