import { useState } from "react";
import { Link } from "react-router-dom";

import AuthComponent from "../../General/AuthComponent";
import useAuth from "../../../hooks/useAuth";

import chevronImage from '../../../assets/media/images/icons/chevron-down.svg';
import addProjectImage from '../../../assets/media/images/icons/add-project.svg';
import settingsImage from '../../../assets/media/images/icons/settings.svg';
import signoutImage from '../../../assets/media/images/icons/signout.svg';

const AuthenticatedMenu = () => {
	const [menuActive, setMenuActive] = useState(false);
	const { signout } = useAuth();

    return(
        <div className={`main-header-authenticated-menu-container ${menuActive && 'menu-active'}`}>
            <button className="main-header-authenticated-menu-button" title='Toggle User Menu' onClick={() => setMenuActive(!menuActive)}>
                <img src={chevronImage} alt="▼" className="chevron" />
            </button>
            <div className="main-header-authenticated-menu" onClick={() => setMenuActive(false)}>
                <Link to="/project/add">
                    <img src={addProjectImage} alt="+" />
                    <span>Add Project</span>
                </Link>
                <AuthComponent admin={true}>
					<Link to="/admin/">
						<img src={settingsImage} alt="⚙" />
						<span>Admin Panel</span>
					</Link>
				</AuthComponent>
				<button type="button" onClick={signout}>
					<img src={signoutImage} alt="⍈" />
					<span>Sign Out</span>
				</button>
            </div>
        </div>
    )
}

export default AuthenticatedMenu;