import { useState } from "react";
import { Link } from "react-router-dom";

const AuthenticatedMenu = () => {
    const [menuActive, setMenuActive] = useState(false);

    return(
        <div className={`main-header-authenticated-menu-container ${menuActive && 'menu-active'}`}>
            <button className="main-header-authenticated-menu-button" title='Toggle User Menu' onClick={() => setMenuActive(!menuActive)}>
                <img src="../../assets/media/images/icons/chevron-down.svg" alt="▼" className="chevron" />
            </button>
            <div className="main-header-authenticated-menu">
                <Link to="/project/add">
                    <img src="../../assets/media/images/icons/add-project.svg" alt="+" />
                    <span>Add Project</span>
                </Link>
                <Link to="/admin/">
                    <img src="../../assets/media/images/icons/settings.svg" alt="⚙" />
                    <span>Admin Panel</span>
                </Link>
            </div>
        </div>
    )
}

export default AuthenticatedMenu;