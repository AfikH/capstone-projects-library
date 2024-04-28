import AuthenticatedMenu from './AuthenticatedMenu.jsx';

const authenticated = true;

const MainHeader = () => (
    <header className="main-header">
        <div className="main-header-logo">
            <img src="https://placehold.co/400x200" alt="Capstone Projects Library" />
        </div>
        {
        !authenticated ?
            <div className="main-header-guest">
                <a href="/user/sign-in">Signin</a>
                <a href="/user/sign-up">Signup</a>
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