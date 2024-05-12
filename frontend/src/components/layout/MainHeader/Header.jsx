import { Link } from 'react-router-dom';

import AuthenticatedMenu from './AuthenticatedMenu.jsx';

import logo from '../../../assets/media/images/logo.svg';
import AuthComponent from '../../General/AuthComponent.jsx';
import useAuth from '../../../hooks/useAuth.js';
import HeaderAuthenticated from './HeaderAuthenticated.jsx';

const MainHeader = () => {
	let { user } = useAuth();

	return (
		<header className="main-header">
			<h1 className="main-header-logo">
				<Link to="/"><img src={logo} alt="Capstone Projects Library" /></Link>
			</h1>
				<AuthComponent signedIn={false}>
					<div className="main-header-guest">
						<Link to="/user/sign-in">Signin</Link>
						<Link to="/user/sign-up">Signup</Link>
					</div>
				</AuthComponent>
				<AuthComponent>
					<HeaderAuthenticated />
				</AuthComponent>
		</header>
	);
}

export default MainHeader;