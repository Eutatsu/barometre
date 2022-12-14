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
			<div className="container"><iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FMadrid&showTitle=0&showPrint=0&showTabs=0&showTz=0&hl=ca&src=ODNiNGFiOTdiZWI2NTgyNzI3ZTgwM2VmYzc2NTgxYTk4YzdiYzM1NDRmOGJiM2QwZGJjNmRlM2M1N2JhOWFmMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YTUyOGRhMTJjOWI4MjNkZDgyZTZiYTZiOTI1MWJmZjI4Y2Q1ZTdkYWY0ZjQ0MGVkNWE4YmRlMmQwMTEyMTU1OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Yzg3Y2RiYjRhZDdhYjk4ZjJjNGE3ZTNhNWM0YTgyN2ZiOWU0YjcyNjhiYjM4MzI4NzNjZTViZjhiNDAwZWE0OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MGQxNWY2ODZhMDI4YjRmYTBkM2ExNjIwYjMxMWJmNWFiZmRiNTY2M2Y3NzRmM2FiZmY5NWE2ZWJlYjRjYjgxN0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NWJlYmIyZWVhYjJjYTUzNjU5MTM5ZTgxMmNiN2MwNDkxZDA0ODZkY2MwMjUxN2YzNWEwOWY4NjI0YTFjYjZjMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MDJlZTEyODhmMzNmODM3ZmFjYTM2ZmM5MDZkNWU2YWE1ZmZhNmQxZDk2OTVkZWQ1MTEzODRlNWE4OGM3NTk4OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YzE4NjgwY2YyZTI5MGMwODQyZTU0M2IxM2EzMTcyNDNhMzhhMTIxOTkwNTc4Mjc1N2M5YjhkMDAzZDg5ZGQ3ZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YjI1YjA3ZWU2MWZhOTM3YTAxMWU3Y2E0YzlkODljM2Q0YjRkYjBiNjY4ZTEzMjhjMWI5MDQ5ZmQzM2E5NjBjZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MzU5ZWZkOGJjYjg3Yjk1N2FkN2E4NTEzNWJjOWZhMzllN2Y1YjU0MjRlMDdjNWM3MTA0NWIzM2Q3NTgyOGEwMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NzJmZWFlOGUwMzIwMDVjMTQ4NTRjZDMxN2EwYTQyMmI4N2Y3ODc2OGZkNzkxNDNmOTQwMjU4YzE1ZWU2MmNjYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=N2ZhYmQ0YzNkMjA2ZDc4Yzc1YTcyZmVmNDkzYTNmN2RmZTEzN2VkOTRlNzMwZGZjYzE0MmEwNjQzY2M4NTkxYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=OTdhODc4NzEyMjdkYjAyNjA2OGQ2ZGQzZjI3Nzc4NTQwNzljNWVhMDczZGIyZGI2NjkyYzFmZTE4ZTI0YmM5MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=N2U2MzlhMGI3ZTljYjRjZjA2ZWQ0YjhlNzA3YjZiMDU1Mjk2MzIxZDdmYWUzNmFlY2QyOWIxYmM0NzlmNmQxZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%2315a884&color=%2371a807&color=%23c80036&color=%23ccb100&color=%23257ba2&color=%23a4005a&color=%2321277c&color=%23979db5&color=%239f73a6&color=%23c25800&color=%23c60000&color=%23a48970&color=%230099c3" title="barometre-calendar"/></div>
		</div>
	);
}

export default CalendarFun;
