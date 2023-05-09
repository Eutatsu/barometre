import { Component } from "react";
import DropdownCastells from "../components/DropdownCastells";

class Calculadora extends Component {
	constructor(props) {
		super(props);
		this.state = {
			colles: [
				{
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
	render() {
		return (<>
			<section>
				<h2>Calculadora</h2>

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
									{/*<td>Colla #{i+1}</td>*/}
									<td>
										<input type="text" className="colla-name" defaultValue={`Colla #${i+1}`} />
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
										<input type="text" className="colla-name" defaultValue={`Colla #${i+1}`} />
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
