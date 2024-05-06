import { createBrowserRouter, RouterProvider, useLoaderData } from 'react-router-dom';

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
import AuthRoute from './General/AuthRoute.jsx';
import EditProject from '../pages/EditProject.jsx';
import useAuth from '../hooks/useAuth.js';
import AdminUserEdit from '../pages/admin/AdminUserEdit.jsx';

const Router = () => {
	const { user } = useAuth();

	const loadProjects = async () => {
		try{
			let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/projects`);
			response = await response.json();
	
			return response.projects || [];
		}catch(error){
			return [];
		}
	}

	const loadProject = async ({ params }) => {
		try{
			let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/projects/${params.project_id}`);
			response = await response.json();
	
			return response.project || {};
		}catch(error){
			return [];
		}
	}

	const loadUsers = async () => {
		try{
			let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users`, {
				headers: {
					"Authorization": user || ''
				}
			});
			response = await response.json();
	
			return response.users || [];
		}catch(error){
			return [];
		}
	}

	const loadUser = async ({ params }) => {
		try{
			let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/${params.user_id}`, {
				headers: {
					"Authorization": user || ''
				}
			});
			response = await response.json();
	
			return response.user || {};
		}catch(error){
			return [];
		}
	}

	const routes = createBrowserRouter([
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
							element: <AuthRoute><AddProject /></AuthRoute>
						},
						{
							path: "edit/:project_id",
							loader: loadProject,
							element: <AuthRoute><EditProject /></AuthRoute>
						},
						{
							path: ":project_id",
							loader: loadProject,
							element: <Project />
						},
					]
				},
				{
					path: "/admin/",
					element: <AuthRoute admin={true}><MainAdminLayout /></AuthRoute>,
					children: [
						{
							path: "projects",
							loader: loadProjects,
							element: <AdminProjects />
						},
						{
							path: "users",
							loader: loadUsers,
							element: <AdminUsers />
						},
						{
							path: "user/edit/:user_id",
							loader: loadUser,
							element: <AdminUserEdit />
						}
					]
				},
				{
					path: "/user/sign-in",
					element: <AuthRoute signedIn={false}><SignIn /></AuthRoute>
				},
				{
					path: "/user/sign-up",
					element: <AuthRoute signedIn={false}><SignUp /></AuthRoute>
				},
				{
					path: "*",
					element: <NotFound />
				}
			]
		}
	]);	

	return <RouterProvider router={routes} />
};

export default Router;