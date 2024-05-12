import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import editIcon from '../../assets/media/images/icons/edit.svg';
import deleteIcon from '../../assets/media/images/icons/delete.svg';
import useAuth from '../../hooks/useAuth';

const AdminProjects = () => {
	const { user } = useAuth();
	const projectsLoader = useLoaderData();
	const [projects, setProjects] = useState(projectsLoader);

	const deleteProject = async (id) => {
		try{
			let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/projects/${id}`, {
				method: 'DELETE',
				headers: {
					"Authorization": user.token || ''
				}
			});

			response = await response.json();

			if(!response.ok){
				throw { type: "negative", messages: [response.msg || ""] };
			}

			setProjects(projects.filter(project => project.project_id !== id));
		}catch(error){
			console.log(error);
		}
	}

	return (
		<div className="admin-projects-page">
			<div className="admin-projects-page-list-container">
				<span className="title">Manage Projects</span>
				{projects && projects.length > 0 ? 
					<div className="admin-projects-page-list">
						{projects.map((project, index) => (
							<div key={index} className="admin-projects-page-project">
								<span className="project-title" title="Project Title">{project.project_title}</span>
								<div className="admin-projects-page-project-buttons">
									<Link to={`/project/edit/${project.project_id}`} title="Edit Project"><img src={editIcon} alt="Edit" /></Link>
									<button type="button" title="Delete Project" onClick={() => deleteProject(project.project_id)}><img src={deleteIcon} alt="Delete" /></button>
								</div>
							</div>
						))}
					</div>
				:
					<span>No projects found.</span>
				}
			</div>
		</div>
	)
}

export default AdminProjects;