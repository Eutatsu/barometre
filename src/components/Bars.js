import "./Bars.css"

function Bars(props) {
    const { castells, pilars, topall } = props;

    const [castell1, castell2, castell3] = castells;
    const [pilar] = pilars;
    const MAX_HEIGHT = 90;

    return (
        <div className="bars-container">
            <div style={{ height: parseFloat(castell1/topall)*100-(100-MAX_HEIGHT) + '%' }} className="bar castell"></div>
            <div style={{ height: parseFloat(castell2/topall)*100-(100-MAX_HEIGHT) + '%' }} className="bar castell"></div>
            <div style={{ height: parseFloat(castell3/topall)*100-(100-MAX_HEIGHT) + '%' }} className="bar castell"></div>
            <div style={{ height: parseFloat(pilar/topall)*100-(100-MAX_HEIGHT) + '%' }} className="bar pilar"></div>
        </div>
    );
}

export default Bars;
