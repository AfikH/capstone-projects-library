import { useEffect } from "react";

import useUser from "./useUser";
import useCookie from "./useCookie";

const useAuth = () => {
	const { user, addUser, removeUser, setUser } = useUser();
	const { getItem } = useCookie();

	useEffect(() => {
		const token = getItem("auth");
		if(token){
			addUser(token);
		}
	}, [addUser, getItem]);

	const signin = (token) => {
		addUser(token);
	};

	const signout = () => {
		removeUser();
	};

	return { user, signin, signout, setUser };
};

export default useAuth;