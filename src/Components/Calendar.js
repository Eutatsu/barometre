import "./Calendar.css"

function CalendarFun(props) {
	const { calendari } = props;
	const diades = Object.values(calendari);

	const months = ["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"];
	const monthAndYear = document.getElementById("monthAndYear");

	const today = new Date();
	let currentMonth = today.getMonth();
	let currentYear = today.getFullYear();

	const showCalendar = (month, year) => {
		const tbl = document.getElementById("calendar-body");
		if (tbl === null || monthAndYear === null) return;

		let firstDay = (new Date(year, month)).getDay();
		firstDay = firstDay === 0 ? 6 : firstDay - 1;
		const daysInMonth = 32 - new Date(year, month, 32).getDate();
		
		tbl.innerHTML = "";
		monthAndYear.innerHTML = months[month] + " de " + year;

		let date = 1;
		for (let i = 0; i < 6; i++) {
			const row = document.createElement("tr");
			for (let j = 0; j < 7; j++) {
				const cell = document.createElement('td');
				const day_div = document.createElement('div');
				const diada_div = document.createElement('div');
				day_div.classList.add("day");
				diada_div.classList.add("diada");
				if (i === 0 && j < firstDay) {
					day_div.innerHTML = "";
					cell.classList.add("blank");
					row.appendChild(cell);
				} else if (date > daysInMonth) {
					break;
				} else {
					day_div.innerHTML = date;
					diada_div.id = "day-" + date;
					if (j === 5 || j === 6)
						cell.classList.add("weekend");
					if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth())
						cell.classList.add("today");
					date++;
				}
				cell.appendChild(day_div);
				cell.appendChild(diada_div);
				row.appendChild(cell);
			}
			tbl.appendChild(row);
		}
		addDiades(month, year);
	}

	const previous = () => {
		currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
		currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
		showCalendar(currentMonth, currentYear);
	}

	const next = () => {
		currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
		currentMonth = (currentMonth + 1) % 12;
		showCalendar(currentMonth, currentYear);
	}

	const jumpToday = () => {
		currentMonth = today.getMonth();
		currentYear = today.getFullYear();
		showCalendar(currentMonth, currentYear);
	}

	const addDiades = (month, year) => {
		diades.forEach(diada => {
			const [d,m,y] = diada["data"].split('/');
			if (parseInt(m) === month+1 && parseInt(y) === year) {
				const wrap = document.getElementById("day-"+parseInt(d));
				const diada_div = document.createElement("div");
				diada_div.classList.add(diada["amfitriona"].toLowerCase());
				diada_div.innerHTML = diada["nom"];
				wrap.appendChild(diada_div);
			}
		});
	}

	return (
		<div id="calendar">
            <h1>Calendari</h1>
			<div className="table_wrap">
				<div className="calendar">
					<div className="header">
						<button onClick={previous}>❮</button>
						<h3 id="monthAndYear">date</h3>
						<button onClick={next}>❯</button>
					</div>
					<table className="table table-bordered table-responsive-sm" id="calendar">
						<thead>
							<tr>
								<th>DL</th>
								<th>DT</th>
								<th>DC</th>
								<th>DJ</th>
								<th>DV</th>
								<th>DS</th>
								<th>DG</th>
							</tr>
						</thead>
						<tbody id="calendar-body">
						</tbody>
					</table>
					<div className="jump-today">
						<button onClick={jumpToday}>Ves a avui</button>
					</div>
				</div>
				{showCalendar(currentMonth, currentYear)}
			</div>
		</div>
	);
}

export default CalendarFun;
