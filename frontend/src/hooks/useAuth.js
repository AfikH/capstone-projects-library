import { useEffect } from "react";

import useUser from "./useUser";
import useCookie from "./useCookie";

const useAuth = () => {
	const { user, addUser, removeUser, setUser } = useUser();
	const { getItem } = useCookie();

	// useEffect(() => {
	// 	const userData = getItem("auth");
	// 	if(userData){
	// 		addUser(userData);
	// 	}
	// }, [addUser, getItem]);

	const signin = (userData) => {
		addUser(userData);
	};

	const signout = () => {
		removeUser();
	};

	return { user, signin, signout, setUser };
};

export default useAuth;