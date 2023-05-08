import { Component } from "react";

class Bars extends Component {
	render() {
		const [castell1, castell2, castell3] = this.props.castells;
		const [pilar] = this.props.pilars;
		const MAX_HEIGHT = 90;

		return (
			<div className="bars-container">
				<div style={{ height: parseFloat(castell1/this.props.topall)*100-(100-MAX_HEIGHT) + '%' }} className="bar castell"></div>
				<div style={{ height: parseFloat(castell2/this.props.topall)*100-(100-MAX_HEIGHT) + '%' }} className="bar castell"></div>
				<div style={{ height: parseFloat(castell3/this.props.topall)*100-(100-MAX_HEIGHT) + '%' }} className="bar castell"></div>
				<div style={{ height: parseFloat(pilar/this.props.topall)*100-(100-MAX_HEIGHT) + '%' }} className="bar pilar"></div>
			</div>
		);
	}
}

export default Bars;
