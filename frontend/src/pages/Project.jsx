import { Link, useLoaderData } from "react-router-dom";
import Markdown from 'react-markdown'
import AuthComponent from "../components/General/AuthComponent";

const formatDate = (timestamp) => {
	const date = new Date(timestamp);
	return date.toLocaleString('en-US');
}

const Project = () => {
	const project = useLoaderData();

	return (
		<article className="page-project">
			<div className="page-project-info">
				<span className="page-project-degree">Degree: {project.project_degree}</span>
				<h2 className="page-project-title">{project.project_title}</h2>
				<address className="page-project-author-and-date">By {project.project_author} | {formatDate(project.project_date_updated)}</address>
			</div>
			<Markdown>{project.project_content}</Markdown>
			{/* <Link to={`/project/edit/${project.project_id}`}>Edit Project</Link> */}
		</article>
	)
}

export default Project;