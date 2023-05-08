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
							descarregat: null
						},
						{
							castell: null,
							descarregat: null
						},
						{
							castell: null,
							descarregat: null
						}
					],
					pilar: {
						castell: null,
						descarregat: null
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
					descarregat: null
				},
				{
					castell: null,
					descarregat: null
				},
				{
					castell: null,
					descarregat: null
				}
			],
			pilar: {
				castell: null,
				descarregat: null
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
			oldScore = parseInt(this.props.puntuacions[colles[colla].castells[index].castell]['Descarregat']);
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
			oldScore = parseInt(this.props.puntuacions[colles[colla].pilar.castell]['Descarregat']);
		} catch {}
		colles[colla].pilar.castell = pilar;
		colles[colla].pilar.descarregat = true;
		colles[colla].punts -= oldScore;
		colles[colla].punts += score;
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
										<input type="text" defaultValue={`Colla #${i+1}`} />
									</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={true}
											pilars={false}
											onChange={this.updateCastell.bind(this)}
											colla={i}
											castell={0}
											real={c.castells[0].castell}
											/>
									}</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={true}
											pilars={false}
											onChange={this.updateCastell.bind(this)}
											colla={i}
											castell={1}
											real={c.castells[1].castell}
											/>
									}</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={true}
											pilars={false}
											onChange={this.updateCastell.bind(this)}
											colla={i}
											castell={2}
											real={c.castells[2].castell}
											/>
									}</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={false}
											pilars={true}
											onChange={this.updatePilar.bind(this)}
											colla={i}
											real={c.pilar.castell}
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
							return <>
								<tr>
									<th colSpan="3">
										<input type="text" defaultValue={`Colla #${i+1}`} />
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
											colla={i}
											castell={0}
											real={c.castells[0].castell}
											/>
									}</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={true}
											pilars={false}
											onChange={this.updateCastell.bind(this)}
											colla={i}
											castell={1}
											real={c.castells[1].castell}
											/>
									}</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={true}
											pilars={false}
											onChange={this.updateCastell.bind(this)}
											colla={i}
											castell={2}
											real={c.castells[2].castell}
											/>
									}</td>
									<td>{
										<DropdownCastells
											list={this.props.puntuacions}
											castells={false}
											pilars={true}
											onChange={this.updatePilar.bind(this)}
											colla={i}
											real={c.pilar.castell}
											/>
									}</td>
								</tr>
							</>;
						})
					}
					<tr>
						<td colSpan="4" className="calc-btn">
							<button className="btn" onClick={this.createTeam.bind(this)}>Afegir colla</button>
						</td>
					</tr>
				</table>
			</section>
		</>);
	}
}

export default Calculadora;
