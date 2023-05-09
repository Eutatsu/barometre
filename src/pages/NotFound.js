import { Component } from "react";

class NotFound extends Component {
	render() {
		return (<>
			<section className="error-page">
				<h1>404</h1>
				<h3>La pàgina que busqueu no existeix</h3>
			</section>
		</>);
	}
}

export default NotFound;
