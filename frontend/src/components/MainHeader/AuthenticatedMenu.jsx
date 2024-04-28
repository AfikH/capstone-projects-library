import { useState } from "react";

const AuthenticatedMenu = () => {
    const [menuActive, setMenuActive] = useState(false);

    return(
        <div className={`main-header-authenticated-menu-container ${menuActive && 'menu-active'}`}>
            <button className="main-header-authenticated-menu-button" title='Toggle User Menu' onClick={() => setMenuActive(!menuActive)}>
                <img src="../../assets/media/images/icons/chevron-down.svg" alt="▼" className="chevron" />
            </button>
            <div className="main-header-authenticated-menu">
                <a href="/project/add" title='Add Project'>
                    <img src="../../assets/media/images/icons/add-project.svg" alt="+" />
                    <span>Add Project</span>
                </a>
            </div>
        </div>
    )
}

export default AuthenticatedMenu;