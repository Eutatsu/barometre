import { Component } from "react";
import DropdownCastells from "../components/DropdownCastells";

class Calculadora extends Component {
	constructor(props) {
		super(props);
		this.state = {
			colles: [
				{
					nom: 'Colla #1',
					castells: [
						{
							castell: null,
							descarregat: true
						},
						{
							castell: null,
							descarregat: true
						},
						{
							castell: null,
							descarregat: true
						}
					],
					pilar: {
						castell: null,
						descarregat: true
					},
					punts: 0
				}
			]
		};
	}
	createTeam() {
		const colles = this.state.colles;
		colles.push({
			nom: `Colla #${colles.length+1}`,
			castells: [
				{
					castell: null,
					descarregat: true
				},
				{
					castell: null,
					descarregat: true
				},
				{
					castell: null,
					descarregat: true
				}
			],
			pilar: {
				castell: null,
				descarregat: true
			},
			punts: 0
		});
		this.setState({ colles: colles });
	}
	updateName(e) {
		const colla = parseInt(e.target.dataset.colla);
		const name = e.target.value;
		const colles = this.state.colles;
		colles[colla].nom = name;
		this.setState({ colles: colles });
	}
	updateCastell(castell, colla, index) {
		const colles = this.state.colles;
		let score = 0;
		try {
			score = parseInt(this.props.puntuacions[castell]['Descarregat']);
		} catch {}
		let oldScore = 0;
		try {
			oldScore = parseInt(this.props.puntuacions[colles[colla].castells[index].castell][colles[colla].castells[index].descarregat ? 'Descarregat' : 'Carregat']);
		} catch {}
		colles[colla].castells[index].castell = castell;
		colles[colla].castells[index].descarregat = true;
		colles[colla].punts -= oldScore;
		colles[colla].punts += score;
		this.setState({ colles: colles });
	}
	updatePilar(pilar, colla) {
		const colles = this.state.colles;
		let score = 0;
		try {
			score = parseInt(this.props.puntuacions[pilar]['Descarregat']);
		} catch {}
		let oldScore = 0;
		try {
			oldScore = parseInt(this.props.puntuacions[colles[colla].pilar.castell][colles[colla].pilar.descarregat ? 'Descarregat' : 'Carregat']);
		} catch {}
		colles[colla].pilar.castell = pilar;
		colles[colla].pilar.descarregat = true;
		colles[colla].punts -= oldScore;
		colles[colla].punts += score;
		this.setState({ colles: colles });
	}
	carregarCastell(carregat, colla, index) {
		const colles = this.state.colles;
		const castell = colles[colla].castells[index].castell;
		colles[colla].castells[index].descarregat = !carregat;
		const diff = this.props.puntuacions[castell]['Descarregat'] - this.props.puntuacions[castell]['Carregat'];
		colles[colla].punts += (carregat ? -1 : +1) * diff;
		this.setState({ colles: colles });
	}
	carregarPilar(carregat, colla) {
		const colles = this.state.colles;
		const pilar = colles[colla].pilar.castell;
		colles[colla].pilar.descarregat = !carregat;
		const diff = this.props.puntuacions[pilar]['Descarregat'] - this.props.puntuacions[pilar]['Carregat'];
		colles[colla].punts += (carregat ? -1 : +1) * diff;
		this.setState({ colles: colles });
	}
	export() {
		const file = new Blob([JSON.stringify(this.state.colles, null, 4)], {type: 'json'});
		if (window.navigator.msSaveOrOpenBlob)
		window.navigator.msSaveOrOpenBlob(file, 'barometre.json');
		else {
			const a = document.createElement('a');
			const url = URL.createObjectURL(file);
			a.href = url;
			a.download = 'barometre.json';
			document.body.appendChild(a);
			a.click();
			setTimeout(() => {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0);
		}
	}
	import(e) {
		const files = e.target.files;
		if (files.length <= 0)
			return;
		const fr = new FileReader();
		fr.onload = (e) => {
			const result = JSON.parse(e.target.result);
			this.setState({ colles: result });
		};
		fr.readAsText(files[0]);
	}
	render() {
		return (<>
			<section>
				<h2 style={{marginBottom: '1rem'}}>Calculadora</h2>

				<p>
					La casella de selecció de cada castell permet intercanviar entre el castell carregat (seleccionada) o descarregat (desseleccionada). No s'hi ha inclòs els resultats "intent" ni "intent desmuntat" perquè no atorguen cap punt.
				</p>

				<p>
					Es poden afegir tantes colles com es vulgui i es pot editar el nom de cada una d'elles fent-hi click al damunt.
				</p>

				<div className="button-wrap">
					<button className="btn" onClick={this.export.bind(this)}>Exportar</button>
					<label htmlFor="import" className="btn">Importar</label>
					<input id="import" type="file" onChange={this.import.bind(this)} accept=".json" style={{display: 'none'}} />
				</div>

				<table className="calculator-tb computer">
					<thead>
						<tr>
							<th>Nom de la colla</th>
							<th>Ronda #1</th>
							<th>Ronda #2</th>
							<th>Ronda #3</th>
							<th>Pilar</th>
							<th>Punts</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.colles.map((c, i) => {
								return <tr key={i}>
									<td>
										<input type="text" data-colla={i} onChange={this.updateName.bind(this)} className="colla-name" value={c.nom} />
									</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={true}
											pilars={false}
											onChange={this.updateCastell.bind(this)}
											onCheck={this.carregarCastell.bind(this)}
											colla={i}
											castell={0}
											real={c.castells[0].castell}
											result={c.castells[0].descarregat}
											/>
									}</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={true}
											pilars={false}
											onChange={this.updateCastell.bind(this)}
											onCheck={this.carregarCastell.bind(this)}
											colla={i}
											castell={1}
											real={c.castells[1].castell}
											result={c.castells[1].descarregat}
											/>
									}</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={true}
											pilars={false}
											onChange={this.updateCastell.bind(this)}
											onCheck={this.carregarCastell.bind(this)}
											colla={i}
											castell={2}
											real={c.castells[2].castell}
											result={c.castells[2].descarregat}
											/>
									}</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={false}
											pilars={true}
											onChange={this.updatePilar.bind(this)}
											onCheck={this.carregarPilar.bind(this)}
											colla={i}
											real={c.pilar.castell}
											result={c.pilar.descarregat}
											/>
									}</td>
									<td>{c.punts}</td>
								</tr>;
							})
						}
						<tr>
							<td colSpan="6" className="calc-btn">
								<button className="btn" onClick={this.createTeam.bind(this)}>Afegir colla</button>
							</td>
						</tr>
					</tbody>
				</table>

				<table className="calculator-tb mobile">
					{
						this.state.colles.map((c, i) => {
							return <tbody key={i}>
								<tr>
									<th colSpan="3">
										<input type="text" data-colla={i} onChange={this.updateName.bind(this)} className="colla-name" value={c.nom} />
									</th>
									<th>{c.punts}</th>
								</tr>
								<tr>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={true}
											pilars={false}
											onChange={this.updateCastell.bind(this)}
											onCheck={this.carregarCastell.bind(this)}
											colla={i}
											castell={0}
											real={c.castells[0].castell}
											result={c.castells[0].descarregat}
											/>
									}</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={true}
											pilars={false}
											onChange={this.updateCastell.bind(this)}
											onCheck={this.carregarCastell.bind(this)}
											colla={i}
											castell={1}
											real={c.castells[1].castell}
											result={c.castells[1].descarregat}
											/>
									}</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={true}
											pilars={false}
											onChange={this.updateCastell.bind(this)}
											onCheck={this.carregarCastell.bind(this)}
											colla={i}
											castell={2}
											real={c.castells[2].castell}
											result={c.castells[2].descarregat}
											/>
									}</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={false}
											pilars={true}
											onChange={this.updatePilar.bind(this)}
											onCheck={this.carregarPilar.bind(this)}
											colla={i}
											real={c.pilar.castell}
											result={c.pilar.descarregat}
											/>
									}</td>
								</tr>
							</tbody>;
						})
					}
					<tbody>
						<tr>
							<td colSpan="4" className="calc-btn">
								<button className="btn" onClick={this.createTeam.bind(this)}>Afegir colla</button>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		</>);
	}
}

export default Calculadora;
