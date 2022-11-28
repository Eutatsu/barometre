import { useEffect } from "react";
import { Papa } from 'papaparse';

function DataProcessor(props) {
    const link_dades = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeAif6pgFuLUAXHif4IsrSXzG8itYhirTHGdmNzA5RmrEPcJe7lcfwfNVLBEcgnn3mZbThqaZdouiP/pub?gid=0&single=true&output=csv";

    const get_data = (link, callback) => Papa.parse(link, {
        download: true,
        header: true,
        complete: (results) => callback(results) 
    });

    const aggregate = (rows) => {
        const get_diada_hash = (row) => row["Data"]  + " - " + row["Nom"];
        const diades = [...new Set(rows.map(row => get_diada_hash(row)))];
        const by_diada = diades.map(diada_hash => rows.filter(row => get_diada_hash(row) === diada_hash));
        return by_diada;
    };

    useEffect(() => {
        get_data(link_dades, (results) => {
            var data = results.data
            console.log(aggregate(data))
        });
    }, []);
}

export default DataProcessor;