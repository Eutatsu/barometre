import "./DataFormatter.css";

function DataFormatter(props) {
    const { diades, puntuacions } = props;

    return (
        [...Object.values(diades)].map(diada => {
            return (
                <div className="diada">
                    <h2 className="data">{diada["info"]["Data"]}</h2>
                    <h2 className="nom">{diada["info"]["Nom"]}</h2>
                    <h2 className="lloc">{diada["info"]["Lloc"]}</h2>
                    <div className="colles">
                        {Object.keys(diada["colles"]).map(colla => {
                            return (
                                <div className="colla" key={colla}>
                                    <h3>{colla}</h3>
                                    <div className="castells">
                                        {diada["colles"][colla].map(castell => {
                                            return (
                                                <div className="castell">
                                                    <div className="ronda">{castell["Ronda"]}</div>
                                                    <div className="castell">{castell["Castell"]}</div>
                                                    <div className="resultat">{castell["Resultat"]}</div>
                                                    <div className="puntuacions">{ castell["Castell"] in puntuacions && (castell["Resultat"] === "d" || castell["Resultat"] === "c") ? puntuacions[castell["Castell"]][castell["Resultat"]] : 0 }</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
        })
    );
}

export default DataFormatter;