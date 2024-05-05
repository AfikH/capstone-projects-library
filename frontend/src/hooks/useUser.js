import { useContext } from "react";

import AuthContext from "../context/AuthContext";
import useCookie from "./useCookie";
import { removeCookie } from "../lib/cookie";

const useUser = () => {
	const { user, setUser } = useContext(AuthContext);
	const { setItem } = useCookie();

	const addUser = (token) => {
		setUser(token);
		setItem("auth", token);
	};

	const removeUser = () => {
		setUser(null);
		removeCookie("auth");
	};

	return { user, addUser, removeUser, setUser };
};

export default useUser;