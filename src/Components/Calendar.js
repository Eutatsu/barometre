import "./Calendar.css"

function CalendarFun(props) {
	const { calendari } = props;
	const diades = Object.values(calendari);

	const months = ["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"];
	const monthAndYear = document.getElementById("monthAndYear");

	const today = new Date();
	let currentMonth = today.getMonth();
	let currentYear = today.getFullYear();
	
	let countdown_interval;

	const showCalendar = (month, year) => {
		const tbl = document.getElementById("calendar-body");
		if (tbl === null || monthAndYear === null) return;

		hideDiadaInfo();
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
				diada_div.id = "diada-"+diada["id"];
				diada_div.addEventListener('click', showDiadaInfo);
				wrap.appendChild(diada_div);
			}
		});
	}

	const showDiadaInfo = (e) => {
		const diada_id = parseInt(e.target.id.split('-')[1]);
		const diada = getDiadaById(diada_id);
		const colles_list = diada["colles"].join(', ');

		const title = document.getElementById('diada-name');
		const place = document.getElementById('diada-lloc');
		const time = document.getElementById('diada-hora');
		const colles = document.getElementById('diada-colles');
		const panel = document.getElementById('info-panel');

		title.innerHTML = diada["diada"];
		place.innerHTML = "📍 " + diada["lloc"];
		time.innerHTML = "🕒 " + (diada["hora"] || "NS/NC");
		colles.innerHTML = "👥 <b>" + diada["amfitriona"] + "</b>";
		if (colles_list.length > 0)
			colles.innerHTML += ", " + colles_list;
		panel.style.display = "block";

		const countdown = new Date(toAmerican(diada["data"])+"T"+pad(diada["hora"] || "00:00", 5)+":00").getTime();
		document.getElementById("diada-countdown").style.display = "block";
		clearInterval(countdown_interval);
		doCountdown(countdown);
		countdown_interval = setInterval(function() {
			doCountdown(countdown);
		}, 1000);
	}

	const hideDiadaInfo = () => {
		const panel = document.getElementById('info-panel');
		panel.style.display = "none";
	}

	const doCountdown = (target_date) => {
		const now = new Date().getTime();
		const dist = target_date - now;

		if (dist < 0) {
			document.getElementById("diada-countdown").style.display = "none";
			return;
		}

		const days = Math.floor(dist / (1000 * 60 * 60 * 24));
		const hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((dist % (1000 * 60)) / 1000);

		document.getElementById("diada-countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	}

	const getDiadaById = (id) => {
		let diada = null;
		diades.forEach(d => (d["id"] === id) ? diada = d : 0);
		return diada;
	}

	const toAmerican = (european) => {
		const [d,m,y] = european.split('/');
		return y+"-"+m+"-"+d;
	}

	const pad = (n, width, z) => {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	return (
		<div id="calendar">
            <h1>Calendari</h1>
			<div className="table-wrap">
				<div className="calendar">
					<div className="header">
						<button onClick={previous}>❮</button>
						{/* eslint-disable-next-line */}
						<h3 id="monthAndYear"></h3>
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
				<div className="diada-info" style={{display: "none"}} id="info-panel">
					{/* eslint-disable-next-line */}
					<h2 id="diada-name"></h2>
					<p id="diada-lloc"></p>
					<p id="diada-hora"></p>
					<p id="diada-colles"></p>
					<div id="diada-countdown" className="countdown"></div>
					<div className="close" onClick={hideDiadaInfo}></div>
				</div>
				{showCalendar(currentMonth, currentYear)}
			</div>
		</div>
	);
}

export default CalendarFun;
