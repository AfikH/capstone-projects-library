import { useRef, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

import Editor from "../components/General/Editor";
import useAuth from "../hooks/useAuth";

const EditProject = () => {
	const { user } = useAuth();
	const [alert, setAlert] = useState({});
	const project = useLoaderData();
	const editorRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData(e.target);

		const formData = {
			title: data.get('project-title') || '',
			degree: data.get('project-degree') || '',
			content: editorRef.current.getMarkdown() || ''
		}

		try{
			if(!formData.title || !formData.content){
				throw { type: "negative", messages: ["Please fill atleast project title & content."] };
			}

			let response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/projects/${project.project_id}`, {
				method: 'PUT',
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
					"Authorization": user || ''
				}
			});

			response = await response.json();

			if(!response.ok){
				throw { type: "negative", messages: [response.msg || ""] };
			}

			setAlert({ type: "positive", messages: ["Project has been updated succesfully."] });
		}catch(error){
			setAlert({ type: error.type || "negative", messages: error.messages || ["Something wen't wrong please try again later."] });
		}
	}

	return(
		<div className="page-edit-project">
			<div className="page-edit-project-form-container">
				<form onSubmit={handleSubmit}>
					{ alert.messages && alert.messages.length > 0 &&
						<ul className={`form-errors ${alert.type || "neutral"}`}>
							{alert.messages.map((message, index) => <li key={index}>{message}</li>)}
						</ul>
					}
					<input type="text" name="project-title" placeholder="Project Title" defaultValue={project.project_title} />
					<input type="text" name="project-degree" placeholder="Degree" defaultValue={project.project_degree} />
					<Editor editorRef={editorRef} defaultValue={project.project_content} />
					<div className="page-edit-project-form-buttons-container">
						<button type="submit" className="main-button">Update Project</button>
						<Link to={`/project/${project.project_id}`} className="main-button">View Project</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default EditProject;