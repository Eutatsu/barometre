import Calendar from 'react-calendar'
import "./Calendar.css"

function CalendarF(props) {
	const { diades, futures } = props;

	console.log(diades)
	console.log(futures)

	return (
		<div id="calendar">
            <h1>Calendari</h1>
			<h2>Aquí s'afegiran les diverses diades universitàries. Aquesta secció es troba actualment en fase de desenvolupament.</h2>
			<Calendar locale='ca' className="justify_center"/>
		</div>
	);
}

export default CalendarF;
