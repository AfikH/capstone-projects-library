import { Link } from 'react-router-dom';

import AuthenticatedMenu from './AuthenticatedMenu.jsx';

import logo from '../../../assets/media/images/logo.svg';
import AuthComponent from '../../General/AuthComponent.jsx';

const MainHeader = () => (
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
				<div className="main-header-authenticated">
					<span className="name">Afik Habaz</span>
					<div className="main-header-authenticated-buttons">
						<AuthenticatedMenu />
					</div>
				</div>
			</AuthComponent>
    </header>
);

export default MainHeader;