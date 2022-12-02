import "./Barometre.css"

function Barometre(props) {
    const { diades, puntuacions } = props;

    let castells_puntuats = {};
    let pilars_puntuats = {};
    let data_pilars = {};
    let data_castells = {};

    const isCarregat = castell => {
        if (castell.slice(-1) === "C") return " carregat";
        return "";
    }

    const donePastWeek = date => {
        if (Math.floor((new Date() - fromEuropean(date)) / (1000*60*60*24)) < 8) return "new";
        return "";
    }

    const fromEuropean = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return new Date(`${month}/${day}/${year}`);
    };

    const getLastSeptember = (today) => {
        if (today.getMonth() >= 9-1) {
            return new Date(`09/01/${today.getFullYear()}`);
        } else {
            return new Date(`09/01/${today.getFullYear()-1}`);
        }
    };

    const llista_diades = [...Object.values(diades)];
    const aquesta_temporada = llista_diades.filter(diada => fromEuropean(diada["info"]["DATA"]) > getLastSeptember(new Date()));
    aquesta_temporada.sort((a,b) => fromEuropean(b["info"]["DATA"]) - fromEuropean(a["info"]["DATA"]));
    aquesta_temporada.forEach(diada => {
        const colles = Object.keys(diada["colles"]);
        const date = diada["info"]["DATA"];
        colles.forEach(colla => {
            diada["colles"][colla].forEach(castell => {
                if (castell["CASTELL"] in puntuacions && (castell["RESULTAT"] === "Descarregat" || castell["RESULTAT"] === "Carregat")) {
                    const punts = puntuacions[castell["CASTELL"]][castell["RESULTAT"]];

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
                        castells_puntuats[colla][castell["CASTELL"]+res] = punts;
                        data_castells[colla][castell["CASTELL"]+res] = date;
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
            "data3": colla in data_castells ? Object
                .entries(castells_puntuats[colla]) // create Array of Arrays with [key, value]
                .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
                .slice(0,3) // return only the first 3 elements of the intermediate result
                .map(([n])=> data_castells[colla][n]) : ["-", "-", "-"], // and map that to an array with only the name
            "topPilar": colla in pilars_puntuats ? Object
                .entries(pilars_puntuats[colla]) // create Array of Arrays with [key, value]
                .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
                .slice(0,1) // return only the first 3 elements of the intermediate result
                .map(([n])=> n) : "-", // and map that to an array with only the name
            "topPilarPuntuacio": colla in pilars_puntuats ? Object
                .entries(pilars_puntuats[colla]) // create Array of Arrays with [key, value]
                .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
                .slice(0,1) // return only the first 3 elements of the intermediate result
                .map(([, n])=> parseInt(n)) : "0", // and map that to an array with only the name
            "dataPilar": colla in data_pilars ? Object
                .entries(pilars_puntuats[colla]) // create Array of Arrays with [key, value]
                .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
                .slice(0,1) // return only the first 3 elements of the intermediate result
                .map(([n])=> data_pilars[colla][n]) : "-", // and map that to an array with only the name
        };
    });
    top3.forEach(colla => colla.puntuacio_total += colla.topPilarPuntuacio[0]);

    let lastPoints = 0;
    return (
        <>
            <div id="barometre">
            <h1>Baròmetre Universitari: Temporada 2022-23</h1>
            <h2>(Actualitzat a 1 de desembre 2022)</h2>
            <div className="justify_center">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Colla</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                {
                    top3
                    .sort((a,b) => a.puntuacio_total < b.puntuacio_total ? 1 : -1)
                    .map((colla, i) => {
                        let pos = lastPoints === colla.puntuacio_total ? i : i+1;
                        lastPoints = colla.puntuacio_total;
                        return (
                            <tr className="colla" key={colla.colla}>
                                <td>{pos}</td>
                                <td className={colla.colla.toLowerCase()}>{colla.colla}</td>
                                {colla.top3.map((castell, i) => {
                                    return (
                                        <>
                                            <td className={donePastWeek(colla.data3[i])}></td>
                                            <td key={castell} className={"castell grup" + puntuacions[castell.replace("C","")]["Grup"] + isCarregat(castell)}>{castell}</td>
                                        </>
                                    );
                                })}
                                <td className={donePastWeek(colla.dataPilar[0])}></td>
                                <td className={"castell grup" + puntuacions[colla.topPilar[0].replace("C","")]["Grup"] + isCarregat(colla.topPilar[0])}>{colla.topPilar[0]}</td>
                            </tr>
                        );
                    })
                }
                    </tbody>
                </table>
            </div>
            </div>
        </>
    );
}

export default Barometre;
