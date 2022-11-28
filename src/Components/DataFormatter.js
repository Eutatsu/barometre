import React from "react";
import "./DataFormatter.css";

function DataFormatter(props) {
    const { diades } = props;

    return (
        [...Object.values(diades)].map(diada => {
            return (
                <div className="diada">
                    <h2 className="data">{diada["info"]["DATA"]}</h2>
                    <h2 className="nom">{diada["info"]["DIADA"]}</h2>
                    <h2 className="lloc">{diada["info"]["PLAÇA"]}</h2>
                    <div className="colles">
                        {Object.keys(diada["colles"]).map(colla => {
                            return (
                                <div className="colla" key={colla}>
                                    <h3>{colla}</h3>
                                    <div className="castells">
                                        {diada["colles"][colla].map(castell => {
                                            return (
                                                <div className="castell">
                                                    <div className="ronda">{castell["RONDA"]}</div>
                                                    <div className="castell">{castell["CASTELL"]}</div>
                                                    <div className="resultat">{castell["RESULTAT"]}</div>
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