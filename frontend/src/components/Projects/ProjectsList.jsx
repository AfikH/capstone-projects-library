import { Link } from "react-router-dom";

const ProjectsList = ({ projects = [] }) => (
	<>
	{projects.length <= 0 ?
		<span>Couldn't find any projects, <Link to="/project/add">Create a new project.</Link></span>
	:
		projects.map((project, index) => (
			<Link key={index} to={`/project/${project.id}`} className="project-container">
				<article className="project">
					<span className="project-degree-and-date">{project.degree} | Last Updated: {project.date_updated}</span>
					<h3 className="project-title">{project.title}</h3>
					<address className="project-author">{project.project_author}</address>
					<p className="project-content">{project.content}</p>
				</article>
			</Link>
		))}
	</>
)

export default ProjectsList;