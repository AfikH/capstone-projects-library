import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import useAuth from "../../hooks/useAuth";

const AuthRoute = ({ signedIn = true, admin=false, path = '/', children }) => {
	const [loading, setLoading] = useState(true);
	const [redirect, setRedirect] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		const x = async () => {
			try{
				// Validate that is not logged in because there's no auth cookie
				if(!signedIn && !user) return setRedirect(false);
		
				// Validate that is logged in by asking backend
				if(signedIn){
					if(!admin) return setRedirect(false);

					let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/auth`, {
						method: 'POST',
						body: JSON.stringify({token: user}),
						headers: {
							"Content-Type": "application/json"
						}
					});
					response = await response.json();
			
					if(response.ok) return setRedirect(false);
				}
			}catch(error){
				// console.log(error);
				setRedirect(true);
			}finally{
				setLoading(false);
			}
		}
		x();
	}, []);

	return !loading && redirect ? <Navigate to={path} /> : !loading && children
}

export default AuthRoute;