import { Component } from 'react';

class ReorganizeScores extends Component {
	constructor(props) {
		super(props);
		const puntuacions = [];
		Object.entries(props.puntuacions).forEach(([key, value]) => {
			puntuacions.push({
				"Grup": value["Grup"],
				"Subgrup": value["Subgrup"],
				"Castell": key,
				"Carregat": value["Carregat"],
				"Descarregat": value["Descarregat"]
			});
		});
		this.state = {
			dragStart: null,
			dragEnd: null,
			puntuacions: puntuacions,
		};
	}
	componentDidMount() {
		const rows = document.getElementsByTagName("tbody")[0].rows;
		for (let i = 0; i < rows.length; i++) {
			rows[i].addEventListener("dragstart", (e) => {
				this.setState({dragStart: e.target});
			});
			rows[i].addEventListener("dragover", (e) => {
				let target = e.target;
				while (target.tagName !== "TR")
					target = target.parentNode;
				this.setState({dragEnd: target});
			});
			rows[i].addEventListener("dragend", this.sortTable.bind(this));
		}
	}
	changeGrup(e) {
		const index = e.target.parentNode.parentNode.rowIndex - 1;
		const puntuacions = this.state.puntuacions;
		puntuacions[index]["Grup"] = e.target.value;
		this.setState({puntuacions: puntuacions});
	}
	changeSubgrup(e) {
		const index = e.target.parentNode.parentNode.rowIndex - 1;
		const puntuacions = this.state.puntuacions;
		puntuacions[index]["Subgrup"] = e.target.value;
		this.setState({puntuacions: puntuacions});
	}
	changeCarregat(e) {
		const index = e.target.parentNode.parentNode.rowIndex - 1;
		const puntuacions = this.state.puntuacions;
		puntuacions[index]["Carregat"] = e.target.value;
		this.setState({puntuacions: puntuacions});
	}
	changeDescarregat(e) {
		const index = e.target.parentNode.parentNode.rowIndex - 1;
		const puntuacions = this.state.puntuacions;
		puntuacions[index]["Descarregat"] = e.target.value;
		this.setState({puntuacions: puntuacions});
	}
	sortTable() {
		if (this.state.dragStart === null) return;
		if (this.state.dragStart === this.state.dragEnd) {
			this.setState({dragStart: null, dragEnd: null});
			return;
		}
		const dragStart = this.state.dragStart.rowIndex - 1;
		const dragEnd = this.state.dragEnd.rowIndex - 1;
		const puntuacions = [];
		const dragStartCastell = this.state.puntuacions[dragStart];
		for (let i = 0; i < this.state.puntuacions.length; i++) {
			if (i === dragStart) continue;
			puntuacions.push(this.state.puntuacions[i]);
			if (i === dragEnd) puntuacions.push(dragStartCastell);
		}
		this.setState({puntuacions: puntuacions, dragStart: null, dragEnd: null});
	}
	addCastell() {
		const name = prompt("Notació del castell:");
		if (name === null) return;
		const puntuacions = this.state.puntuacions;
		puntuacions.unshift({
			"Grup": 0,
			"Subgrup": 0,
			"Castell": name,
			"Carregat": 1,
			"Descarregat": 1
		});
		this.setState({puntuacions: puntuacions});
	}
	export() {
		const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.puntuacions, null, 4) + "\n");
		const a = document.createElement("a");
		a.href = data;
		a.download = "puntuacions.json";
		a.click();
	}
	import() {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";
		input.onchange = (e) => {
			const file = e.target.files[0];
			if (file === undefined) return;
			const reader = new FileReader();
			reader.onload = (e) => {
				const puntuacions = JSON.parse(e.target.result);
				this.setState({puntuacions: puntuacions});
			};
			reader.readAsText(file);
		};
		input.click();
	}
	render() {
		return (<>
			<section>
				<h2>Reorganitza les puntuacions</h2>

				<button className="btn" onClick={this.addCastell.bind(this)}>Afegeix un nou castell</button>

				<table className="score-tb" style={{marginBottom: '1rem'}}>
					<thead>
						<tr>
							<th></th>
							<th>Grup</th>
							<th>Subgrup</th>
							<th>Castell</th>
							<th>Carregat</th>
							<th>Descarregat</th>
						</tr>
					</thead>
					<tbody>
					{
						this.state.puntuacions.map((castell, i) => (
							<tr key={`castell-${i}`} draggable>
								<td><span>&#x2630;</span></td>
								<td>
									<input type="number" min="0" step="1" value={castell["Grup"]} onChange={this.changeGrup.bind(this)} />
								</td>
								<td>
									<input type="number" min="0" step="1" value={castell["Subgrup"]} onChange={this.changeSubgrup.bind(this)} />
								</td>
								<td>{castell["Castell"]}</td>
								<td>
									<input type="number" min="1" step="1" value={castell["Carregat"]} onChange={this.changeCarregat.bind(this)} />
								</td>
								<td>
									<input type="number" min="1" step="1" value={castell["Descarregat"]} onChange={this.changeDescarregat.bind(this)} />
								</td>
							</tr>
						))
					}
					</tbody>
				</table>

				<button className="btn" onClick={this.export.bind(this)} style={{marginRight: '0.5rem', marginBottom: '0.5rem'}}>Exporta les puntuacions</button>
				<button className="btn" onClick={this.import.bind(this)}>Importa les puntuacions</button>
			</section>
		</>);
	}
}

export default ReorganizeScores;
