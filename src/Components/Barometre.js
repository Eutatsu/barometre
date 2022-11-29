function Barometre(props) {
    const { diades, puntuacions } = props;

    let castells_puntuats = {};
    let pilars_puntuats = {};

    const llista_diades = [...Object.values(diades)];
    llista_diades.map(diada => {
        const colles = Object.keys(diada["colles"]);
        colles.map(colla => {
            diada["colles"][colla].map(castell => {
                if (castell["CASTELL"] in puntuacions && (castell["RESULTAT"] === "Descarregat" || castell["RESULTAT"] === "Carregat")) {
                    const punts = puntuacions[castell["CASTELL"]][castell["RESULTAT"]];

                    if (castell["CASTELL"].toLowerCase().startsWith("p") || castell["CASTELL"].toLowerCase().startsWith("v")) {
                        if (!(colla in pilars_puntuats)) pilars_puntuats[colla] = {};
                        pilars_puntuats[colla][castell["CASTELL"]] = punts;
                    } else {
                        if (!(colla in castells_puntuats)) castells_puntuats[colla] = {};
                        castells_puntuats[colla][castell["CASTELL"]] = punts;
                    }
                }
            })
        })
    });

    const top3 = Object.keys(castells_puntuats).map(colla => {
        return {
            "colla": colla,
            "puntuacio_total": Object
                .entries(castells_puntuats[colla]) // create Array of Arrays with [key, value]
                .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
                .slice(0,3) // return only the first 3 elements of the intermediate result
                .map(([a,b]) => b)
                .reduce((acc, curr) => acc + parseInt(curr), 0),
            "top3": colla in castells_puntuats ? Object
                .entries(castells_puntuats[colla]) // create Array of Arrays with [key, value]
                .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
                .slice(0,3) // return only the first 3 elements of the intermediate result
                .map(([n])=> n) : ["-", "-", "-"], // and map that to an array with only the name
            "topPilar": colla in pilars_puntuats ? Object
                .entries(pilars_puntuats[colla]) // create Array of Arrays with [key, value]
                .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
                .slice(0,1) // return only the first 3 elements of the intermediate result
                .map(([n])=> n) : "-" // and map that to an array with only the name
        };
    });

    const sorted_top3 = top3.sort((a,b) => a.puntuacio_total < b.puntuacio_total);
    
    return (
        <>
            <h1>Temporada 2022-23</h1>
            {sorted_top3.map((colla, i) => {
                return (
                    <div className="colla" key={colla}>
                        <h2 style={{ textAlign: "center" }}>#{i+1} - {colla.colla}</h2>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            {colla.top3.map(castell => {
                                return <div>{castell}</div>;
                            })}
                            <div>{colla.topPilar}</div>
                        </div>
                    </div>
                )
            })}
        </>
    );
}

export default Barometre;