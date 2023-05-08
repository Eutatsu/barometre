import { Component } from "react";

class Calculadora extends Component {
	render() {
		return (<>
			<section>
				<h2>Calculadora</h2>

				<table className="calculator-tb">
					<tbody>
						<tr>
							<td>Colla</td>
							<td>C1</td>
							<td>C2</td>
							<td>C3</td>
							<td>P</td>
							<td>Punts</td>
						</tr>
					</tbody>
				</table>
			</section>
		</>);
	}
}

export default Calculadora;
