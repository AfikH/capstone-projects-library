import { Outlet } from 'react-router-dom';

import MainHeader from './MainHeader/Header.jsx';

const MainLayout = () => (
	<>
		<MainHeader />
        <Outlet />
	</>
);

export default MainLayout;