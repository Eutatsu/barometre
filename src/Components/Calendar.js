import Calendar from 'react-calendar'
import "./Calendar.css"

function CalendarFun(props) {
	const { calendari } = props;

	const diades = [];
	const entries = Object.entries(calendari);
	for (let i = 0; i < entries.length; i++) {
		diades.push(entries[i][1]);
		diades[i]["diada"] = entries[i][0];
	}

	return (
		<div id="calendar">
            <h1>Calendari</h1>
			<h2>Aquí s'afegiran les diverses diades universitàries. Aquesta secció es troba actualment en fase de desenvolupament.</h2>
			<Calendar locale='ca' className="justify_center" />
		</div>
	);
}

export default CalendarFun;
