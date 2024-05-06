import { useEffect, useState } from "react";

import useAuth from "../../hooks/useAuth";

const AuthComponent = ({ signedIn = true, admin=false, id=false, children }) => {
	const [loading, setLoading] = useState(true);
	const [auth, setAuth] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		setLoading(true);
		setAuth(false);
		const x = async () => {
			try{
				// Validate that is not logged in because there's no auth cookie
				if(!signedIn && !user) return setAuth(true);
		
				// Validate that is logged
				if(signedIn){
					// check if admin if required
					if(admin){
						let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/auth`, {
							method: 'POST',
							body: JSON.stringify({token: user}),
							headers: {
								"Content-Type": "application/json"
							}
						});
						response = await response.json();
				
						if(response.ok) return setAuth(true);
					}else{
						if(user) return setAuth(true);
					}
				}
			}catch(error){
				// console.log(error);
				setAuth(false);
			}finally{
				setLoading(false);
			}
		}
		x();
	}, [user]);

	return !loading && auth && children;
}

export default AuthComponent;