import { Link, Outlet } from "react-router-dom";

import usersSettingsIcon from '../../assets/media/images/icons/manage-users.svg';
import projectsSettingsIcon from '../../assets/media/images/icons/manage-projects.svg';

const MainAdminLayout = () => (
	<div className="main-admin-layout">
		<div className="main-admin-layout-links-container">
			<span className="title">Quick Links</span>
			<div className="main-admin-layout-links">
				<Link to="/admin/users">
					<img src={usersSettingsIcon} />
					<span>Manage Users</span>
				</Link>
				<Link to="/admin/projects">
					<img src={projectsSettingsIcon} />
					<span>Manage Projects</span>
				</Link>
			</div>
		</div>
		<Outlet />
	</div>
)

export default MainAdminLayout;