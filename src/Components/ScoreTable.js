import "./ScoreTable.css"

function ScoreTable(props) {
    const { diades, puntuacions } = props;

	const groupLength = (group) => {
		let length = 0;
		taula_puntuacions.map((castell, i) => {
			if (castell["Grup"] === group) length += 1;
		});
		return length;
	};

	const subGroupLength = (group, subgroup) => {
		let length = 0;
		taula_puntuacions.map((castell, i) => {
			if (castell["Grup"] === group && castell["Subgrup"] === subgroup) length += 1;
		});
		return length;
	};

	const taula_puntuacions = [...Object.values(puntuacions)];

	let lastGroup = -1;
	let lastSub = -1;
	return (
        <>
			<div id="score">
            <h1>Taula de puntuacions</h1>
			<table>
				<thead>
					<tr>
						<th>Grup</th>
						<th>Subgrup</th>
						<th>Castell</th>
						<th>Carregat</th>
						<th>Descarregat</th>
					</tr>
				</thead>
				<tbody>
			{
				taula_puntuacions.map((castell, i) => {
					const group = lastGroup === castell["Grup"] ? <></> : <td rowSpan={groupLength(castell["Grup"])}>Grup {castell["Grup"]}</td>;
					const sub = lastSub === castell["Subgrup"] && lastGroup === castell["Grup"] ? <></> : <td rowSpan={subGroupLength(castell["Grup"], castell["Subgrup"])}>sub {castell["Subgrup"]}</td>;
					lastGroup = castell["Grup"];
					lastSub = castell["Subgrup"];
					return (
						<>
							<tr className={"grup"+lastGroup}>
								{group}
								{sub}
								<td>{Object.keys(puntuacions)[i]}</td>
								<td>{castell["Carregat"]}</td>
								<td>{castell["Descarregat"]}</td>
							</tr>
						</>
					);
				})
			}
				</tbody>
			</table>
			</div>
        </>
    );
}

export default ScoreTable;
