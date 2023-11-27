import HexToRbg from "./HexToRgb";

function GetHighContrast(hex) {
	const rgb = HexToRbg(hex);
	return 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b < 128 ? 'white' : 'black';
}

export default GetHighContrast;
