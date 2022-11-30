import "./LlistaDiades.css"

function LlistaDiades(props) {
    const { diades, puntuacions } = props;

	const fromEuropean = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return new Date(`${month}/${day}/${year}`);
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
										<th>Entrada</th>
										<th>Ronda #1</th>
										<th>Ronda #2</th>
										<th>Ronda #3</th>
										<th>Ronda #4</th>
										<th>Ronda #5</th>
										<th>Pilar</th>
										<th>Sortida</th>
									</tr>
								</thead>
								<tbody>
									{
										[...Object.values(diada["colles"])].map((castells, i) => {
											return (
												<>
													<tr>
														<td className={Object.keys(diada["colles"])[i].toLowerCase()}>{Object.keys(diada["colles"])[i]}</td>
														<td>{formatRonda(getCastellsRonda(castells, "Entrada"))}</td>
														<td>{formatRonda(getCastellsRonda(castells, "1"))}</td>
														<td>{formatRonda(getCastellsRonda(castells, "2"))}</td>
														<td>{formatRonda(getCastellsRonda(castells, "3"))}</td>
														<td>{formatRonda(getCastellsRonda(castells, "4"))}</td>
														<td>{formatRonda(getCastellsRonda(castells, "5"))}</td>
														<td>{formatRonda(getCastellsRonda(castells, "Pilar"))}</td>
														<td>{formatRonda(getCastellsRonda(castells, "Sortida"))}</td>
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
