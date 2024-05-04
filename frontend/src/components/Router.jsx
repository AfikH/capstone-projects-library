import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home.jsx';
import Project from '../pages/Project.jsx';
import NotFound from '../pages/NotFound.jsx';
import MainLayout from './Layout/MainLayout.jsx';
import AdminProjects from '../pages/admin/AdminProjects.jsx';
import SignIn from '../pages/SignIn.jsx';
import SignUp from '../pages/SignUp.jsx';
import AddProject from '../pages/AddProject.jsx';
import AdminUsers from '../pages/admin/AdminUsers.jsx';
import MainAdminLayout from './Layout/MainAdminLayout.jsx';

const loadProjects = async () => {
	try{
		let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/projects`);
		let projects = await response.json();

		return projects.projects || [];
	}catch(error){
		return [];
	}
}

const Router = createBrowserRouter([
    {
		element: <MainLayout />,
		children: [
			{
				path: "/",
				loader: loadProjects,
				element: <Home />
			},
			{
				path: "/project/",
				children: [
					{
						path: "add",
						element: <AddProject />
					},
					{
						path: ":project_id",
						element: <Project />
					},
				]
			},
			{
				path: "/admin/",
				element: <MainAdminLayout />,
				children: [
					{
						path: "projects",
						element: <AdminProjects />
					},
					{
						path: "users",
						element: <AdminUsers />
					}
				]
			},
			{
				path: "/user/sign-in",
				element: <SignIn />
			},
			{
				path: "/user/sign-up",
				element: <SignUp />
			},
			{
				path: "*",
				element: <NotFound />
			}
		]
	}
]);

export default Router;