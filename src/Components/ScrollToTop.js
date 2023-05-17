import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	const nav = document.getElementById('navMenu');
	if (nav !== null)
		nav.classList.remove('expanded');

	return;
}

export default ScrollToTop;
