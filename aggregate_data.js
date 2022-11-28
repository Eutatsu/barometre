function get_diada_hash(row) {
    return row["Data"]  + " - " + row["Nom"];
}

function aggregate(rows) {
    const diades = [...new Set(rows.map(row => get_diada_hash(row)))];
    const by_diada = diades.map(diada_hash => rows.filter(row => get_diada_hash(row) === diada_hash));
    
    return by_diada;
}