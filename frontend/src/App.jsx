import AuthContext from "./context/AuthContext";
import Router from "./components/Router";

import './assets/css/main.css';
import { useState } from "react";
import { getCookie } from "./lib/cookie";

const App = () => {
	const [user, setUser] = useState(getCookie("auth"));

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<Router />
		</AuthContext.Provider>
	)
}

export default App;