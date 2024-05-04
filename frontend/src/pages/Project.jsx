let project = {id: 1, title: 'title1', content: 'content2', degree: 'Bsc', project_author: 'Afik Habaz', date_updated: Date.parse(new Date())};

const Project = () => (
	<article className="page-project">
		<div className="page-project-info">
			<span className="page-project-degree">Degree: {project.degree}</span>
			<h2 className="page-project-title">{project.title}</h2>
			<address className="page-project-author-and-date">By Afik Habaz | {project.date_updated}</address>
		</div>
		<p className="page-project-content">{project.content}</p>
	</article>
)

export default Project;