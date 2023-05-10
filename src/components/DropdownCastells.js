import { Component } from "react";

class DropdownCastells extends Component {
	update(e) {
		if (this.props.castell !== undefined)
			this.props.onChange(e.target.value, this.props.colla, this.props.castell);
		else
			this.props.onChange(e.target.value, this.props.colla);
	}
	carregat(e) {
		if (this.props.castell !== undefined)
			this.props.onCheck(e.target.checked, this.props.colla, this.props.castell);
		else
			this.props.onCheck(e.target.checked, this.props.colla);
	}
	render() {
		const structures = ['—'];

		Object.keys(this.props.list).forEach(c => {
			if (!c.includes('Pd') && this.props.castells)	structures.push(c);
			if (c.includes('Pd') && this.props.pilars)		structures.push(c);
		});

		return (<>
			<div className="input-wrap">
				<input type="checkbox" className="carregat-checkbox" onChange={this.carregat.bind(this)} checked={!this.props.result} disabled={this.props.real === null} />
				<div className="select-arrow">
					<select className="castells-selector" onChange={this.update.bind(this)} value={this.props.real ? this.props.real : '—'}>
						{
							structures.map(c => {
								return <option value={c} key={c}>{this.props.real === c && !this.props.result ? c + 'C' : c}</option>;
							})
						}
					</select>
					<div className="dblarrow"><b></b><i></i></div>
				</div>
			</div>
		</>);
	}
}

export default DropdownCastells;
