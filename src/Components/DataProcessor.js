import { useEffect } from "react";
import * as Papa from 'papaparse';

function DataProcessor(props) {
    const { setDiades, setCalendari, setPuntuacions } = props;
    const link_dades = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeAif6pgFuLUAXHif4IsrSXzG8itYhirTHGdmNzA5RmrEPcJe7lcfwfNVLBEcgnn3mZbThqaZdouiP/pub?gid=0&single=true&output=csv";
    const link_calendari = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeAif6pgFuLUAXHif4IsrSXzG8itYhirTHGdmNzA5RmrEPcJe7lcfwfNVLBEcgnn3mZbThqaZdouiP/pub?gid=577649250&single=true&output=csv";
    const link_puntuacions = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeAif6pgFuLUAXHif4IsrSXzG8itYhirTHGdmNzA5RmrEPcJe7lcfwfNVLBEcgnn3mZbThqaZdouiP/pub?gid=1401475200&single=true&output=csv";

    const get_data = (link, callback) => Papa.parse(link, {
        download: true,
        header: true,
        complete: (results) => callback(results) 
    });

    const aggregate = (rows) => {
        const get_diada_hash = (row) => row["DATA"]  + " - " + row["DIADA"];
        const diades = [...new Set(rows.map(row => get_diada_hash(row)))];

        let diades_dict = {};
        diades.forEach(diada_hash => {
            diades_dict[diada_hash] = {};
            const by_diada = rows.filter(row => get_diada_hash(row) === diada_hash);
            if (by_diada.length === 0) return;
            diades_dict[diada_hash]["info"] = (({ DATA, DIADA, LLOC }) => ({ DATA, DIADA, LLOC }))(by_diada[0]);
            
            diades_dict[diada_hash]["colles"] = {};
            const by_colles = [...new Set(by_diada.map(row => row["COLLA"]))];
            by_colles.forEach(colla => {
                const only_colla = rows.filter(row => get_diada_hash(row) === diada_hash && row["COLLA"] === colla);
                diades_dict[diada_hash]["colles"][colla] = only_colla.map(castell => (({ RONDA, CASTELL, RESULTAT }) => ({ RONDA, CASTELL, RESULTAT }))(castell));
                diades_dict[diada_hash]["colles"][colla]["ordre"] = parseInt(only_colla[0]["ORDRE"]);
            });
        });

        return diades_dict;
    };

    const read_calendari = (data) => {
        let calendar_dict = {};
        data.forEach(diada => {
            calendar_dict[diada["DIADA"]] = {};
            calendar_dict[diada["DIADA"]]["data"] = diada["DATA"];
            calendar_dict[diada["DIADA"]]["lloc"] = diada["LLOC"];
            calendar_dict[diada["DIADA"]]["colles"] = [];
            const colles = diada["COLLES"].split(',');
            colles.forEach(colla => {
                calendar_dict[diada["DIADA"]]["colles"].push(colla.trim());
            })
        });

        return calendar_dict;
    }

    const process_puntuacions = (data) => {
        let puntuacions_dict = {};
        data.forEach(castell => {
            puntuacions_dict[castell.castell] = {};
            puntuacions_dict[castell.castell]["Grup"] = castell["Grup"];
            puntuacions_dict[castell.castell]["Subgrup"] = castell["Subgrup"];
            puntuacions_dict[castell.castell]["Carregat"] = castell["Carregat"];
            puntuacions_dict[castell.castell]["Descarregat"] = castell["Descarregat"];
            puntuacions_dict[castell.castell]["Mai carregat"] = castell["Mai carregat"] === 'Sí';
            puntuacions_dict[castell.castell]["Mai descarregat"] = castell["Mai descarregat"] === 'Sí';
        });

        return puntuacions_dict;
    };

    useEffect(() => {
        get_data(link_dades, (results) => {
            setDiades(aggregate(results.data));
        });

        get_data(link_calendari, (results) => {
            setCalendari(read_calendari(results.data));
        });

        get_data(link_puntuacions, (results) => {
            setPuntuacions(process_puntuacions(results.data));
        });
    }, []);
}

export default DataProcessor;
