import { Link } from "react-router-dom";

import AuthComponent from '../General/AuthComponent.jsx';

const formatDate = (timestamp) => {
	const date = new Date(timestamp);
	return date.toLocaleString('en-US');
}

const ProjectsList = ({ projects = [] }) => (
	<>
	{projects.length <= 0 ?
		<span>Couldn't find any projects. <AuthComponent><Link to="/project/add">Create a new project</Link></AuthComponent></span>
	:
		projects.map((project, index) => (
			<Link key={index} to={`/project/${project.project_id}`} className="project-container">
				<article className="project">
					<span className="project-degree-and-date">{project.project_degree} | Last Updated: {formatDate(project.project_date_updated)}</span>
					<h3 className="project-title">{project.project_title}</h3>
					<address className="project-author">{project.project_author}</address>
					<p className="project-content">{project.project_content}</p>
				</article>
			</Link>
		))}
	</>
)

export default ProjectsList;