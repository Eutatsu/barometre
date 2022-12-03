import "./Bars.css"

function Bars(props) {
    const { castells, pilars, topall } = props;

    const [castell1, castell2, castell3] = castells;
    const [pilar] = pilars;

    return (
        <div className="bars-container">
            <div style={{ height: parseFloat(castell1/topall - 0.1)*100 + '%' }} className="bar castell"></div>
            <div style={{ height: parseFloat(castell2/topall - 0.1)*100 + '%' }} className="bar castell"></div>
            <div style={{ height: parseFloat(castell3/topall - 0.1)*100 + '%' }} className="bar castell"></div>
            <div style={{ height: parseFloat(pilar/topall - 0.1)*100 + '%' }} className="bar pilar"></div>
        </div>
    );
}

export default Bars;