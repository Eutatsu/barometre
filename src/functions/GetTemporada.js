function GetTemporada(data) {
	let year;
	try {
		year = data.getFullYear();
	} catch {
		data = fromEuropean(data);
		year = data.getFullYear();
	}
	
	if (isFromTemporada(data, year+'-'+(year+1)))
		return year+'-'+(year+1);
	return (year-1)+'-'+year;
}

const fromEuropean = (dateString) => {
	const [day, month, year] = dateString.split("/");
	return new Date(`${month}/${day}/${year}`);
};

const isFromTemporada = (date, temporada) => {
	const start_temporada = new Date(`09/01/${temporada.split('-')[0]}`);
	const end_temporada = new Date(`08/31/${temporada.split('-')[1]}`);
	return start_temporada <= date && date <= end_temporada;
};

export default GetTemporada;
