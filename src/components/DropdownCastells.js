import { Component } from "react";

class DropdownCastells extends Component {
	update(e) {
		if (this.props.castell !== undefined)
			this.props.onChange(e.target.value, this.props.colla, this.props.castell);
		else
			this.props.onChange(e.target.value, this.props.colla);
	}
	render() {
		const structures = ['—'];

		Object.keys(this.props.list).forEach(c => {
			if (!c.includes('Pd') && this.props.castells)	structures.push(c);
			if (c.includes('Pd') && this.props.pilars)		structures.push(c);
		});

		return (<>
			<select className="castells-selector" onChange={this.update.bind(this)}>
				{
					structures.map(c => {
						return <option key={c}>{c}</option>;
					})
				}
			</select>
		</>);
	}
}

export default DropdownCastells;
