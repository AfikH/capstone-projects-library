import AuthenticatedMenu from './AuthenticatedMenu.jsx';
import { Link } from 'react-router-dom';

import logo from '../../../assets/media/images/logo.svg';

const authenticated = false;

const MainHeader = () => (
    <header className="main-header">
        <h1 className="main-header-logo">
            <Link to="/"><img src={logo} alt="Capstone Projects Library" /></Link>
        </h1>
        {
        !authenticated ?
            <div className="main-header-guest">
                <Link to="/user/sign-in">Signin</Link>
                <Link to="/user/sign-up">Signup</Link>
            </div>
        :
            <div className="main-header-authenticated">
                <span className="name">Afik Habaz</span>
                <div className="main-header-authenticated-buttons">
                    <AuthenticatedMenu />
                </div>
            </div>
        }
    </header>
);

export default MainHeader;