import { useState } from "react";

import { setCookie, getCookie, removeCookie } from "../lib/cookie";

const useCookie = () => {
	const [value, setValue] = useState(null);

	const setItem = (key, value) => {
		setCookie(key, value);
		setValue(value);
	};

	const getItem = (key) => {
		const value = getCookie(key);
		setValue(value);
		return value;
	};

	const removeItem = (key) => {
		removeCookie(key);
		setValue(null);
	};

	return { value, setItem, getItem, removeItem };
};

export default useCookie;