import { useEffect } from "react";
import * as Papa from 'papaparse';

function DataProcessor(props) {
    const { setDiades, setPuntuacions } = props;
    const link_dades = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeAif6pgFuLUAXHif4IsrSXzG8itYhirTHGdmNzA5RmrEPcJe7lcfwfNVLBEcgnn3mZbThqaZdouiP/pub?gid=0&single=true&output=csv";
    const link_puntuacions = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeAif6pgFuLUAXHif4IsrSXzG8itYhirTHGdmNzA5RmrEPcJe7lcfwfNVLBEcgnn3mZbThqaZdouiP/pub?gid=1401475200&single=true&output=csv";

    const get_data = (link, callback) => Papa.parse(link, {
        download: true,
        header: true,
        complete: (results) => callback(results) 
    });

    const aggregate = (rows) => {
        const get_diada_hash = (row) => row["Data"]  + " - " + row["Nom"];
        const diades = [...new Set(rows.map(row => get_diada_hash(row)))];

        let diades_dict = {};
        diades.forEach(diada_hash => {
            diades_dict[diada_hash] = {};
            const by_diada = rows.filter(row => get_diada_hash(row) === diada_hash);
            if (by_diada.length === 0) return;
            diades_dict[diada_hash]["info"] = (({ Data, Nom, Lloc }) => ({ Data, Nom, Lloc }))(by_diada[0]);
            
            diades_dict[diada_hash]["colles"] = {};
            const by_colles = [...new Set(by_diada.map(row => row["Colla"]))];
            by_colles.forEach(colla => {
                const only_colla = rows.filter(row => get_diada_hash(row) === diada_hash && row["Colla"] === colla);
                const castells_colla = only_colla.map(castell => (({ Ronda, Castell, Resultat }) => ({ Ronda, Castell, Resultat }))(castell));
                diades_dict[diada_hash]["colles"][colla] = castells_colla;
            });
        });

        return diades_dict;
    };

    const process_puntuacions = (data) => {
        let puntuacions_dict = {};
        data.forEach(castell => {
            puntuacions_dict[castell.castell] = {};
            puntuacions_dict[castell.castell]["c"] = castell.c;
            puntuacions_dict[castell.castell]["d"] = castell.d;
        });

        return puntuacions_dict;
    };

    useEffect(() => {
        get_data(link_dades, (results) => {
            var data = results.data
            setDiades(aggregate(data))
        });

        get_data(link_puntuacions, (results) => {
            setPuntuacions(process_puntuacions(results.data));
        })
    }, []);
}

export default DataProcessor;