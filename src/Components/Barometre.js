import "./Barometre.css"

function Barometre(props) {
    const { diades, puntuacions } = props;

    let castells_puntuats = {};
    let pilars_puntuats = {};

    const parseProfile = points => {
        if (points < 300) return "grup0";
        else if (points < 500) return "grup1";
        else if (points < 750) return "grup2";
        else if (points < 1200) return "grup3";
        else if (points < 1600) return "grup4";
        else if (points < 2500) return "grup5";
        else if (points < 3500) return "grup6";
        else if (3500 <= points) return "grup7";

        return "";
    };

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
                .map(([a,b]) => parseInt(b))
                .reduce((acc, curr) => acc + curr, 0),
            "puntuacions": Object
                .entries(castells_puntuats[colla]) // create Array of Arrays with [key, value]
                .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
                .slice(0,3) // return only the first 3 elements of the intermediate result
                .map(([a,b]) => parseInt(b)),
            "top3": colla in castells_puntuats ? Object
                .entries(castells_puntuats[colla]) // create Array of Arrays with [key, value]
                .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
                .slice(0,3) // return only the first 3 elements of the intermediate result
                .map(([n])=> n) : ["-", "-", "-"], // and map that to an array with only the name
            "topPilar": colla in pilars_puntuats ? Object
                .entries(pilars_puntuats[colla]) // create Array of Arrays with [key, value]
                .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
                .slice(0,1) // return only the first 3 elements of the intermediate result
                .map(([n])=> n) : "-", // and map that to an array with only the name
            "topPilarPuntuacio": colla in pilars_puntuats ? Object
                .entries(pilars_puntuats[colla]) // create Array of Arrays with [key, value]
                .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
                .slice(0,1) // return only the first 3 elements of the intermediate result
                .map(([, n])=> parseInt(n)) : "0" // and map that to an array with only the name
        };
    });
    
    return (
        <>
            <h1>Temporada 2022-23</h1>
            {
                top3
                .sort((a,b) => a.puntuacio_total < b.puntuacio_total ? 1 : -1)
                .map((colla, i) => {
                    return (
                        <div className="colla" key={colla.colla}>
                            <h2>#{i+1} - {colla.colla}</h2>
                            <div className="castells">
                                {colla.top3.map((castell, i) => {
                                    return <div key={castell} className={"castell " + parseProfile(colla.puntuacions[i])}>{castell}</div>;
                                })}
                                <div className={"castell " + parseProfile(colla.topPilarPuntuacio)}>{colla.topPilar}</div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
}

export default Barometre;